"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import ExpandableSection from "./ExpandableSection";
import FloatingStartQuizButton from "./FloatingStartQuizButton";
import QuizInlineSection from "./QuizInlineSection";
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [quizData, setQuizData] = useState<any>(null);

  // Helper function to convert to title case
  const toTitleCase = (str: string): string => {
    // Handle camelCase by inserting space before capital letters
    let processed = str.replace(/([a-z])([A-Z])/g, '$1 $2');
    // Replace hyphens with spaces
    processed = processed.replace(/-/g, ' ');
    // Split and capitalize each word
    return processed
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

  // Load quiz data when displayName is ready
  useEffect(() => {
    if (!displayName) return;
    fetch(`/api/quiz/${displayName.toLowerCase()}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setQuizData(data); })
      .catch(() => {});
  }, [displayName]);

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
    const seenIds = new Set<string>();
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
          // Only add if we haven't seen this ID before
          if (!seenIds.has(id)) {
            seenIds.add(id);
            sections.push({ title, id });
          }
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
  const allParts: Array<{ type: "text" | "expandable"; content: string; title?: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = expandableRegex.exec(content)) !== null) {
    // Add text before the expandable section
    if (match.index > lastIndex) {
      allParts.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    // Add expandable section
    allParts.push({
      type: "expandable",
      title: match[1],
      content: match[2].trim(),
    });
    lastIndex = expandableRegex.lastIndex;
  }
  // Add remaining text
  if (lastIndex < content.length) {
    allParts.push({
      type: "text",
      content: content.slice(lastIndex),
    });
  }

  // Filter parts based on search query
  const parts = searchQuery.trim() ? allParts.filter(part => {
    if (part.type === "expandable") {
      // Search in title
      const titleMatch = part.title?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Search in content for subtitles (## headings)
      const subtitleRegex = /^##\s+(.+)$/gm;
      const contentMatch = part.content.match(subtitleRegex);
      const hasMatchingSubtitle = contentMatch?.some(subtitle => 
        subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Also search in the content text itself
      const contentTextMatch = part.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      return titleMatch || hasMatchingSubtitle || contentTextMatch;
    }
    // For text parts, search in content
    return part.content.toLowerCase().includes(searchQuery.toLowerCase());
  }) : allParts;

  const totalSections = allParts.filter(p => p.type === "expandable").length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ── Sticky Nav Bar ── */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <FaArrowLeft size={13} />
              <span className="hidden sm:inline font-medium">Back</span>
            </button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700" />
            {displayName && (
              <span className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                {toTitleCase(displayName)}
              </span>
            )}
            <div className="ml-auto flex items-center gap-2">
              {totalSections > 0 && (
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  {totalSections} topics
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      {displayName && (
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '32px 32px'}} />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    📚 Concept Guide
                  </span>
                  {totalSections > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/20">
                      {totalSections} sections
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {toTitleCase(displayName)}
                </h1>
                <p className="mt-3 text-blue-200/80 text-sm sm:text-base max-w-xl">
                  Deep-dive reference guide — expand any section to study, get AI enrichment, or listen via text-to-speech.
                </p>
              </div>
              {/* Search in hero */}
              <div className="sm:w-72 flex-shrink-0">
                <div className="relative">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                  <input
                    type="text"
                    placeholder="Search topics…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/15 transition-all"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
                      <FaTimes size={12} />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="text-xs text-blue-300/70 mt-2 text-center">
                    {parts.filter(p => p.type === "expandable").length} match{parts.filter(p => p.type === "expandable").length !== 1 ? 'es' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ── Two-column layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">

        {/* ── Sidebar ── */}
        {sections.length > 0 && (
          <>
            <aside
              className={`fixed top-20 left-4 w-56 z-30 transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)] lg:translate-x-0"
              }`}
              style={{ maxHeight: 'calc(100vh - 5.5rem)', overflowY: 'auto' }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Contents</span>
                  <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer">
                    <FaTimes size={13} />
                  </button>
                </div>
                <nav className="space-y-0.5">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                        activeSection === section.id
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeSection === section.id ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="fixed lg:hidden bottom-20 left-4 z-40 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl cursor-pointer">
              <FaBars size={16} />
            </button>
          </>
        )}

        {/* ── Main content ── */}
        <main className={`flex-1 min-w-0 ${sections.length > 0 ? 'lg:ml-64' : ''}`}>
          {/* section header count */}
          {searchQuery && (
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <FaSearch size={12} />
              <span>Showing <strong className="text-slate-700 dark:text-slate-200">{parts.filter(p => p.type === "expandable").length}</strong> results for "<em>{searchQuery}</em>"</span>
              <button onClick={() => setSearchQuery("")} className="text-blue-600 hover:underline cursor-pointer text-xs">Clear</button>
            </div>
          )}
          <div className="space-y-1">
            {parts.map((part, index) => {
              if (part.type === "expandable") {
                return (
                  <ExpandableSection key={index} title={part.title || "Section"} content={part.content} />
                );
              }
              return (
                <div key={index} className="prose prose-slate dark:prose-invert max-w-none mb-4 px-1">
                  <ReactMarkdown
                    components={{
                      h2: ({ node, children, ...props }) => {
                        const text = String(children);
                        const section = sections.find(s => s.title === text);
                        if (section) {
                          return (
                            <h2 id={section.id} className="scroll-mt-20 flex items-center gap-3 text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700" {...props}>
                              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500 inline-block" />
                              {children}
                            </h2>
                          );
                        }
                        return <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4" {...props}>{children}</h2>;
                      }
                    }}
                  >
                    {part.content}
                  </ReactMarkdown>
                </div>
              );
            })}
          </div>

          {/* Inline quiz section */}
          {quizData && !searchQuery && (
            <QuizInlineSection quizData={quizData} />
          )}
        </main>
      </div>

      {/* Floating Quiz Button */}
      {displayName && (
        <div className="fixed bottom-6 right-6 z-30">
          <FloatingStartQuizButton conceptName={displayName.toLowerCase()} />
        </div>
      )}
    </div>
  );
}

