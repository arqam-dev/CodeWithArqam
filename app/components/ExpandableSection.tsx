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
      <div className={`group mb-3 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 ${accent.border} bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}>
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors duration-150 cursor-pointer gap-3"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${accent.badge.includes('blue') ? 'bg-blue-400' : accent.badge.includes('purple') ? 'bg-purple-400' : accent.badge.includes('emerald') ? 'bg-emerald-400' : accent.badge.includes('amber') ? 'bg-amber-400' : accent.badge.includes('rose') ? 'bg-rose-400' : accent.badge.includes('cyan') ? 'bg-cyan-400' : accent.badge.includes('indigo') ? 'bg-indigo-400' : 'bg-orange-400'}`} />
            <span className="font-semibold text-slate-800 dark:text-slate-100 text-[0.95rem] leading-snug">{title}</span>
          </div>
          <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${isOpen ? accent.badge : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'} transition-all duration-200`}>
            <FaChevronDown size={11} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* Expanded Content */}
        {isOpen && (
          <div className="border-t border-slate-100 dark:border-slate-700/50">
            <div className="px-5 pt-4 pb-2 relative">
              <div className="expandable-content-inner markdown-content prose prose-slate dark:prose-invert max-w-none text-sm">
                <ReactMarkdown>{content}</ReactMarkdown>
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
                <ReactMarkdown>{content}</ReactMarkdown>
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
