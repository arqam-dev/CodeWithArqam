import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const filePath = path.join(process.cwd(), "interview-questions", `${category}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Interview questions not found" },
        { status: 404 }
      );
    }

    const content = fs.readFileSync(filePath, "utf8");
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error loading interview questions:", error);
    return NextResponse.json(
      { error: "Failed to load interview questions" },
      { status: 500 }
    );
  }
}

