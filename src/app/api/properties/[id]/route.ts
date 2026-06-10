import { NextResponse } from "next/server";
import { saveProperty, deleteProperty } from "@/lib/db-server";
import { cookies } from "next/headers";
import { Property } from "@/types";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("balaji_admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json() as Property;
    data.id = id; // Enforce URL param ID

    const updated = await saveProperty(data);
    return NextResponse.json({ success: true, property: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("balaji_admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = await deleteProperty(id);
    if (deleted) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete property" }, { status: 500 });
  }
}
