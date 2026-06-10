import { NextResponse } from "next/server";
import { getTestimonials, saveTestimonial } from "@/lib/db-server";
import { cookies } from "next/headers";
import { Testimonial } from "@/types";

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json({ success: true, testimonials });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("balaji_admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json() as Testimonial;
    if (!data.id || !data.author_name || !data.quote) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const saved = await saveTestimonial(data);
    return NextResponse.json({ success: true, testimonial: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create testimonial" }, { status: 500 });
  }
}
