"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaCopy, FaCheck, FaExpand, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

interface InterviewQuestionsPageContentProps {
  content: string;
  category: string;
}

interface QuestionSection {
  title: string;
  question: string;
  answer: string;
  type: 'general' | 'scenario';
}

export default function InterviewQuestionsPageContent({ content, category }: InterviewQuestionsPageContentProps) {
  const router = useRouter();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [showAnswers, setShowAnswers] = useState<Set<string>>(new Set());
  const [copiedQuestions, setCopiedQuestions] = useState<Set<string>>(new Set());
  const [fullscreenQuestion, setFullscreenQuestion] = useState<string | null>(null);
  
  // Enable copy/fullscreen for all interview questions
  const enableCopyFullscreen = true;

  // Parse the markdown content to extract expandable sections
  const parseContent = (): { general: QuestionSection[]; scenario: QuestionSection[] } => {
    const general: QuestionSection[] = [];
    const scenario: QuestionSection[] = [];
    
    // Split content by section headers
    const generalMatch = content.match(/## General Questions & Answers\s*([\s\S]*?)(?=## Scenario-Based Questions & Answers|$)/);
    const scenarioMatch = content.match(/## Scenario-Based Questions & Answers\s*([\s\S]*?)$/);
    
    const parseSection = (sectionContent: string, type: 'general' | 'scenario') => {
      const expandRegex = /<expand title="([^"]+)">\s*([\s\S]*?)<\/expand>/g;
      let match;
      const sections: QuestionSection[] = [];
      
      while ((match = expandRegex.exec(sectionContent)) !== null) {
        const title = match[1];
        const expandContent = match[2];
        
        // Extract question and answer
        const questionMatch = expandContent.match(/\*\*Question:\*\*\s*([\s\S]+?)(?=\*\*Answer:\*\*|$)/);
        const answerMatch = expandContent.match(/\*\*Answer:\*\*\s*([\s\S]+?)$/);
        
        const question = questionMatch ? questionMatch[1].trim() : '';
        const answer = answerMatch ? answerMatch[1].trim() : '';
        
        sections.push({
          title,
          question,
          answer,
          type
        });
      }
      
      return sections;
    };
    
    if (generalMatch) {
      general.push(...parseSection(generalMatch[1], 'general'));
    }
    
    if (scenarioMatch) {
      scenario.push(...parseSection(scenarioMatch[1], 'scenario'));
    }
    
    return { general, scenario };
  };

  const { general, scenario } = parseContent();

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

  const toTitleCase = (str: string): string => {
    return str
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (fullscreenQuestion) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenQuestion]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenQuestion) {
        setFullscreenQuestion(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [fullscreenQuestion]);

  // Copy question and answer to clipboard
  const handleCopy = async (section: QuestionSection, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    try {
      const textToCopy = `${section.title}\n\nQuestion: ${section.question}\n\nAnswer: ${section.answer}`;
      await navigator.clipboard.writeText(textToCopy);
      const newCopied = new Set(copiedQuestions);
      newCopied.add(section.title);
      setCopiedQuestions(newCopied);
      setTimeout(() => {
        const newCopiedAfter = new Set(copiedQuestions);
        newCopiedAfter.delete(section.title);
        setCopiedQuestions(newCopiedAfter);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderQuestion = (section: QuestionSection) => {
    const isExpanded = expandedQuestions.has(section.title);
    const answerVisible = showAnswers.has(section.title);
    const isCopied = copiedQuestions.has(section.title);

    return (
      <div
        key={section.title}
        className="mb-6 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 relative"
      >
        <button
          onClick={() => toggleQuestion(section.title)}
          className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-between text-left cursor-pointer"
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
            {section.question && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Question</div>
                <div className="text-slate-800 dark:text-slate-200 leading-relaxed">
                  <ReactMarkdown>{section.question}</ReactMarkdown>
                </div>
              </div>
            )}
            
            {section.answer && (
              <>
                {!answerVisible ? (
                  <button
                    onClick={(e) => toggleAnswer(section.title, e)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    Show Answer
                  </button>
                ) : (
                  <div className="mt-5 relative">
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">Answer</div>
                    <div className="interview-answer-container">
                      <div className="interview-answer-content">
                        <ReactMarkdown>{section.answer}</ReactMarkdown>
                      </div>
                    </div>
                    {/* Copy and Fullscreen buttons - positioned like other concepts - only for system-design */}
                    {enableCopyFullscreen && (
                      <div className="expandable-action-buttons">
                        {/* Copy button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(section, e);
                          }}
                          className="expandable-copy-btn cursor-pointer"
                          aria-label="Copy content"
                          title={isCopied ? "Copied!" : "Copy content"}
                        >
                          {isCopied ? <FaCheck size={16} /> : <FaCopy size={16} />}
                        </button>
                        {/* Fullscreen button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFullscreenQuestion(section.title);
                          }}
                          className="expandable-fullscreen-btn cursor-pointer"
                          aria-label="Open in fullscreen"
                          title="Open in fullscreen"
                        >
                          <FaExpand size={16} />
                        </button>
                      </div>
                    )}
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
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
              {toTitleCase(category)} Interview Questions
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
          {/* General Questions */}
          {general.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
                General Questions & Answers
              </h2>
              {general.map(renderQuestion)}
            </div>
          )}

          {/* Scenario-Based Questions */}
          {scenario.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
                Scenario-Based Questions & Answers
              </h2>
              {scenario.map(renderQuestion)}
            </div>
          )}
        </div>
      </main>

      {/* Fullscreen Modal */}
      {fullscreenQuestion && enableCopyFullscreen && (() => {
        const section = [...general, ...scenario].find(s => s.title === fullscreenQuestion);
        if (!section) return null;
        const isCopied = copiedQuestions.has(section.title);
        
        return (
          <div 
            className="expandable-modal-overlay"
            onClick={() => setFullscreenQuestion(null)}
          >
            <div 
              className="expandable-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="expandable-modal-header">
                <h2 className="expandable-modal-title">{section.title}</h2>
                <button
                  onClick={() => setFullscreenQuestion(null)}
                  className="expandable-modal-close cursor-pointer"
                  aria-label="Close modal"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="expandable-modal-body">
                <div className="expandable-modal-body-inner interview-modal-content">
                  {section.question && (
                    <div className="interview-modal-question">
                      <div className="interview-modal-label">Question</div>
                      <div className="interview-modal-text">
                        <ReactMarkdown>{section.question}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                  
                  {section.answer && (
                    <div className="interview-modal-answer">
                      <div className="interview-modal-label">Answer</div>
                      <div className="interview-modal-text">
                        <ReactMarkdown>{section.answer}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                  
                  {/* Copy button - sticky at bottom right of modal */}
                  {enableCopyFullscreen && (
                    <button
                      onClick={() => handleCopy(section)}
                      className="expandable-modal-copy-btn cursor-pointer"
                      aria-label="Copy content"
                      title={isCopied ? "Copied!" : "Copy content"}
                    >
                      {isCopied ? <FaCheck size={16} /> : <FaCopy size={16} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

