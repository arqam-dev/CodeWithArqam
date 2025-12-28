"use client";

import { useState, useRef, useEffect } from "react";
import { FaVolumeUp, FaCheckCircle } from "react-icons/fa";
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
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <FaVolumeUp size={16} />
        <span>Text to Speech</span>
      </button>
    );
  }

  // If showContentOnly, only render the content
  if (showContentOnly && isOpen) {
    return (
      <div className={hideBorder ? "" : "mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"}>
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-900 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 mb-3">
            <FaCheckCircle className="text-blue-600 dark:text-blue-400" size={16} />
            <h4 className="font-semibold text-slate-900 dark:text-white">Text to Speech</h4>
          </div>
          <TextToSpeech ref={textToSpeechRef} text={text} title={title} />
          <button
            onClick={handleClose}
            className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Hide text to speech
          </button>
        </div>
      </div>
    );
  }

  // Default behavior: show button when closed, content when open
  return (
    <div className={hideBorder ? "" : "mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"}>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <FaVolumeUp size={16} />
          <span>Text to Speech</span>
        </button>
      )}

      {isOpen && (
        <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-900 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 mb-3">
            <FaCheckCircle className="text-blue-600 dark:text-blue-400" size={16} />
            <h4 className="font-semibold text-slate-900 dark:text-white">Text to Speech</h4>
          </div>
          <TextToSpeech ref={textToSpeechRef} text={text} title={title} />
          <button
            onClick={handleClose}
            className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Hide text to speech
          </button>
        </div>
      )}
    </div>
  );
}

