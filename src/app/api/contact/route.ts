import { NextResponse } from "next/server";
import { getContactTopicLabel } from "@/data/contactTopics";
import { createLead, isZohoConfigured } from "@/lib/zoho";

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

    const organisation = typeof body.organisation === "string" ? body.organisation.trim() : "";
    if (organisation.length > 150) {
      return NextResponse.json({ error: "Invalid organisation length" }, { status: 400 });
    }

    const topic = typeof body.topic === "string" ? body.topic : "";
    const topicLabel = topic ? getContactTopicLabel(topic) : undefined;
    if (topic && !topicLabel) {
      return NextResponse.json({ error: "Invalid area of interest" }, { status: 400 });
    }

    if (!isZohoConfigured()) {
      // Only mock locally; in production missing credentials would silently drop leads
      if (process.env.NODE_ENV !== "production") {
        console.warn("Zoho CRM environment variables are missing. Mocking success.");
        return NextResponse.json({ success: true, mocked: true });
      }
      console.error("Zoho CRM environment variables are missing in production.");
      return NextResponse.json({ error: "Contact service is not configured" }, { status: 503 });
    }

    // Zoho requires Last_Name; fall back to the full name when no last name was given
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";

    try {
      await createLead({
        ...(lastName && firstName ? { First_Name: firstName } : {}),
        Last_Name: lastName || name.trim(),
        Email: email.trim(),
        Company: organisation || "Not provided",
        Description: topicLabel ? `Area of interest: ${topicLabel}\n\n${message.trim()}` : message.trim(),
        ...(process.env.ZOHO_LEAD_SOURCE ? { Lead_Source: process.env.ZOHO_LEAD_SOURCE } : {}),
      });
    } catch (zohoError) {
      console.error(zohoError);
      return NextResponse.json({ error: "Lead submission failed" }, { status: 502 });
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
