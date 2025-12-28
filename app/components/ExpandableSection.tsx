"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FaExpand, FaTimes } from "react-icons/fa";
import AIEnrichment from "./support/AIEnrichment";
import TextToSpeechSection from "./support/TextToSpeechSection";

interface ExpandableSectionProps {
  title: string;
  content: string;
}

export default function ExpandableSection({ title, content }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextToSpeechOpen, setIsTextToSpeechOpen] = useState(false);
  const [isAIEnrichmentOpen, setIsAIEnrichmentOpen] = useState(false);
  const [aiEnrichedContent, setAIEnrichedContent] = useState<string | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Stop speech when section is collapsed
  useEffect(() => {
    if (!isOpen) {
      // Stop all speech globally
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsTextToSpeechOpen(false);
      setIsAIEnrichmentOpen(false);
    }
  }, [isOpen]);

  // Stop speech when modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      // Stop all speech globally
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isModalOpen]);

  // Close Text to Speech when AI Enrichment opens
  const handleAIEnrichmentOpen = () => {
    setIsAIEnrichmentOpen(true);
    setIsTextToSpeechOpen(false);
    // Stop speech when AI opens
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Close AI Enrichment when Text to Speech opens
  const handleTextToSpeechOpen = () => {
    setIsTextToSpeechOpen(true);
    setIsAIEnrichmentOpen(false);
    // Don't reset AI content, just hide it
  };
  
  // Reset states when section closes
  useEffect(() => {
    if (!isOpen) {
      setIsTextToSpeechOpen(false);
      setIsAIEnrichmentOpen(false);
      setAIEnrichedContent(null);
    }
  }, [isOpen]);

  return (
    <>
      <div className="expandable-section">
        <button
          className="expandable-header cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="expandable-title">{title}</span>
          <span className="expandable-icon">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <div className="expandable-content">
            <div className="expandable-content-inner">
              <ReactMarkdown>{content}</ReactMarkdown>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 flex-wrap mb-4">
                  <TextToSpeechSection 
                    text={content} 
                    title={title} 
                    hideBorder={true}
                    isOpen={isTextToSpeechOpen}
                    onOpen={handleTextToSpeechOpen}
                    onClose={() => setIsTextToSpeechOpen(false)}
                    showButtonOnly={true}
                  />
                  <AIEnrichment 
                    title={title} 
                    originalContent={content} 
                    hideBorder={true}
                    onOpen={handleAIEnrichmentOpen}
                    showButtonOnly={true}
                    enrichedContent={aiEnrichedContent}
                    onEnrichedContentChange={setAIEnrichedContent}
                  />
                </div>
                {isTextToSpeechOpen && (
                  <div className="w-full">
                    <TextToSpeechSection 
                      text={content} 
                      title={title} 
                      hideBorder={false}
                      isOpen={true}
                      onClose={() => setIsTextToSpeechOpen(false)}
                      showContentOnly={true}
                    />
                  </div>
                )}
                {isAIEnrichmentOpen && !isTextToSpeechOpen && aiEnrichedContent && (
                  <div className="w-full">
                    <AIEnrichment 
                      title={title} 
                      originalContent={content} 
                      hideBorder={false}
                      showContentOnly={true}
                      enrichedContent={aiEnrichedContent}
                      onEnrichedContentChange={setAIEnrichedContent}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Fullscreen button - sticky */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="expandable-fullscreen-btn cursor-pointer"
              aria-label="Open in fullscreen"
              title="Open in fullscreen"
            >
              <FaExpand size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div 
          className="expandable-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="expandable-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="expandable-modal-header">
              <h2 className="expandable-modal-title">{title}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="expandable-modal-close cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="expandable-modal-body">
              <ReactMarkdown>{content}</ReactMarkdown>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 flex-wrap mb-4">
                  <TextToSpeechSection 
                    text={content} 
                    title={title} 
                    hideBorder={true}
                    isOpen={isTextToSpeechOpen}
                    onOpen={handleTextToSpeechOpen}
                    onClose={() => setIsTextToSpeechOpen(false)}
                    showButtonOnly={true}
                  />
                  <AIEnrichment 
                    title={title} 
                    originalContent={content} 
                    hideBorder={true}
                    onOpen={handleAIEnrichmentOpen}
                    showButtonOnly={true}
                    enrichedContent={aiEnrichedContent}
                    onEnrichedContentChange={setAIEnrichedContent}
                  />
                </div>
                {isTextToSpeechOpen && (
                  <div className="w-full">
                    <TextToSpeechSection 
                      text={content} 
                      title={title} 
                      hideBorder={false}
                      isOpen={true}
                      onClose={() => setIsTextToSpeechOpen(false)}
                      showContentOnly={true}
                    />
                  </div>
                )}
                {isAIEnrichmentOpen && !isTextToSpeechOpen && aiEnrichedContent && (
                  <div className="w-full">
                    <AIEnrichment 
                      title={title} 
                      originalContent={content} 
                      hideBorder={false}
                      showContentOnly={true}
                      enrichedContent={aiEnrichedContent}
                      onEnrichedContentChange={setAIEnrichedContent}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

