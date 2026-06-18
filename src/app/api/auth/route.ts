import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    console.error("GITHUB_CLIENT_ID environment variable is missing.");
    return NextResponse.json({ error: "GITHUB_CLIENT_ID is missing" }, { status: 500 });
  }

  // Generate a random state for security
  const state = Math.random().toString(36).substring(2, 15);

  // Redirect the browser to GitHub's OAuth authorization page
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&state=${state}`;

  return NextResponse.redirect(redirectUrl);
}
