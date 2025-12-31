"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

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

  // Extract Primary/Secondary Concepts sections
  const extractSections = () => {
    const sections: Array<{ title: string; id: string }> = [];
    const lines = content.split('\n');
    
    // Look for Primary Concepts and Secondary Concepts
    const highLevelPatterns = [
      /^Primary\s+Concepts?$/i,
      /^Secondary\s+Concepts?$/i,
      /^Primary$/i,
      /^Secondary$/i
    ];
    
    for (const line of lines) {
      const match = line.match(/^##\s+(.+)$/);
      if (match) {
        const title = match[1].trim();
        const isHighLevel = highLevelPatterns.some(pattern => pattern.test(title));
        if (isHighLevel) {
          const id = title.toLowerCase().replace(/\s+/g, '-');
          sections.push({ title, id });
        }
      }
    }
    return sections;
  };

  const sections = extractSections();

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsSidebarOpen(false);
    }
  };

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

      {/* Sidebar - Integrated side menu, part of the page */}
      {sections.length > 0 && (
        <>
          <aside
            className={`fixed top-24 left-6 w-60 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm transition-transform duration-300 z-30 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
            style={{ 
              height: 'fit-content', 
              minHeight: '160px',
              maxHeight: 'calc(100vh - 7rem)',
              overflowY: 'auto'
            }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Quick Navigation</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <FaTimes size={14} />
                </button>
              </div>
              <div className="space-y-1.5">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group relative overflow-hidden ${
                      activeSection === section.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium shadow-sm border-l-3 border-blue-500"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          activeSection === section.id
                            ? "bg-blue-500"
                            : "bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-400"
                        } transition-colors`}></span>
                        {section.title}
                      </span>
                    </div>
                    {activeSection === section.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed lg:hidden bottom-6 left-6 z-40 p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-200 cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <FaBars size={18} />
          </button>
        </>
      )}

      {/* Main Content - Always centered, never shifted */}
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
                  <ReactMarkdown
                    components={{
                      h2: ({ node, children, ...props }) => {
                        const text = String(children);
                        const section = sections.find(s => s.title === text);
                        if (section) {
                          return <h2 id={section.id} className="scroll-mt-20" {...props}>{children}</h2>;
                        }
                        return <h2 {...props}>{children}</h2>;
                      }
                    }}
                  >
                    {part.content}
                  </ReactMarkdown>
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

