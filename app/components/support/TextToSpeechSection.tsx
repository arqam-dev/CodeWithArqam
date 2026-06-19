"use client";

import { useState, useRef, useEffect } from "react";
import { FaVolumeUp } from "react-icons/fa";
import TextToSpeech, { TextToSpeechRef } from "./TextToSpeech";

interface TextToSpeechSectionProps {
  text: string;
  title?: string;
  hideBorder?: boolean;
  onOpen?: () => void; // Callback when Text to Speech is opened
  isOpen?: boolean; // Controlled open state
  onClose?: () => void; // Callback when Text to Speech is closed
  showButtonOnly?: boolean; // Show only the button
  showContentOnly?: boolean; // Show only the content (no button)
}

export default function TextToSpeechSection({ text, title, hideBorder = false, onOpen, isOpen: controlledIsOpen, onClose, showButtonOnly = false, showContentOnly = false }: TextToSpeechSectionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const textToSpeechRef = useRef<TextToSpeechRef>(null);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(true);
    }
    if (onOpen) {
      onOpen();
    }
  };

  const handleClose = () => {
    // Stop speech when closing
    if (textToSpeechRef.current) {
      textToSpeechRef.current.stop();
    }
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(false);
    }
    if (onClose) {
      onClose();
    }
  };
  
  // Close when controlled state changes to false
  useEffect(() => {
    if (controlledIsOpen === false && textToSpeechRef.current) {
      textToSpeechRef.current.stop();
    }
  }, [controlledIsOpen]);

  // If showButtonOnly, only render the button
  if (showButtonOnly) {
    return (
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/25 hover:border-blue-400/40 text-blue-400 hover:text-blue-300 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
      >
        <FaVolumeUp size={11} />
        <span>Text to Speech</span>
      </button>
    );
  }

  // If showContentOnly, only render the content
  if (showContentOnly && isOpen) {
    return (
      <div className="mt-3">
        <TextToSpeech ref={textToSpeechRef} text={text} title={title} />
        <button
          onClick={handleClose}
          className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
        >
          Hide player
        </button>
      </div>
    );
  }

  // Default behavior: show button when closed, content when open
  return (
    <div className={hideBorder ? "" : "mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"}>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/25 hover:border-blue-400/40 text-blue-400 hover:text-blue-300 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
        >
          <FaVolumeUp size={11} />
          <span>Text to Speech</span>
        </button>
      )}

      {isOpen && (
        <div className="mt-3">
          <TextToSpeech ref={textToSpeechRef} text={text} title={title} />
          <button
            onClick={handleClose}
            className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            Hide player
          </button>
        </div>
      )}
    </div>
  );
}

