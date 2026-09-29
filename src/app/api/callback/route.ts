import { NextRequest, NextResponse } from "next/server";
import { OAUTH_STATE_COOKIE } from "@/lib/oauth";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable is missing.");
    return NextResponse.json({ error: "OAuth configuration is missing" }, { status: 500 });
  }

  if (!code) {
    return NextResponse.json({ error: "No code returned from GitHub" }, { status: 400 });
  }

  if (!state || !expectedState || state !== expectedState) {
    return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("GitHub returned OAuth error:", tokenData.error);
      return NextResponse.json({ error: tokenData.error_description || tokenData.error }, { status: 400 });
    }

    const message = `authorization:github:success:${JSON.stringify({
      token: tokenData.access_token,
      provider: "github",
    })}`;
    // Escape "<" so the values can't close the inline script
    const toScript = (value: string) => JSON.stringify(value).replace(/</g, "\\u003c");

    // Render HTML page that communicates with Decap CMS using postMessage.
    // Only this site's own origin (where /admin runs) may receive the token.
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Authorizing...</title>
      </head>
      <body>
        <p>Connecting with GitHub...</p>
        <script>
          const allowedOrigin = ${toScript(origin)};
          const receiveMessage = (event) => {
            if (event.origin !== allowedOrigin) return;
            // Send the auth success token back to Decap CMS
            window.opener.postMessage(${toScript(message)}, allowedOrigin);
            window.removeEventListener("message", receiveMessage, false);
          };
          window.addEventListener("message", receiveMessage, false);
          // Alert the parent window that we are authorizing
          window.opener.postMessage("authorizing:github", allowedOrigin);
        </script>
      </body>
      </html>
    `;

    const response = new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
    response.cookies.delete({ name: OAUTH_STATE_COOKIE, path: "/api/callback" });
    return response;
  } catch (error) {
    console.error("OAuth callback error during token exchange:", error);
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
  }
}
