import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ concept: string }> }
) {
  try {
    const { concept } = await params;
    const quizPath = path.join(process.cwd(), "quizzes", `${concept}.json`);

    if (!fs.existsSync(quizPath)) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    const quizData = JSON.parse(fs.readFileSync(quizPath, "utf8"));
    return NextResponse.json(quizData);
  } catch (error) {
    console.error("Error loading quiz:", error);
    return NextResponse.json(
      { error: "Failed to load quiz" },
      { status: 500 }
    );
  }
}

