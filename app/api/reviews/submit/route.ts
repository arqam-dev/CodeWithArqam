import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, rating, comment } = await request.json();

    // Validate input
    if (!name || !email || !rating || !comment) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Google Sheets API endpoint
    const googleSheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (!googleSheetsWebhook) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set in environment variables");
      return NextResponse.json(
        { 
          error: "Reviews system not configured. Please set up Google Sheets webhook.",
          message: "Your review will be visible after setup."
        },
        { status: 503 }
      );
    }
    
    console.log("Submitting review to:", googleSheetsWebhook);

    // Submit to Google Sheets via webhook (using Google Apps Script)
    // Google Apps Script web apps handle CORS automatically
    const response = await fetch(googleSheetsWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        rating: parseInt(rating),
        comment,
        timestamp: new Date().toISOString(),
      }),
    });

    // Check response
    const responseText = await response.text();
    console.log("Google Sheets response status:", response.status);
    console.log("Google Sheets response:", responseText);
    
    if (response.ok || response.status === 200) {
      try {
        const data = JSON.parse(responseText);
        if (data.success || data.message) {
          return NextResponse.json({ 
            success: true,
            message: "Thank you for your review! It will be visible shortly." 
          });
        }
      } catch (e) {
        // Even if JSON parsing fails, if status is OK, consider it success
        return NextResponse.json({ 
          success: true,
          message: "Thank you for your review! It will be visible shortly." 
        });
      }
    }
    
    // If we get here, there was an error
    const errorText = responseText || "Unknown error";
    console.error("Google Sheets API error:", response.status, errorText);
    throw new Error(`Failed to submit review: ${response.status} - ${errorText.substring(0, 100)}`);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to submit review" },
      { status: 500 }
    );
  }
}

