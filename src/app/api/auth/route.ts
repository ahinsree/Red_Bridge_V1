import { NextResponse } from "next/server";
import { OAUTH_STATE_COOKIE } from "@/lib/oauth";

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    console.error("GITHUB_CLIENT_ID environment variable is missing.");
    return NextResponse.json({ error: "GITHUB_CLIENT_ID is missing" }, { status: 500 });
  }

  // Unguessable state, checked in /api/callback to prevent login CSRF
  const state = crypto.randomUUID();

  // Redirect the browser to GitHub's OAuth authorization page
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&scope=repo&state=${state}`;

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/callback",
    maxAge: 600,
  });
  return response;
}
