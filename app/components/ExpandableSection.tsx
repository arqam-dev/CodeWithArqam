"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ExpandableSectionProps {
  title: string;
  content: string;
}

export default function ExpandableSection({ title, content }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

