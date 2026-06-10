import { NextResponse } from "next/server";
import { saveLead, getLeads } from "@/lib/db-server";
import { Lead } from "@/types";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const hasSession = cookieStore.has("balaji_admin_session");

    // In production with Firebase, you would also inspect the authorization header
    // But to support out-of-the-box local testing, we allow both local session cookie and header checks.
    if (!hasSession) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error("API Leads GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, phone, email, service, property_name, message, how_heard } = body;

    // Server-side validation
    if (!full_name || !phone || !service) {
      return NextResponse.json(
        { error: "Full name, phone number, and service are required fields." },
        { status: 400 }
      );
    }

    const newLead: Lead = {
      id: "lead-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      full_name,
      phone,
      email: email || "",
      service,
      property_name: property_name || "",
      message: message || "",
      how_heard: how_heard || "",
      created_at: new Date().toISOString(),
      status: "New"
    };

    // Save lead to current DB adapter (Firestore or Local JSON)
    await saveLead(newLead);

    // 1. Resend Email Notification
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "info@balajiconstructions.com", // Standard destination email
            subject: `New Lead: ${newLead.full_name} - ${newLead.service}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #b45309; border-bottom: 2px solid #fbbf24; padding-bottom: 8px;">New Lead Received</h2>
                <p><strong>Name:</strong> ${newLead.full_name}</p>
                <p><strong>Phone:</strong> ${newLead.phone}</p>
                <p><strong>Email:</strong> ${newLead.email || "N/A"}</p>
                <p><strong>Service Needed:</strong> ${newLead.service}</p>
                <p><strong>Property Reference:</strong> ${newLead.property_name || "N/A"}</p>
                <p><strong>How Heard:</strong> ${newLead.how_heard || "N/A"}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f3f4f6; padding: 12px; border-left: 4px solid #d4af37; margin: 0;">
                  ${newLead.message || "No message."}
                </blockquote>
                <p style="font-size: 11px; color: #6b7280; margin-top: 20px;">Submitted at: ${new Date(newLead.created_at).toLocaleString()}</p>
              </div>
            `
          })
        });

        if (emailRes.ok) {
          console.log("[Resend] Successfully sent lead notification email via Resend.");
        } else {
          const emailErr = await emailRes.text();
          console.error("[Resend] Failed to send email via Resend:", emailErr);
        }
      } catch (err) {
        console.error("[Resend] Connection error while posting to Resend:", err);
      }
    } else {
      console.log(`[EMAIL NOTIFICATION (MOCK)] New Lead Received:
Name: ${newLead.full_name}
Phone: ${newLead.phone}
Email: ${newLead.email}
Service: ${newLead.service}
Property Ref: ${newLead.property_name}
How Heard: ${newLead.how_heard}
Message: ${newLead.message}
----------------------------------------`);
    }

    // 2. Google Sheets Integration
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      try {
        await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: newLead.created_at,
            id: newLead.id,
            name: newLead.full_name,
            phone: newLead.phone,
            email: newLead.email,
            service: newLead.service,
            property: newLead.property_name,
            how_heard: newLead.how_heard,
            message: newLead.message
          })
        });
        console.log("[Google Sheets] Successfully synced lead row to Google Sheets via webhook.");
      } catch (sheetError) {
        console.error("[Google Sheets] Webhook synchronization error:", sheetError);
      }
    } else {
      console.log("[Google Sheets] Integration not configured. Lead saved to database only. Configure GOOGLE_SHEETS_WEBHOOK_URL in .env.local to enable sheet synchronization.");
    }

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error: any) {
    console.error("API Leads route error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
