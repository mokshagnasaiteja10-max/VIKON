import { NextResponse } from "next/server";
import { getProperties, saveProperty } from "@/lib/db-server";
import { cookies } from "next/headers";
import { Property } from "@/types";

export async function GET() {
  try {
    const properties = await getProperties();
    return NextResponse.json({ success: true, properties });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("balaji_admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json() as Property;
    if (!data.id || !data.name || !data.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const saved = await saveProperty(data);
    return NextResponse.json({ success: true, property: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create property" }, { status: 500 });
  }
}
