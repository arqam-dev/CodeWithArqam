"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
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
        const questionMatch = expandContent.match(/\*\*Question:\*\*\s*(.+?)(?=\*\*Answer:\*\*|$)/s);
        const answerMatch = expandContent.match(/\*\*Answer:\*\*\s*(.+?)$/s);
        
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

  const renderQuestion = (section: QuestionSection) => {
    const isExpanded = expandedQuestions.has(section.title);
    const answerVisible = showAnswers.has(section.title);

    return (
      <div
        key={section.title}
        className="mb-6 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800"
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
              <div className="mb-4">
                <div className="font-semibold text-slate-900 dark:text-white mb-2">Question:</div>
                <div className="text-slate-700 dark:text-slate-300">
                  <ReactMarkdown>{section.question}</ReactMarkdown>
                </div>
              </div>
            )}
            
            {section.answer && (
              <>
                {!answerVisible ? (
                  <button
                    onClick={(e) => toggleAnswer(section.title, e)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    See Answer
                  </button>
                ) : (
                  <div className="mt-4">
                    <div className="font-semibold text-slate-900 dark:text-white mb-2">Answer:</div>
                    <div className="interview-answer-container">
                      <div className="interview-answer-content">
                        <ReactMarkdown>{section.answer}</ReactMarkdown>
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleAnswer(section.title, e)}
                      className="mt-4 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors cursor-pointer"
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
    </div>
  );
}

