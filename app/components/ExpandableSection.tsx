"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FaExpand, FaTimes } from "react-icons/fa";
import AIEnrichment from "./support/AIEnrichment";

interface ExpandableSectionProps {
  title: string;
  content: string;
}

export default function ExpandableSection({ title, content }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div className="expandable-section">
        <button
          className="expandable-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="expandable-title">{title}</span>
          <span className="expandable-icon">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <div className="expandable-content">
            <div className="expandable-content-inner">
              <ReactMarkdown>{content}</ReactMarkdown>
              <AIEnrichment title={title} originalContent={content} />
            </div>
            {/* Fullscreen button - sticky */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="expandable-fullscreen-btn"
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
                className="expandable-modal-close"
                aria-label="Close modal"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="expandable-modal-body">
              <ReactMarkdown>{content}</ReactMarkdown>
              <AIEnrichment title={title} originalContent={content} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

