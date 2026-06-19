import { NextRequest, NextResponse } from "next/server";

// ─── Smart local enrichment engine (no API key required) ─────────────────────
function smartEnrich(title: string, content: string): string {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  const bullets = lines
    .filter((l) => /^[-*•]/.test(l))
    .map((l) => l.replace(/^[-*•]+\s*/, "").trim())
    .filter(Boolean);
  const textLines = lines.filter(
    (l) => !/^[-*•#`]/.test(l) && l.length > 15
  );
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
  const hasExistingCode = codeBlocks.length > 0;

  const combined = (title + " " + content).toLowerCase();
  const isTech =
    /function|variable|const|let|var|array|object|class|method|type|error|promise|async|loop|import|export|component|hook|api|rest|graphql|sql|query|cache|event|state|render|dom|http|css|html|node|react|next|typescript/i.test(
      combined
    );

  const allItems = bullets.length > 0 ? bullets : textLines.slice(0, 10);

  let out = "";

  // ── 1. Introduction ──────────────────────────────────────────────────────
  out += `## Overview\n\n`;
  if (textLines.length > 0) {
    out += `${textLines[0]}\n\n`;
  }
  out += `**${title}** is a key concept in modern ${isTech ? "software engineering" : "technical practice"}. `;
  out += `A thorough understanding — from theory to practical application — is essential for both day-to-day development and technical interviews. `;
  out += `This enriched guide expands on the core material with deeper explanations, examples, and actionable insights.\n\n`;

  // ── 2. Deep Dive ─────────────────────────────────────────────────────────
  if (allItems.length > 0) {
    out += `## Deep Dive into Key Concepts\n\n`;
    allItems.slice(0, 8).forEach((item, idx) => {
      const shortLabel = item.split(/[-:,]/)[0].trim().slice(0, 60);
      out += `### ${idx + 1}. ${shortLabel}\n\n`;
      out += `**${item}**\n\n`;
      out += `This point is significant because it ${
        idx === 0
          ? "forms the foundation of the entire topic"
          : idx === allItems.length - 1
          ? "ties together all the preceding concepts"
          : "builds on the previous concepts and introduces additional nuance"
      }. `;
      out += `In practical terms, developers encounter this when ${
        isTech
          ? "building or maintaining production systems, particularly during code reviews and architecture discussions"
          : "working on real-world projects that require this knowledge"
      }.\n\n`;
    });
  }

  // ── 3. How It Works ──────────────────────────────────────────────────────
  out += `## How It Works\n\n`;
  out += `The underlying mechanism of **${title}** can be broken down into clear stages:\n\n`;
  if (allItems.length >= 3) {
    out += `1. **Setup / Initialization** — ${allItems[0]}\n`;
    out += `2. **Core Processing** — ${allItems[Math.floor(allItems.length / 2)]}\n`;
    out += `3. **Output / Result** — ${allItems[allItems.length - 1]}\n\n`;
  } else {
    out += `1. **Understand the inputs** — Identify what data or state is required\n`;
    out += `2. **Apply the logic** — Execute the core transformation or operation\n`;
    out += `3. **Handle the output** — Consume, store, or display the result\n\n`;
  }
  out += `Each stage depends on the previous one, making it critical to handle errors and edge cases at every step.\n\n`;

  // ── 4. Code Example (tech topics) ────────────────────────────────────────
  if (isTech && !hasExistingCode) {
    out += `## Code Example\n\n`;
    out += `Below is a representative pattern showing **${title}** in practice:\n\n`;
    out += "```javascript\n";
    out += `// ─── ${title} ─────────────────────────────\n`;
    if (allItems.length >= 2) {
      out += `// Step 1: ${allItems[0]}\n`;
      out += `const setup = initialize();\n\n`;
      out += `// Step 2: ${allItems[1]}\n`;
      out += `const result = setup.process(input);\n\n`;
    } else {
      out += `const result = applyConceptLogic(input);\n\n`;
    }
    out += `// Handle result\n`;
    out += `if (result) {\n`;
    out += `  console.log('Success:', result);\n`;
    out += `} else {\n`;
    out += `  console.error('Unexpected outcome — check inputs');\n`;
    out += `}\n`;
    out += "```\n\n";
    out += `> 💡 **Tip:** Always validate inputs before processing and handle both success and failure branches explicitly.\n\n`;
  } else if (hasExistingCode) {
    out += `## Understanding the Code\n\n`;
    out += `The code examples in the original content illustrate the core behavior. Pay attention to:\n\n`;
    out += `- The **entry point** — where execution begins\n`;
    out += `- **Parameter handling** — how inputs are accepted and validated\n`;
    out += `- **Return values** — what the function or method produces\n`;
    out += `- **Side effects** — any state changes or external interactions\n\n`;
  }

  // ── 5. Best Practices ────────────────────────────────────────────────────
  out += `## Best Practices\n\n`;
  out += `Industry professionals recommend the following when working with **${title}**:\n\n`;
  out += `- ✅ **Consistency** — Apply uniform patterns across your codebase to reduce cognitive overhead\n`;
  out += `- ✅ **Minimal complexity** — Prefer the simplest solution that meets requirements\n`;
  out += `- ✅ **Explicit over implicit** — Write code/logic that is self-explanatory\n`;
  out += `- ✅ **Test edge cases** — Always verify behaviour for empty, null, boundary, and error inputs\n`;
  out += `- ✅ **Document intent** — Comment *why* you made a decision, not just *what* the code does\n\n`;

  // ── 6. Common Pitfalls ────────────────────────────────────────────────────
  out += `## Common Pitfalls & How to Avoid Them\n\n`;
  out += `| Pitfall | Why it happens | How to avoid |\n`;
  out += `|---------|---------------|---------------|\n`;
  out += `| Over-engineering | Solving future problems that don't exist yet | Build for today's requirements only |\n`;
  out += `| Ignoring edge cases | Happy-path thinking during development | Write tests for null, empty, and boundary values |\n`;
  out += `| Missing error handling | Assuming operations always succeed | Wrap in try/catch, validate inputs upfront |\n`;
  out += `| Premature optimisation | Optimising before profiling | Profile first, then optimise the actual bottleneck |\n`;
  out += `| Inconsistent naming | Different developers use different conventions | Enforce a style guide via linting |\n\n`;

  // ── 7. Interview Questions ─────────────────────────────────────────────
  out += `## Interview Questions\n\n`;
  out += `Prepare clear, confident answers to these questions about **${title}**:\n\n`;
  out += `1. **Can you explain ${title} in your own words?**\n`;
  out += `   *Focus on the core purpose, then describe the mechanism, then give an example.*\n\n`;
  out += `2. **What are the main advantages and limitations?**\n`;
  out += `   *Discuss real trade-offs — every approach has a context where it shines and one where it struggles.*\n\n`;
  out += `3. **How does this compare to [common alternative]?**\n`;
  out += `   *Know where this fits in the broader ecosystem and when you would choose it over alternatives.*\n\n`;
  out += `4. **Describe a situation where you used this in production.**\n`;
  out += `   *Prepare a brief STAR story: Situation, Task, Action, Result.*\n\n`;
  out += `5. **What would break if this was implemented incorrectly?**\n`;
  out += `   *Demonstrate awareness of failure modes — this shows senior-level thinking.*\n\n`;

  // ── 8. Quick Reference ─────────────────────────────────────────────────
  if (allItems.length > 0) {
    out += `## Quick Reference\n\n`;
    out += `Key points from **${title}** at a glance:\n\n`;
    allItems.slice(0, 6).forEach((item) => {
      out += `- ${item}\n`;
    });
    out += `\n`;
  }

  // ── 9. Summary ──────────────────────────────────────────────────────────
  out += `## Summary\n\n`;
  out += `**${title}** is ${isTech ? "a technical concept" : "a concept"} that rewards careful study. `;
  if (allItems.length > 0) {
    out += `The material covers ${allItems.length} key areas including *${allItems[0]}*`;
    if (allItems.length > 1) out += ` and *${allItems[allItems.length - 1]}*`;
    out += `. `;
  }
  out += `By understanding the underlying mechanism, following best practices, and being aware of common pitfalls, `;
  out += `you will be well-prepared to apply this knowledge confidently in both real projects and technical interviews.\n`;

  return out;
}

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

    // All external AI calls failed or no key — use smart local enrichment
    const enriched = smartEnrich(title, content);
    return NextResponse.json({ content: enriched, source: "local" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate enriched content" },
      { status: 500 }
    );
  }
}

