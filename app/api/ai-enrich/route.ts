import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    // Try OpenAI if API key is available
    if (openAIApiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openAIApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a programming tutor. Provide detailed, technical explanations with code examples. Focus on explaining concepts, syntax, usage, and practical examples. Do NOT add generic sections like 'Key Takeaways', 'Next Steps', 'Summary', or 'Conclusion'. Only provide the actual detailed explanation of the topic.",
            },
            {
              role: "user",
              content: `Explain "${title}" in comprehensive detail. Cover:
- What it is and its purpose
- How it works (mechanism/behavior)
- Different types/variations if applicable
- Syntax and usage examples
- Important concepts and edge cases
- Practical code examples

Be thorough, technical, and educational. Provide actual detailed explanation, not generic advice sections.

Context: ${content.substring(0, 600)}`,
            },
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedText = data.choices[0]?.message?.content;
        if (generatedText) {
          return NextResponse.json({ content: generatedText, source: "openai" });
        }
      }
    }

    // Fallback: Try Hugging Face with multiple models and retry logic
    const prompt = `Explain "${title}" in detail. What it is, how it works, types, examples. Context: ${content.substring(0, 400)}`;
    
    // Try more reliable models first
    const models = [
      "google/flan-t5-large",
      "google/flan-t5-base", 
      "facebook/bart-large-cnn",
      "gpt2",
    ];
    
    for (const model of models) {
      try {
        const hfResponse = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                max_length: 300,
                temperature: 0.7,
                return_full_text: false,
              },
            }),
          }
        );

        if (hfResponse.ok) {
          const data = await hfResponse.json();
          let generatedText = "";
          
          if (Array.isArray(data) && data[0]?.generated_text) {
            generatedText = data[0].generated_text.replace(prompt, "").trim();
          } else if (data.generated_text) {
            generatedText = data.generated_text.replace(prompt, "").trim();
          } else if (data[0]?.summary_text) {
            // For summarization models
            generatedText = data[0].summary_text;
          }

          if (generatedText && generatedText.length > 30) {
            return NextResponse.json({ content: generatedText, source: "huggingface" });
          }
        } else if (hfResponse.status === 503) {
          // Model is loading, wait a bit and try again
          const retryAfter = hfResponse.headers.get("Retry-After");
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
          
          // Wait and retry once
          await new Promise(resolve => setTimeout(resolve, Math.min(waitTime, 10000)));
          
          const retryResponse = await fetch(
            `https://api-inference.huggingface.co/models/${model}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inputs: prompt,
                parameters: {
                  max_length: 300,
                  temperature: 0.7,
                  return_full_text: false,
                },
              }),
            }
          );

          if (retryResponse.ok) {
            const retryData = await retryResponse.json();
            let generatedText = "";
            
            if (Array.isArray(retryData) && retryData[0]?.generated_text) {
              generatedText = retryData[0].generated_text.replace(prompt, "").trim();
            } else if (retryData.generated_text) {
              generatedText = retryData.generated_text.replace(prompt, "").trim();
            }

            if (generatedText && generatedText.length > 30) {
              return NextResponse.json({ content: generatedText, source: "huggingface" });
            }
          }
        }
      } catch (err) {
        // Continue to next model
        continue;
      }
    }

    // If all models failed, return null to trigger basic explanation fallback
    return NextResponse.json(
      { 
        error: "AI services are temporarily unavailable. Please try again later." 
      },
      { status: 503 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate enriched content" },
      { status: 500 }
    );
  }
}

