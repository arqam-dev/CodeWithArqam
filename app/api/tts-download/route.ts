import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, rate, pitch, volume, voiceLang } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // Clean and prepare text
    const cleanText = text
      .replace(/[#*_`\[\]()]/g, '') // Remove markdown syntax
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    
    if (cleanText.length === 0) {
      return NextResponse.json(
        { error: "No valid text to convert" },
        { status: 400 }
      );
    }

    // Use Google Translate TTS (free, no API key required)
    // Split long text into chunks (200 chars max per request)
    const maxChunkLength = 200;
    const chunks: string[] = [];
    
    for (let i = 0; i < cleanText.length; i += maxChunkLength) {
      chunks.push(cleanText.substring(i, i + maxChunkLength));
    }

    const lang = voiceLang || "en";
    const audioChunks: ArrayBuffer[] = [];

    // Fetch audio for each chunk
    for (const chunk of chunks) {
      try {
        const encodedText = encodeURIComponent(chunk);
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodedText}`;
        
        const response = await fetch(ttsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://translate.google.com/',
          },
        });

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          audioChunks.push(audioBuffer);
          
          // Small delay between requests to avoid rate limiting
          if (chunks.length > 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
      } catch (chunkError) {
        console.error("Error fetching chunk:", chunkError);
        // Continue with other chunks
      }
    }

    if (audioChunks.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate audio. Please try again." },
        { status: 500 }
      );
    }

    // Combine all audio chunks
    const totalLength = audioChunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    
    for (const chunk of audioChunks) {
      combinedBuffer.set(new Uint8Array(chunk), offset);
      offset += chunk.byteLength;
    }

    return new NextResponse(combinedBuffer.buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `attachment; filename="tts-audio.mp3"`,
      },
    });
  } catch (error: any) {
    console.error("TTS Download Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate audio" },
      { status: 500 }
    );
  }
}

