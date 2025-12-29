"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import ExpandableSection from "./ExpandableSection";
import FloatingStartQuizButton from "./FloatingStartQuizButton";
import { useEffect, useState } from "react";

interface ConceptPageContentProps {
  content: string;
  conceptName?: string;
}

export default function ConceptPageContent({ content, conceptName }: ConceptPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [displayName, setDisplayName] = useState<string>("");

  // Helper function to convert to title case
  const toTitleCase = (str: string): string => {
    return str
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    // Use conceptName prop if available, otherwise extract from URL
    if (conceptName) {
      setDisplayName(conceptName);
    } else if (pathname) {
      // Extract concept name from pathname (e.g., "/concepts/javascript" -> "javascript")
      const pathParts = pathname.split("/");
      const conceptFromPath = pathParts[pathParts.length - 1];
      if (conceptFromPath && conceptFromPath !== "concepts") {
        setDisplayName(conceptFromPath);
      }
    }
  }, [conceptName, pathname]);

  // Stop all speech when navigating to a different page
  useEffect(() => {
    return () => {
      // Stop all speech synthesis when component unmounts (page change)
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [pathname]);
  // Parse expandable sections: <expand title="Title">content</expand>
  // Handle titles with quotes by matching everything between title=" and ">
  const expandableRegex = /<expand\s+title="(.*?)">([\s\S]*?)<\/expand>/g;
  const parts: Array<{ type: "text" | "expandable"; content: string; title?: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = expandableRegex.exec(content)) !== null) {
    // Add text before the expandable section
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    // Add expandable section
    parts.push({
      type: "expandable",
      title: match[1],
      content: match[2].trim(),
    });
    lastIndex = expandableRegex.lastIndex;
  }
  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.slice(lastIndex),
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 relative">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <FaArrowLeft size={18} />
              <span className="hidden sm:inline">Back</span>
            </button>
            {displayName && (
              <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                {toTitleCase(displayName)}
              </h1>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
          <div className="text-slate-900 dark:text-slate-100 leading-relaxed">
            {parts.map((part, index) => {
              if (part.type === "expandable") {
                return (
                  <ExpandableSection
                    key={index}
                    title={part.title || "Section"}
                    content={part.content}
                  />
                );
              }
              return (
                <div key={index} className="markdown-content">
                  <ReactMarkdown>{part.content}</ReactMarkdown>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* Floating Start Quiz Button */}
      {displayName && (
        <div className="fixed bottom-6 right-6 z-30">
          <FloatingStartQuizButton conceptName={displayName.toLowerCase()} />
        </div>
      )}
    </div>
  );
}

