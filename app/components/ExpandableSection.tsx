"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FaExpand, FaTimes, FaCopy, FaCheck, FaChevronDown } from "react-icons/fa";
import AIEnrichment from "./support/AIEnrichment";
import TextToSpeechSection from "./support/TextToSpeechSection";

interface ExpandableSectionProps {
  title: string;
  content: string;
}

// Assign a color accent to each section based on its index or title hash
function getAccentColor(title: string): { border: string; badge: string; icon: string } {
  const colors = [
    { border: "border-l-blue-500", badge: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300", icon: "text-blue-500" },
    { border: "border-l-purple-500", badge: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300", icon: "text-purple-500" },
    { border: "border-l-emerald-500", badge: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300", icon: "text-emerald-500" },
    { border: "border-l-amber-500", badge: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300", icon: "text-amber-500" },
    { border: "border-l-rose-500", badge: "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300", icon: "text-rose-500" },
    { border: "border-l-cyan-500", badge: "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300", icon: "text-cyan-500" },
    { border: "border-l-indigo-500", badge: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300", icon: "text-indigo-500" },
    { border: "border-l-orange-500", badge: "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300", icon: "text-orange-500" },
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) & 0xffff;
  return colors[hash % colors.length];
}

const mdComponents: Record<string, React.ComponentType<any>> = {
  h1: ({ children }) => (
    <h1 className="text-xl font-black text-slate-900 dark:text-white mt-5 mb-3 pb-2 border-b-2 border-blue-100 dark:border-blue-900/40 flex items-center gap-2.5">
      <span className="w-3.5 h-3.5 rounded-sm bg-blue-500 flex-shrink-0 shadow-sm" />
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 mt-5 mb-2.5 flex items-center gap-2">
      <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 flex-shrink-0" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[0.82rem] font-bold text-violet-700 dark:text-violet-300 mt-3.5 mb-1.5 uppercase tracking-widest">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }) => <ul className="space-y-1.5 pl-0 list-none mb-3">{children}</ul>,
  ol: ({ children }) => <ol className="space-y-1.5 pl-0 list-none mb-3">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[11px] font-bold">›</span>
      <span className="leading-relaxed">{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-bold bg-amber-50 dark:bg-amber-900/25 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-sm not-italic">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-indigo-600 dark:text-indigo-400 not-italic font-medium">{children}</em>
  ),
  code: ({ inline, children }: any) =>
    inline ? (
      <code className="bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded text-[0.78rem] font-mono border border-slate-200 dark:border-slate-700">{children}</code>
    ) : (
      <pre className="bg-[#0d1117] rounded-xl p-4 overflow-x-auto mb-3 mt-2 border border-slate-700/50 shadow-inner">
        <code className="text-green-400 text-xs font-mono leading-relaxed">{children}</code>
      </pre>
    ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20 pl-4 py-3 pr-3 rounded-r-xl mb-3 not-italic">
      <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wide">💡 Note</div>
      <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <table className="w-full text-xs">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700/80 text-slate-700 dark:text-slate-200">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">{children}</tr>,
  th: ({ children }) => <th className="px-3 py-2.5 text-left font-bold tracking-wide">{children}</th>,
  td: ({ children }) => <td className="px-3 py-2.5 text-slate-600 dark:text-slate-400">{children}</td>,
  hr: () => <hr className="my-5 border-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />,
  a: ({ href, children }: any) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline decoration-dotted underline-offset-2 hover:decoration-solid transition-all">{children}</a>
  ),
};

export default function ExpandableSection({ title, content }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextToSpeechOpen, setIsTextToSpeechOpen] = useState(false);
  const [isAIEnrichmentOpen, setIsAIEnrichmentOpen] = useState(false);
  const [aiEnrichedContent, setAIEnrichedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const accent = getAccentColor(title);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
      setIsTextToSpeechOpen(false);
      setIsAIEnrichmentOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    }
  }, [isModalOpen]);

  const handleAIEnrichmentOpen = () => {
    setIsAIEnrichmentOpen(true);
    setIsTextToSpeechOpen(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  };
  const handleTextToSpeechOpen = () => {
    setIsTextToSpeechOpen(true);
    setIsAIEnrichmentOpen(false);
  };
  useEffect(() => {
    if (!isOpen) {
      setIsTextToSpeechOpen(false);
      setIsAIEnrichmentOpen(false);
      setAIEnrichedContent(null);
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`# ${title}\n\n${content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error('Failed to copy:', err); }
  };

  const ActionBar = () => (
    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
      <div className="flex items-center gap-3 flex-wrap mb-3">
        <TextToSpeechSection text={content} title={title} hideBorder={true}
          isOpen={isTextToSpeechOpen} onOpen={handleTextToSpeechOpen}
          onClose={() => setIsTextToSpeechOpen(false)} showButtonOnly={true} />
        <AIEnrichment title={title} originalContent={content} hideBorder={true}
          onOpen={handleAIEnrichmentOpen} showButtonOnly={true}
          enrichedContent={aiEnrichedContent} onEnrichedContentChange={setAIEnrichedContent} />
      </div>
      {isTextToSpeechOpen && (
        <div className="w-full">
          <TextToSpeechSection text={content} title={title} hideBorder={false}
            isOpen={true} onClose={() => setIsTextToSpeechOpen(false)} showContentOnly={true} />
        </div>
      )}
      {isAIEnrichmentOpen && !isTextToSpeechOpen && aiEnrichedContent && (
        <div className="w-full">
          <AIEnrichment title={title} originalContent={content} hideBorder={false}
            showContentOnly={true} enrichedContent={aiEnrichedContent} onEnrichedContentChange={setAIEnrichedContent} />
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* â”€â”€ Card â”€â”€ */}
      <div className={`group mb-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 border-l-[5px] ${accent.border} bg-white dark:bg-slate-800/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}>
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-200 cursor-pointer gap-3 ${isOpen ? 'bg-slate-50/80 dark:bg-slate-700/40' : 'hover:bg-slate-50/60 dark:hover:bg-slate-700/30'}`}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${accent.badge}`}>
              <span className="text-sm font-black leading-none">&#10022;</span>
            </div>
            <div className="min-w-0">
              <span className="font-bold text-slate-800 dark:text-slate-100 text-[0.97rem] leading-snug block">{title}</span>
              {!isOpen && <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">Click to expand</span>}
            </div>
          </div>
          <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${isOpen ? `${accent.badge} border-transparent` : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600'} transition-all duration-200`}>
            <FaChevronDown size={11} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* Expanded Content */}
        {isOpen && (
          <div className="border-t border-slate-100 dark:border-slate-700/50">
            <div className="px-5 pt-4 pb-2 relative">
              <div className="expandable-content-inner">
                <ReactMarkdown components={mdComponents}>{aiEnrichedContent || content}</ReactMarkdown>
              </div>
              <ActionBar />
            </div>
            {/* Sticky action buttons */}
            <div className="expandable-action-buttons">
              <button onClick={handleCopy} className="expandable-copy-btn cursor-pointer" aria-label="Copy" title={copied ? "Copied!" : "Copy"}>
                {copied ? <FaCheck size={15} /> : <FaCopy size={15} />}
              </button>
              <button onClick={() => setIsModalOpen(true)} className="expandable-fullscreen-btn cursor-pointer" aria-label="Fullscreen" title="Fullscreen">
                <FaExpand size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* â”€â”€ Fullscreen Modal â”€â”€ */}
      {isModalOpen && (
        <div className="expandable-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="expandable-modal-content" onClick={e => e.stopPropagation()}>
            <div className="expandable-modal-header">
              <h2 className="expandable-modal-title">{title}</h2>
              <button onClick={() => setIsModalOpen(false)} className="expandable-modal-close cursor-pointer" aria-label="Close modal">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="expandable-modal-body">
              <div className="expandable-modal-body-inner">
                <ReactMarkdown components={mdComponents}>{aiEnrichedContent || content}</ReactMarkdown>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <TextToSpeechSection text={content} title={title} hideBorder={true}
                      isOpen={isTextToSpeechOpen} onOpen={handleTextToSpeechOpen}
                      onClose={() => setIsTextToSpeechOpen(false)} showButtonOnly={true} />
                    <AIEnrichment title={title} originalContent={content} hideBorder={true}
                      onOpen={handleAIEnrichmentOpen} showButtonOnly={true}
                      enrichedContent={aiEnrichedContent} onEnrichedContentChange={setAIEnrichedContent} />
                  </div>
                  {isTextToSpeechOpen && (
                    <div className="w-full">
                      <TextToSpeechSection text={content} title={title} hideBorder={false}
                        isOpen={true} onClose={() => setIsTextToSpeechOpen(false)} showContentOnly={true} />
                    </div>
                  )}
                  {isAIEnrichmentOpen && !isTextToSpeechOpen && aiEnrichedContent && (
                    <div className="w-full">
                      <AIEnrichment title={title} originalContent={content} hideBorder={false}
                        showContentOnly={true} enrichedContent={aiEnrichedContent} onEnrichedContentChange={setAIEnrichedContent} />
                    </div>
                  )}
                </div>
              </div>
              <button onClick={handleCopy} className="expandable-modal-copy-btn cursor-pointer" aria-label="Copy" title={copied ? "Copied!" : "Copy"}>
                {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


interface ExpandableSectionProps {
  title: string;
  content: string;
}
