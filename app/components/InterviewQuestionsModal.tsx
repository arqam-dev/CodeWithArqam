"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes, FaArrowUp, FaArrowDown, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

interface InterviewQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  content: string;
}

interface QuestionSection {
  title: string;
  content: string;
  type: 'general' | 'scenario';
}

export default function InterviewQuestionsModal({ isOpen, onClose, category, content }: InterviewQuestionsModalProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [showAnswers, setShowAnswers] = useState<Set<string>>(new Set());
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      setExpandedQuestions(new Set());
      setShowAnswers(new Set());
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Parse the markdown content to extract expandable sections
  const parseContent = (): QuestionSection[] => {
    const sections: QuestionSection[] = [];
    const expandRegex = /<expand title="([^"]+)">\s*([\s\S]*?)<\/expand>/g;
    let match;
    
    while ((match = expandRegex.exec(content)) !== null) {
      const title = match[1];
      const sectionContent = match[2];
      const type = sectionContent.includes('**Question:**') && sectionContent.includes('**Answer:**') 
        ? (sectionContent.includes('Scenario:') ? 'scenario' : 'general')
        : 'general';
      
      sections.push({
        title,
        content: sectionContent,
        type
      });
    }
    
    return sections;
  };

  const questions = parseContent();
  const generalQuestions = questions.filter(q => q.type === 'general');
  const scenarioQuestions = questions.filter(q => q.type === 'scenario');

  const toggleQuestion = (title: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
      // Also hide answer when collapsing
      const newShowAnswers = new Set(showAnswers);
      newShowAnswers.delete(title);
      setShowAnswers(newShowAnswers);
    } else {
      newExpanded.add(title);
    }
    setExpandedQuestions(newExpanded);
  };

  const toggleAnswer = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newShowAnswers = new Set(showAnswers);
    if (newShowAnswers.has(title)) {
      newShowAnswers.delete(title);
    } else {
      newShowAnswers.add(title);
    }
    setShowAnswers(newShowAnswers);
  };

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: modalContentRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const renderQuestionContent = (section: QuestionSection) => {
    const isExpanded = expandedQuestions.has(section.title);
    const answerVisible = showAnswers.has(section.title);
    
    // Extract question and answer from content
    const questionMatch = section.content.match(/\*\*Question:\*\*\s*(.+?)(?=\*\*Answer:\*\*|$)/s);
    const answerMatch = section.content.match(/\*\*Answer:\*\*\s*(.+?)$/s);
    
    const question = questionMatch ? questionMatch[1].trim() : '';
    const answer = answerMatch ? answerMatch[1].trim() : '';

    return (
      <div
        key={section.title}
        className="mb-4 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
      >
        <button
          onClick={() => toggleQuestion(section.title)}
          className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-between text-left"
        >
          <span className="font-semibold text-slate-900 dark:text-white pr-4">{section.title}</span>
          {isExpanded ? (
            <FaChevronUp className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
          ) : (
            <FaChevronDown className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
          )}
        </button>
        
        {isExpanded && (
          <div className="px-6 py-4 bg-white dark:bg-slate-900">
            {question && (
              <div className="mb-4">
                <div className="font-semibold text-slate-900 dark:text-white mb-2">Question:</div>
                <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                  <ReactMarkdown>{question}</ReactMarkdown>
                </div>
              </div>
            )}
            
            {answer && (
              <>
                {!answerVisible ? (
                  <button
                    onClick={(e) => toggleAnswer(section.title, e)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    See Answer
                  </button>
                ) : (
                  <div className="mt-4">
                    <div className="font-semibold text-slate-900 dark:text-white mb-2">Answer:</div>
                    <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                      <ReactMarkdown>{answer}</ReactMarkdown>
                    </div>
                    <button
                      onClick={(e) => toggleAnswer(section.title, e)}
                      className="mt-4 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                    >
                      Hide Answer
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {category.charAt(0).toUpperCase() + category.slice(1)} Interview Questions
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {generalQuestions.length} General Questions • {scenarioQuestions.length} Scenario-Based Questions
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Close"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Content */}
          <div
            ref={modalContentRef}
            className="flex-1 overflow-y-auto p-6"
          >
            {/* General Questions */}
            {generalQuestions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  General Questions & Answers
                </h3>
                {generalQuestions.map(renderQuestionContent)}
              </div>
            )}

            {/* Scenario-Based Questions */}
            {scenarioQuestions.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Scenario-Based Questions & Answers
                </h3>
                {scenarioQuestions.map(renderQuestionContent)}
              </div>
            )}
          </div>

          {/* Scroll Buttons */}
          <div className="absolute bottom-24 right-6 flex flex-col space-y-2">
            <button
              onClick={scrollToTop}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
              aria-label="Scroll to top"
            >
              <FaArrowUp size={16} />
            </button>
            <button
              onClick={scrollToBottom}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
              aria-label="Scroll to bottom"
            >
              <FaArrowDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

