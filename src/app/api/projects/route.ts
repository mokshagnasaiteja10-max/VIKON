import { NextResponse } from "next/server";
import { getProjects, saveProject } from "@/lib/db-server";
import { cookies } from "next/headers";
import { Project } from "@/types";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has("balaji_admin_session")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json() as Project;
    if (!data.id || !data.name || !data.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const saved = await saveProject(data);
    return NextResponse.json({ success: true, project: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 500 });
  }
}
