import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Google Sheets public JSON endpoint or API
    const googleSheetsPublicUrl = process.env.GOOGLE_SHEETS_PUBLIC_URL;
    
    if (!googleSheetsPublicUrl) {
      // Return empty array if not configured
      return NextResponse.json({ reviews: [] });
    }

    // Fetch reviews from Google Sheets (published as JSON or via API)
    const response = await fetch(googleSheetsPublicUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ reviews: data.reviews || [] });
    } else {
      return NextResponse.json({ reviews: [] });
    }
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ reviews: [] });
  }
}

