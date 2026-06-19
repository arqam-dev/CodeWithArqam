"use client";

import { useState } from "react";
import { FaRobot, FaSpinner, FaCheckCircle, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

interface AIEnrichmentProps {
  title: string;
  originalContent: string;
  hideBorder?: boolean;
  onOpen?: () => void; // Callback when AI Enrichment is opened
  showButtonOnly?: boolean; // Show only the button
  showContentOnly?: boolean; // Show only the content (requires enrichedContent prop)
  enrichedContent?: string | null; // Controlled enriched content
  onEnrichedContentChange?: (content: string | null) => void; // Callback when content changes
}

const mdComponents: Record<string, React.ComponentType<any>> = {
  h1: ({ children }) => <h1 className="text-lg font-black text-slate-900 dark:text-white mt-4 mb-2 pb-1.5 border-b-2 border-purple-100 dark:border-purple-900/40 flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-purple-500 flex-shrink-0" />{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mt-4 mb-2 flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-indigo-500 flex-shrink-0" />{children}</h2>,
  h3: ({ children }) => <h3 className="text-xs font-bold text-violet-700 dark:text-violet-300 mt-3 mb-1 uppercase tracking-widest">{children}</h3>,
  p: ({ children }) => <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5">{children}</p>,
  ul: ({ children }) => <ul className="space-y-1 pl-0 list-none mb-2.5">{children}</ul>,
  ol: ({ children }) => <ol className="space-y-1 pl-0 list-none mb-2.5">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] font-bold">›</span>
      <span className="leading-relaxed">{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong className="font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 px-1 rounded-sm not-italic">{children}</strong>,
  em: ({ children }) => <em className="text-indigo-600 dark:text-indigo-400 not-italic font-medium">{children}</em>,
  code: ({ inline, children }: any) =>
    inline
      ? <code className="bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200 dark:border-slate-700">{children}</code>
      : <pre className="bg-[#0d1117] rounded-xl p-3.5 overflow-x-auto mb-2.5 mt-1.5 border border-slate-700/50"><code className="text-green-400 text-xs font-mono leading-relaxed">{children}</code></pre>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-purple-400 bg-purple-50 dark:bg-purple-900/20 pl-3.5 py-2.5 pr-3 rounded-r-xl mb-2.5">
      <div className="text-[10px] font-bold text-purple-600 dark:text-purple-400 mb-1 uppercase tracking-wide">💡 Note</div>
      <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
    </blockquote>
  ),
  table: ({ children }) => <div className="overflow-x-auto mb-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"><table className="w-full text-xs">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-gradient-to-r from-purple-50 to-slate-50 dark:from-purple-900/30 dark:to-slate-800 text-slate-700 dark:text-slate-200 font-semibold">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">{children}</tr>,
  th: ({ children }) => <th className="px-3 py-2 text-left font-bold tracking-wide">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{children}</td>,
  hr: () => <hr className="my-4 border-0 h-px bg-gradient-to-r from-transparent via-purple-200 dark:via-purple-800 to-transparent" />,
  a: ({ href, children }: any) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 underline decoration-dotted underline-offset-2 hover:decoration-solid">{children}</a>,
};

// Smart local enrichment fallback (mirrors server-side logic)
function generateBasicExplanation(title: string, content: string): string {
  const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
  const bullets = lines
    .filter(l => /^[-*•]/.test(l))
    .map(l => l.replace(/^[-*•]+\s*/, "").trim())
    .filter(Boolean);
  const textLines = lines.filter(l => !/^[-*•#`]/.test(l) && l.length > 15);
  const allItems = bullets.length > 0 ? bullets : textLines.slice(0, 8);
  const isTech = /function|variable|const|let|var|array|object|class|method|type|error|promise|async|loop|import|component|hook|api|rest|sql|cache|event|state|render|dom|http/i.test(title + content);

  let out = `## Overview\n\n`;
  if (textLines.length > 0) out += `${textLines[0]}\n\n`;
  out += `**${title}** is a key concept in ${isTech ? "software engineering" : "technical practice"}. This enriched guide provides deeper explanations, examples, and actionable insights.\n\n`;

  if (allItems.length > 0) {
    out += `## Key Concepts\n\n`;
    allItems.slice(0, 6).forEach((item, i) => {
      out += `### ${i + 1}. ${item.split(/[-:,]/)[0].trim().slice(0, 60)}\n\n`;
      out += `**${item}**\n\nThis is ${i === 0 ? "the foundational aspect" : "an important aspect"} of **${title}**. Understanding it fully enables you to apply it confidently in real-world scenarios.\n\n`;
    });
  }

  out += `## Best Practices\n\n`;
  out += `- ✅ **Consistency** — Apply uniform patterns across your codebase\n`;
  out += `- ✅ **Test edge cases** — Verify behavior for null, empty, and boundary values\n`;
  out += `- ✅ **Document intent** — Explain *why*, not just *what*\n`;
  out += `- ✅ **Handle errors** — Never assume the happy path always succeeds\n\n`;

  out += `## Interview Questions\n\n`;
  out += `1. **Explain ${title} in your own words** — Cover purpose, mechanism, and an example\n`;
  out += `2. **What are the advantages and limitations?** — Discuss real trade-offs\n`;
  out += `3. **When would you choose this over alternatives?** — Show contextual awareness\n`;
  out += `4. **What breaks if implemented incorrectly?** — Demonstrate failure-mode awareness\n\n`;

  if (allItems.length > 0) {
    out += `## Quick Reference\n\n`;
    allItems.slice(0, 6).forEach(item => { out += `- ${item}\n`; });
    out += "\n";
  }

  out += `## Summary\n\n**${title}** rewards careful study. `;
  if (allItems.length > 0) out += `Key areas include *${allItems[0]}*${allItems.length > 1 ? ` through to *${allItems[allItems.length - 1]}*` : ""}. `;
  out += `Apply best practices consistently and be prepared to discuss trade-offs confidently.\n`;

  return out;
}

export default function AIEnrichment({ title, originalContent, hideBorder = false, onOpen, showButtonOnly = false, showContentOnly = false, enrichedContent: controlledEnrichedContent, onEnrichedContentChange }: AIEnrichmentProps) {
  const [isEnriching, setIsEnriching] = useState(false);
  const [internalEnrichedContent, setInternalEnrichedContent] = useState<string | null>(null);
  
  // Use controlled content if provided, otherwise use internal state
  const enrichedContent = controlledEnrichedContent !== undefined ? controlledEnrichedContent : internalEnrichedContent;
  
  const setEnrichedContent = (content: string | null) => {
    if (controlledEnrichedContent === undefined) {
      setInternalEnrichedContent(content);
    }
    if (onEnrichedContentChange) {
      onEnrichedContentChange(content);
    }
  };

  const handleEnrich = async () => {
    // Notify parent that AI Enrichment is opening
    if (onOpen) {
      onOpen();
    }
    setIsEnriching(true);

    try {
      // Use Next.js API route as proxy (handles both OpenAI and Hugging Face)
      const response = await fetch("/api/ai-enrich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: originalContent,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.content) {
          setEnrichedContent(data.content);
        } else if (data.error) {
          // If AI fails, automatically use basic explanation
          const basicExplanation = generateBasicExplanation(title, originalContent);
          setEnrichedContent(basicExplanation);
        } else {
          // Fallback to basic explanation
          const basicExplanation = generateBasicExplanation(title, originalContent);
          setEnrichedContent(basicExplanation);
        }
      } else {
        // If API fails, use basic explanation
        const basicExplanation = generateBasicExplanation(title, originalContent);
        setEnrichedContent(basicExplanation);
      }
    } catch (err: any) {
      // On any error, automatically use basic explanation instead of showing error
      const basicExplanation = generateBasicExplanation(title, originalContent);
      setEnrichedContent(basicExplanation);
    } finally {
      setIsEnriching(false);
    }
  };

  // If showButtonOnly, only render the button
  if (showButtonOnly) {
    return (
      <button
        onClick={handleEnrich}
        disabled={isEnriching}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/25 hover:border-purple-400/40 text-purple-400 hover:text-purple-300 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isEnriching ? (
          <>
            <FaSpinner className="animate-spin" size={11} />
            <span>Enriching…</span>
          </>
        ) : (
          <>
            <FaRobot size={11} />
            <span>Enrich with AI</span>
          </>
        )}
      </button>
    );
  }

  // If showContentOnly, only render the content
  if (showContentOnly && enrichedContent) {
    return (
      <div className="mt-3">
        <div className="rounded-xl border border-purple-200/60 dark:border-purple-800/40 overflow-hidden" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f0f4ff 100%)' }}>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-purple-100 dark:border-purple-800/40" style={{ background: 'linear-gradient(90deg, #7c3aed15, #4f46e515)' }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-sm">
                <FaRobot size={10} className="text-white" />
              </div>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300">AI Enriched</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full font-medium">Enhanced</span>
            </div>
            <button onClick={() => setEnrichedContent(null)}
              className="w-5 h-5 rounded-full bg-white/60 hover:bg-purple-100 dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 hover:text-purple-600 transition-colors cursor-pointer">
              <FaTimes size={8} />
            </button>
          </div>
          <div className="px-4 py-3 dark:bg-slate-800/40">
            <ReactMarkdown components={mdComponents}>{enrichedContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  // Default behavior
  return (
    <div className={hideBorder ? "" : "mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"}>
      {!enrichedContent && (
        <button
          onClick={handleEnrich}
          disabled={isEnriching}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isEnriching ? (
            <>
              <FaSpinner className="animate-spin" size={16} />
              <span>Enriching with AI...</span>
            </>
          ) : (
            <>
              <FaRobot size={16} />
              <span>Enrich with AI</span>
            </>
          )}
        </button>
      )}

      {enrichedContent && (
        <div className="mt-3 rounded-xl border border-purple-200/60 dark:border-purple-800/40 overflow-hidden" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f0f4ff 100%)' }}>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-purple-100 dark:border-purple-800/40" style={{ background: 'linear-gradient(90deg, #7c3aed15, #4f46e515)' }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-sm">
                <FaRobot size={10} className="text-white" />
              </div>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300">AI Enriched</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full font-medium">Enhanced</span>
            </div>
            <button onClick={() => setEnrichedContent(null)}
              className="w-5 h-5 rounded-full bg-white/60 hover:bg-purple-100 dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 hover:text-purple-600 transition-colors cursor-pointer">
              <FaTimes size={8} />
            </button>
          </div>
          <div className="px-4 py-3 dark:bg-slate-800/40">
            <ReactMarkdown components={mdComponents}>{enrichedContent}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

