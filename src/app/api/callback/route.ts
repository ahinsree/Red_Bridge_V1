import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable is missing.");
    return NextResponse.json({ error: "OAuth configuration is missing" }, { status: 500 });
  }

  if (!code) {
    return NextResponse.json({ error: "No code returned from GitHub" }, { status: 400 });
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
      console.error("GitHub returned OAuth error:", tokenData);
      return NextResponse.json({ error: tokenData.error_description || tokenData.error }, { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // Render HTML page that communicates with Decap CMS using postMessage
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
          const receiveMessage = (event) => {
            // Send the auth success token back to Decap CMS
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({
                token: accessToken,
                provider: "github",
              })}',
              event.origin
            );
          };
          window.addEventListener("message", receiveMessage, false);
          // Alert the parent window that we are authorizing
          window.opener.postMessage("authorizing:github", "*");
        </script>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("OAuth callback error during token exchange:", error);
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
  }
}
