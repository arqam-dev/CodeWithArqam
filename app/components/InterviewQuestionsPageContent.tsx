"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft, FaChevronDown, FaChevronUp, FaCopy, FaCheck, FaExpand, FaTimes,
  FaLightbulb, FaBrain, FaBars, FaSearch, FaFilter, FaClock, FaCheckCircle,
  FaCircle, FaArrowRight, FaStar, FaFire, FaTrophy, FaRocket, FaCode, FaLayerGroup,
  FaBook, FaBolt, FaChartBar
} from "react-icons/fa";
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
  difficulty?: 'easy' | 'medium' | 'hard';
  index?: number;
}

const difficultyConfig = {
  easy:   { label: "Easy",   color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30", border: "border-emerald-400", dot: "bg-emerald-400" },
  medium: { label: "Medium", color: "text-amber-600  dark:text-amber-400",   bg: "bg-amber-50  dark:bg-amber-900/30",   border: "border-amber-400",   dot: "bg-amber-400"   },
  hard:   { label: "Hard",   color: "text-rose-600   dark:text-rose-400",    bg: "bg-rose-50   dark:bg-rose-900/30",    border: "border-rose-400",    dot: "bg-rose-400"    },
};

function assignDifficulty(index: number): 'easy' | 'medium' | 'hard' {
  if (index < 4) return 'easy';
  if (index < 8) return 'medium';
  return 'hard';
}

const categoryMeta: Record<string, { icon: string; color: string; gradient: string; tips: string[] }> = {
  frontend:      { icon: "⚛️", color: "from-cyan-500 to-blue-600",    gradient: "from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",    tips: ["Focus on browser APIs", "Know your CSS layout models", "Master async JS"] },
  backend:       { icon: "🖥️", color: "from-violet-500 to-purple-600", gradient: "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20", tips: ["Understand RESTful design", "Know DB indexing", "Study auth patterns"] },
  databases:     { icon: "🗄️", color: "from-orange-500 to-amber-600",  gradient: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",  tips: ["ACID properties are key", "Know when to use NoSQL", "Index optimization"] },
  "system-design": { icon: "🏗️", color: "from-indigo-500 to-blue-600", gradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",    tips: ["Think in trade-offs", "Start with requirements", "Scale incrementally"] },
};

export default function InterviewQuestionsPageContent({ content, category }: InterviewQuestionsPageContentProps) {
  const router = useRouter();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [showAnswers, setShowAnswers] = useState<Set<string>>(new Set());
  const [copiedQuestions, setCopiedQuestions] = useState<Set<string>>(new Set());
  const [fullscreenQuestion, setFullscreenQuestion] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [viewedAnswers, setViewedAnswers] = useState<Set<string>>(new Set());

  // Enable copy/fullscreen for all interview questions
  const enableCopyFullscreen = true;

  const meta = categoryMeta[category] ?? { icon: "💼", color: "from-slate-500 to-slate-600", gradient: "from-slate-50 to-white dark:from-slate-900/20 dark:to-slate-800/20", tips: ["Read questions carefully", "Structure your answers", "Use real examples"] };

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
      let idx = 0;
      
      while ((match = expandRegex.exec(sectionContent)) !== null) {
        const title = match[1];
        const expandContent = match[2];
        
        // Extract question and answer
        const questionMatch = expandContent.match(/\*\*Question:\*\*\s*([\s\S]+?)(?=\*\*Answer:\*\*|$)/);
        const answerMatch = expandContent.match(/\*\*Answer:\*\*\s*([\s\S]+?)$/);
        
        const question = questionMatch ? questionMatch[1].trim() : '';
        const answer = answerMatch ? answerMatch[1].trim() : '';
        
        sections.push({ title, question, answer, type, difficulty: assignDifficulty(idx), index: idx });
        idx++;
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

  // Filter questions based on search query and difficulty
  const filterQuestions = (questions: QuestionSection[]) => {
    let filtered = questions;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.question.toLowerCase().includes(query) ||
        s.answer.toLowerCase().includes(query)
      );
    }
    if (difficultyFilter !== "all") {
      filtered = filtered.filter(s => s.difficulty === difficultyFilter);
    }
    return filtered;
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
      // Track viewed answers for progress
      setViewedAnswers(prev => new Set(prev).add(title));
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

  // Rich markdown components for answer content
  const mdComponents: Record<string, React.ComponentType<any>> = {
    h1: ({children}) => (
      <h1 className="text-base font-black text-blue-700 dark:text-blue-300 mt-5 mb-2.5 pb-1.5 border-b-2 border-blue-200 dark:border-blue-800 flex items-center gap-2">
        <span className="w-3 h-3 bg-blue-500 rounded-sm inline-block flex-shrink-0" />{children}
      </h1>
    ),
    h2: ({children}) => (
      <h2 className="text-sm font-extrabold text-indigo-700 dark:text-indigo-300 mt-4 mb-2 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-indigo-400 rounded-sm inline-block flex-shrink-0" />{children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="text-sm font-bold text-violet-700 dark:text-violet-400 mt-3 mb-1.5">{children}</h3>
    ),
    p: ({children}) => (
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2.5">{children}</p>
    ),
    ul: ({children}) => <ul className="my-2.5 space-y-1.5 pl-0 list-none">{children}</ul>,
    ol: ({children}) => <ol className="my-2.5 space-y-1.5 pl-0 list-none">{children}</ol>,
    li: ({children}) => (
      <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
        <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">›</span>
        <span className="flex-1 leading-relaxed">{children}</span>
      </li>
    ),
    strong: ({children}) => (
      <strong className="font-bold text-slate-900 dark:text-slate-100 bg-amber-50 dark:bg-amber-900/20 px-1 rounded-sm">{children}</strong>
    ),
    em: ({children}) => (
      <em className="text-indigo-700 dark:text-indigo-300 not-italic font-medium">{children}</em>
    ),
    code: ({className, children}: any) => {
      const isMultiLine = String(children).includes('\n');
      if (isMultiLine || className?.startsWith('language-')) {
        return (
          <pre className="bg-[#0d1117] rounded-xl p-4 my-3 overflow-x-auto border border-slate-700/60">
            <code className="text-green-400 text-xs font-mono leading-relaxed">{children}</code>
          </pre>
        );
      }
      return <code className="bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>;
    },
    blockquote: ({children}) => (
      <blockquote className="my-3 pl-4 border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-950/30 py-3 pr-4 rounded-r-xl text-sm text-slate-700 dark:text-slate-300">
        {children}
      </blockquote>
    ),
  };

  const renderQuestion = (section: QuestionSection, displayIndex: number) => {
    const isExpanded = expandedQuestions.has(section.title);
    const answerVisible = showAnswers.has(section.title);
    const isCopied = copiedQuestions.has(section.title);
    const isViewed = viewedAnswers.has(section.title);
    const diff = section.difficulty ?? 'easy';
    const dc = difficultyConfig[diff];
    const num = String(displayIndex + 1).padStart(2, '0');

    const cardAccent = { easy: 'border-t-emerald-400', medium: 'border-t-amber-400', hard: 'border-t-rose-500' }[diff];
    const numBg = { easy: 'bg-emerald-500 shadow-emerald-900/30', medium: 'bg-amber-500 shadow-amber-900/30', hard: 'bg-rose-500 shadow-rose-900/30' }[diff];

    return (
      <div
        key={section.title}
        className={`mb-4 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 border-t-4 ${cardAccent} bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200`}
      >
        {/* ── Card Header ── */}
        <button
          onClick={() => toggleQuestion(section.title)}
          className="w-full px-5 py-5 text-left flex items-start gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-700/40 transition-colors cursor-pointer"
        >
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${numBg} text-white text-sm font-black flex items-center justify-center shadow-lg`}>
            {num}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="font-semibold text-slate-900 dark:text-white leading-snug text-[0.95rem]">{section.title}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${dc.bg} ${dc.color} border ${dc.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dc.dot}`} />
                {dc.label}
              </span>
              {isViewed && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <FaCheckCircle size={9} /> Reviewed
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 mt-2 text-slate-400">
            {isExpanded ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
          </div>
        </button>

        {/* ── Expanded Content ── */}
        {isExpanded && (
          <div className="border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="px-5 py-5">
              {/* Question text */}
              {section.question && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      <FaBook size={10} className="text-blue-400" /> Question
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-600/60 shadow-sm">
                    <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      <ReactMarkdown components={mdComponents}>{section.question}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}

              {/* Answer reveal */}
              {section.answer && (
                <>
                  {!answerVisible ? (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                          <FaBrain className="text-indigo-600 dark:text-indigo-400" size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-0.5">Think before you reveal</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">Formulate your answer first — this dramatically improves long-term retention.</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => toggleAnswer(section.title, e)}
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-900/30 hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                      >
                        <FaLightbulb size={14} />
                        Reveal Expert Answer
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          <FaLightbulb size={10} className="text-amber-500" /> Expert Answer
                        </span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                      </div>
                      <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-600/50 shadow-sm">
                        <ReactMarkdown components={mdComponents}>{section.answer}</ReactMarkdown>
                      </div>
                      {enableCopyFullscreen && (
                        <div className="expandable-action-buttons">
                          <button onClick={(e) => { e.stopPropagation(); handleCopy(section, e); }}
                            className="expandable-copy-btn cursor-pointer" aria-label="Copy" title={isCopied ? "Copied!" : "Copy"}>
                            {isCopied ? <FaCheck size={16} /> : <FaCopy size={16} />}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setFullscreenQuestion(section.title); }}
                            className="expandable-fullscreen-btn cursor-pointer" aria-label="Fullscreen" title="Fullscreen">
                            <FaExpand size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 cursor-pointer text-sm font-medium"
            >
              <FaArrowLeft size={14} />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{toTitleCase(category)}</span>
              <span>•</span>
              <span>{allGeneral.length + allScenario.length} Questions</span>
            </div>
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
              aria-label="Toggle navigation"
            >
              <FaBars size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <div className={`bg-gradient-to-r ${meta.color} text-white`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{meta.icon}</span>
                <div>
                  <p className="text-white/70 text-sm font-medium uppercase tracking-widest">Interview Prep</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {toTitleCase(category)} Questions
                  </h1>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-1.5 text-sm font-medium">
                  <FaBook size={12} /> {allGeneral.length} General Q&A
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-1.5 text-sm font-medium">
                  <FaLayerGroup size={12} /> {allScenario.length} Scenario Q&A
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 rounded-lg px-3 py-1.5 text-sm font-medium">
                  <FaClock size={12} /> ~{Math.ceil((allGeneral.length + allScenario.length) * 3)} min prep
                </div>
                {viewedAnswers.size > 0 && (
                  <div className="flex items-center gap-1.5 bg-emerald-500/40 rounded-lg px-3 py-1.5 text-sm font-semibold">
                    <FaCheckCircle size={12} /> {viewedAnswers.size}/{allGeneral.length + allScenario.length} Reviewed
                  </div>
                )}
              </div>
            </div>
            {/* Prep tips */}
            <div className="hidden md:block bg-white/15 backdrop-blur-sm rounded-xl p-4 max-w-xs">
              <p className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-2">💡 Prep Tips</p>
              {meta.tips.map((tip, i) => (
                <p key={i} className="text-white/90 text-sm flex items-start gap-2 mb-1">
                  <span className="text-white/60 mt-0.5">→</span> {tip}
                </p>
              ))}
            </div>
          </div>

          {/* ── Interview Journey Flow ── */}
          <div className="mt-8 hidden sm:block">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">Interview Preparation Journey</p>
            <div className="flex items-center gap-0">
              {[
                { label: "Understand", sub: "Core concepts", icon: "📖", active: true },
                { label: "Practice", sub: "General Q&A", icon: "🧠", active: viewedAnswers.size > 0 },
                { label: "Scenario", sub: "Real situations", icon: "🎯", active: viewedAnswers.size >= allGeneral.length * 0.5 },
                { label: "Mock Ready", sub: "Confident!", icon: "🚀", active: viewedAnswers.size >= (allGeneral.length + allScenario.length) * 0.8 },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center">
                  <div className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all ${step.active ? 'bg-white/25' : 'bg-white/10 opacity-60'}`}>
                    <span className="text-lg">{step.icon}</span>
                    <span className="text-white text-xs font-bold mt-1">{step.label}</span>
                    <span className="text-white/60 text-xs">{step.sub}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`flex items-center mx-1 ${step.active ? 'text-white/70' : 'text-white/30'}`}>
                      <FaArrowRight size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          {(allGeneral.length + allScenario.length) > 0 && viewedAnswers.size > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-white/70 text-xs mb-1">
                <span>Progress</span>
                <span>{Math.round(viewedAnswers.size / (allGeneral.length + allScenario.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/80 rounded-full transition-all duration-500"
                  style={{ width: `${viewedAnswers.size / (allGeneral.length + allScenario.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">

          {/* ── Sidebar ── */}
          {sidebarSections.length > 0 && (
            <>
              <aside
                className={`fixed top-14 left-0 h-screen w-64 bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 z-30 overflow-y-auto lg:static lg:h-auto lg:w-56 lg:min-w-[14rem] lg:shadow-none lg:border lg:border-slate-200 dark:lg:border-slate-700 lg:rounded-xl lg:translate-x-0 lg:flex-shrink-0 ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="p-4">
                  {/* Search */}
                  <div className="mb-4">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                      <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer" aria-label="Clear">
                          <FaTimes size={10} />
                        </button>
                      )}
                    </div>
                    {searchQuery && (
                      <p className="text-xs text-slate-500 mt-1.5">{general.length + scenario.length} result{(general.length + scenario.length) !== 1 ? 's' : ''}</p>
                    )}
                  </div>

                  {/* Difficulty filter */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Filter by Level</p>
                    <div className="space-y-1">
                      {[
                        { val: "all", label: "All Levels", color: "text-slate-600 dark:text-slate-300" },
                        { val: "easy", label: "Easy", color: "text-emerald-600 dark:text-emerald-400" },
                        { val: "medium", label: "Medium", color: "text-amber-600 dark:text-amber-400" },
                        { val: "hard", label: "Hard", color: "text-rose-600 dark:text-rose-400" },
                      ].map(opt => (
                        <button
                          key={opt.val}
                          onClick={() => setDifficultyFilter(opt.val)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${difficultyFilter === opt.val ? 'bg-slate-100 dark:bg-slate-800 ' + opt.color + ' font-semibold' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Navigation</p>
                    <div className="space-y-1">
                      {sidebarSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                            activeSection === section.id
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs">{section.title}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-md font-semibold ${activeSection === section.id ? "bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}`}>
                              {section.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Progress in sidebar */}
                  {(allGeneral.length + allScenario.length) > 0 && (
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Your Progress</p>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-1">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${viewedAnswers.size / (allGeneral.length + allScenario.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{viewedAnswers.size} / {allGeneral.length + allScenario.length} reviewed</p>
                    </div>
                  )}
                </div>
              </aside>

              {/* Mobile overlay */}
              {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
              )}
            </>
          )}

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">
            {/* No results */}
            {general.length === 0 && scenario.length === 0 && (
              <div className="text-center py-20 text-slate-400 dark:text-slate-500">
                <FaSearch size={32} className="mx-auto mb-3 opacity-40" />
                <p className="font-semibold">No questions match your filter</p>
                <p className="text-sm mt-1">Try changing the search or difficulty filter</p>
              </div>
            )}

            {/* General Questions */}
            {general.length > 0 && (
              <section id="general-questions" className="mb-10 scroll-mt-20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-bold">
                    <FaBrain size={12} /> General Q&A
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 text-sm">{general.length} questions</span>
                </div>
                {general.map((q, i) => renderQuestion(q, i))}
              </section>
            )}

            {/* Scenario Questions */}
            {scenario.length > 0 && (
              <section id="scenario-questions" className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-bold">
                    <FaLayerGroup size={12} /> Scenario-Based Q&A
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 text-sm">{scenario.length} questions</span>
                </div>
                {scenario.map((q, i) => renderQuestion(q, i))}
              </section>
            )}
          </main>
        </div>
      </div>

      {/* ── Fullscreen Modal ── */}
      {fullscreenQuestion && enableCopyFullscreen && (() => {
        const section = [...general, ...scenario].find(s => s.title === fullscreenQuestion);
        if (!section) return null;
        const isCopied = copiedQuestions.has(section.title);
        return (
          <div className="expandable-modal-overlay" onClick={() => setFullscreenQuestion(null)}>
            <div className="expandable-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="expandable-modal-header">
                <h2 className="expandable-modal-title">{section.title}</h2>
                <button onClick={() => setFullscreenQuestion(null)} className="expandable-modal-close cursor-pointer" aria-label="Close modal">
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="expandable-modal-body">
                <div className="expandable-modal-body-inner interview-modal-content">
                  {section.question && (
                    <div className="interview-modal-question">
                      <div className="interview-modal-label">Question</div>
                      <div className="interview-modal-text"><ReactMarkdown>{section.question}</ReactMarkdown></div>
                    </div>
                  )}
                  {section.answer && (
                    <div className="interview-modal-answer">
                      <div className="interview-modal-label">Answer</div>
                      <div className="interview-modal-text"><ReactMarkdown>{section.answer}</ReactMarkdown></div>
                    </div>
                  )}
                  {enableCopyFullscreen && (
                    <button onClick={() => handleCopy(section)} className="expandable-modal-copy-btn cursor-pointer" aria-label="Copy content" title={isCopied ? "Copied!" : "Copy content"}>
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
