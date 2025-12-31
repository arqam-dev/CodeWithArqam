"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaCopy, FaCheck, FaExpand, FaTimes, FaLightbulb, FaBrain, FaBars, FaSearch } from "react-icons/fa";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
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

  const { general: allGeneral, scenario: allScenario } = parseContent();

  // Filter questions based on search query
  const filterQuestions = (questions: QuestionSection[]) => {
    if (!searchQuery.trim()) return questions;
    
    const query = searchQuery.toLowerCase();
    return questions.filter(section => {
      // Search in title
      const titleMatch = section.title.toLowerCase().includes(query);
      
      // Search in question text
      const questionMatch = section.question.toLowerCase().includes(query);
      
      // Search in answer text
      const answerMatch = section.answer.toLowerCase().includes(query);
      
      return titleMatch || questionMatch || answerMatch;
    });
  };

  const general = filterQuestions(allGeneral);
  const scenario = filterQuestions(allScenario);

  // Sidebar sections - only high-level categories (use all counts, not filtered)
  const sidebarSections = [
    { id: "general-questions", title: "General Questions", count: allGeneral.length },
    { id: "scenario-questions", title: "Scenario Questions", count: allScenario.length },
  ].filter(section => section.count > 0);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsSidebarOpen(false);
    }
  };

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
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-blue-200 dark:border-slate-600">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <FaBrain className="text-blue-600 dark:text-blue-400 text-lg animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="font-semibold text-blue-700 dark:text-blue-400">💡 Think First!</span> Take a moment to formulate your answer before viewing the solution. This will help you learn more effectively.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleAnswer(section.title, e)}
                      className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 group"
                    >
                      <FaLightbulb className="group-hover:rotate-12 transition-transform duration-300 lightbulb-pulse" />
                      <span>Show Answer</span>
                    </button>
                  </div>
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

      {/* Sidebar - Integrated side menu, part of the page */}
      {sidebarSections.length > 0 && (
        <>
          <aside
            className={`fixed top-24 left-6 w-60 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm transition-transform duration-300 z-30 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
            style={{ 
              height: 'fit-content', 
              minHeight: '160px',
              maxHeight: 'calc(100vh - 7rem)',
              overflowY: 'auto'
            }}
          >
            <div className="p-4">
              {/* Search Bar - Available on all interview question pages */}
              <div className="mb-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={14} />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 focus:border-transparent transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                      aria-label="Clear search"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {general.length + scenario.length} result{(general.length + scenario.length) !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Quick Navigation</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <FaTimes size={14} />
                </button>
              </div>
              <div className="space-y-1.5">
                {sidebarSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group relative overflow-hidden ${
                      activeSection === section.id
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium shadow-sm border-l-3 border-blue-500"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          activeSection === section.id
                            ? "bg-blue-500"
                            : "bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-400"
                        } transition-colors`}></span>
                        {section.title}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        activeSection === section.id
                          ? "bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      } transition-colors`}>
                        {section.count}
                      </span>
                    </div>
                    {activeSection === section.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed lg:hidden bottom-6 left-6 z-40 p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-200 cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <FaBars size={18} />
          </button>
        </>
      )}

      {/* Main Content - Always centered, never shifted */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
          {/* General Questions */}
          {general.length > 0 && (
            <div id="general-questions" className="mb-12 scroll-mt-20">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
                General Questions & Answers
              </h2>
              {general.map(renderQuestion)}
            </div>
          )}

          {/* Scenario-Based Questions */}
          {scenario.length > 0 && (
            <div id="scenario-questions" className="scroll-mt-20">
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

