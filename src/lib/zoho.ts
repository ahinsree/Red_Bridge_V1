// Zoho CRM client for /api/contact. Server-only: reads secrets from the environment.
// Uses a Self Client refresh token (see docs/deployment-vercel.md → Zoho CRM setup).

const ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.in";
const API_URL = process.env.ZOHO_API_URL || "https://www.zohoapis.in";

export type ZohoLead = {
  First_Name?: string;
  Last_Name: string;
  Email: string;
  Phone?: string;
  Company: string;
  Description?: string;
  Lead_Source?: string;
};

export function isZohoConfigured(): boolean {
  return Boolean(
    process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_REFRESH_TOKEN
  );
}

// Access tokens last an hour; cache per server instance so we don't hit
// Zoho's token-endpoint rate limit on every submission
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: process.env.ZOHO_CLIENT_ID ?? "",
    client_secret: process.env.ZOHO_CLIENT_SECRET ?? "",
    refresh_token: process.env.ZOHO_REFRESH_TOKEN ?? "",
  });

  const response = await fetch(`${ACCOUNTS_URL}/oauth/v2/token`, {
    method: "POST",
    body: params,
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));

  // Zoho returns 200 with an `error` field for bad credentials
  if (!response.ok || !data.access_token) {
    throw new Error(`Zoho token refresh failed (${response.status}): ${data.error ?? "unknown error"}`);
  }

  const expiresInSeconds = Number(data.expires_in) || 3600;
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (expiresInSeconds - 60) * 1000,
  };
  return cachedToken.value;
}

async function postLead(lead: ZohoLead, token: string): Promise<Response> {
  return fetch(`${API_URL}/crm/v8/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [lead], trigger: ["workflow", "approval"] }),
    cache: "no-store",
  });
}

export async function createLead(lead: ZohoLead): Promise<string> {
  let response = await postLead(lead, await getAccessToken());

  // Token revoked or expired early: refresh once and retry
  if (response.status === 401) {
    cachedToken = null;
    response = await postLead(lead, await getAccessToken());
  }

  const data = await response.json().catch(() => ({}));
  const result = data?.data?.[0];

  if (!response.ok || result?.status !== "success") {
    const code = result?.code ?? data?.code ?? "unknown";
    const message = result?.message ?? data?.message ?? "";
    const details = result?.details ? JSON.stringify(result.details) : "";
    throw new Error(`Zoho lead creation failed (${response.status}): ${code} ${message} ${details}`.trim());
  }

  return result.details?.id as string;
}
