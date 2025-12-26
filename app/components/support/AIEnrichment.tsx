"use client";

import { useState } from "react";
import { FaRobot, FaSpinner, FaCheckCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

interface AIEnrichmentProps {
  title: string;
  originalContent: string;
}

// Helper function to generate a basic explanation from content
function generateBasicExplanation(title: string, content: string): string {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
  const relevantSentences = sentences.slice(0, 8).join(". ").trim();
  
  return `## ${title}

${relevantSentences}

This concept is an important part of programming. The content above provides key information about how it works and its usage.`;
}

export default function AIEnrichment({ title, originalContent }: AIEnrichmentProps) {
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichedContent, setEnrichedContent] = useState<string | null>(null);

  const handleEnrich = async () => {
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

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
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
        <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-700 dark:to-slate-900 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-2 mb-3">
            <FaCheckCircle className="text-purple-600 dark:text-purple-400" size={16} />
            <h4 className="font-semibold text-slate-900 dark:text-white">Enriched Content</h4>
          </div>
          <div className="markdown-content text-sm">
            <ReactMarkdown>{enrichedContent}</ReactMarkdown>
          </div>
          <button
            onClick={() => {
              setEnrichedContent(null);
            }}
            className="mt-3 text-sm text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
          >
            Hide enriched content
          </button>
        </div>
      )}
    </div>
  );
}

