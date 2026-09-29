import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, message } = body;
    // The form sends firstName/lastName; older clients may send a single name
    const name = [body.firstName, body.lastName].filter(Boolean).join(" ").trim() || body.name;

    // Field-level validation checks
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json({ error: "Invalid name format or length" }, { status: 400 });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json({ error: "Invalid email format or length" }, { status: 400 });
    }
    
    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 5000) {
      return NextResponse.json({ error: "Invalid message format or length" }, { status: 400 });
    }

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl) {
      // Only mock locally; in production a missing URL would silently drop leads
      if (process.env.NODE_ENV !== "production") {
        console.warn("GOOGLE_SCRIPT_URL environment variable is missing. Mocking success.");
        return NextResponse.json({ success: true, mocked: true });
      }
      console.error("GOOGLE_SCRIPT_URL environment variable is missing in production.");
      return NextResponse.json({ error: "Contact service is not configured" }, { status: 503 });
    }

    // Proxy the request from server-side to the Google Sheet URL
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, name }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets API returned non-ok status:", response.status, errorText);
      return NextResponse.json(
        { error: "Google Sheets API submission failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact server API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
