import { NextResponse } from "next/server";
import { getSiteSettings, saveSiteSettings } from "@/lib/db-server";
import { cookies } from "next/headers";
import { SiteSettings } from "@/types";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("balaji_admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json() as SiteSettings;
    if (!data.companyName || !data.phone || !data.whatsapp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await saveSiteSettings(data);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
