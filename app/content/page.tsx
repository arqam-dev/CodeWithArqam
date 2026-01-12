"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FloatingWriteReviewButton from "../components/FloatingWriteReviewButton";
import ReviewsDrawer from "../components/ReviewsDrawer";
import { 
  FaSearch, 
  FaCode, 
  FaCloud, 
  FaDatabase, 
  FaMobile, 
  FaServer,
  FaTools,
  FaGraduationCap,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaBook,
  FaQuestionCircle,
  FaLaptopCode,
  FaNetworkWired,
  FaCog,
  FaPaintBrush,
  FaUsers,
  FaBrain,
  FaCheckCircle,
  FaArrowUp,
  FaStar,
  FaComments
} from "react-icons/fa";

interface Concept {
  name: string;
  slug: string;
  category: string;
  icon: any;
  description?: string;
}

const concepts: Concept[] = [
  // Frontend
  { name: "JavaScript", slug: "javascript", category: "Frontend", icon: FaCode, description: "Core JavaScript concepts, ES6+, and modern features" },
  { name: "React", slug: "react", category: "Frontend", icon: FaCode, description: "React library, hooks, components, and best practices" },
  { name: "Angular", slug: "angular", category: "Frontend", icon: FaCode, description: "Angular framework, services, and architecture" },
  { name: "HTML", slug: "html", category: "Frontend", icon: FaCode, description: "HTML5, semantic markup, and web standards" },
  { name: "Styling", slug: "styling", category: "Frontend", icon: FaPaintBrush, description: "CSS, preprocessors, and design systems" },
  
  // Backend
  { name: "Node.js", slug: "node", category: "Backend", icon: FaServer, description: "Node.js runtime, Express, and server-side development" },
  { name: "GraphQL", slug: "graphql", category: "Backend", icon: FaServer, description: "GraphQL queries, mutations, and schema design" },
  
  // Full Stack
  { name: "Next.js", slug: "nextjs", category: "Full Stack", icon: FaCode, description: "Next.js framework, App Router, Server Components, and full-stack React" },
  
  // Cloud
  { name: "AWS", slug: "aws", category: "Cloud", icon: FaCloud, description: "Amazon Web Services - comprehensive cloud computing platform" },
  { name: "Azure", slug: "azure", category: "Cloud", icon: FaCloud, description: "Microsoft Azure - cloud platform with Microsoft ecosystem integration" },
  { name: "GCP", slug: "gcp", category: "Cloud", icon: FaCloud, description: "Google Cloud Platform - cloud services with strong ML and analytics" },
  
  // DevOps
  { name: "DevOps", slug: "devops", category: "DevOps", icon: FaTools, description: "CI/CD, containers, and infrastructure as code" },
  
  // Database
  { name: "Database", slug: "database", category: "Database", icon: FaDatabase, description: "SQL, NoSQL, and database design principles" },
  
  // Mobile
  { name: "Mobile Development", slug: "mobile", category: "Mobile", icon: FaMobile, description: "Mobile app development and frameworks" },
  
  // Computer Science
  { name: "Data Structures", slug: "datastructure", category: "CS Fundamentals", icon: FaBrain, description: "Arrays, trees, graphs, and algorithms" },
  { name: "Object-Oriented Programming", slug: "objectorientedprogramming", category: "CS Fundamentals", icon: FaCode, description: "OOP principles, design patterns, and SOLID" },
  { name: "Operating System", slug: "operatingsystem", category: "CS Fundamentals", icon: FaCog, description: "OS concepts, processes, and memory management" },
  { name: "Networking", slug: "networking", category: "CS Fundamentals", icon: FaNetworkWired, description: "Network protocols, TCP/IP, and web architecture" },
  { name: "Hardware", slug: "hardware", category: "CS Fundamentals", icon: FaLaptopCode, description: "Computer hardware and architecture" },
  
  // Tools & Practices
  { name: "Git", slug: "git", category: "Tools", icon: FaTools, description: "Version control, branching, and collaboration" },
  
  // System Design & Architecture
  { name: "System Design", slug: "systemdesign", category: "System Design", icon: FaCode, description: "System architecture, scalability, and design patterns" },
  
  // Quality Assurance
  { name: "Quality Assurance", slug: "qualityassurance", category: "Quality Assurance", icon: FaCheckCircle, description: "Testing, QA processes, and best practices" },
  
  // Comparisons
  { name: "VS Comparisons", slug: "vs-comparisons", category: "Comparisons", icon: FaQuestionCircle, description: "Compare conflicting and interchangeable concepts: JavaScript, React, Angular, Node.js, and more" },
  
  // Professional Skills
  { name: "Language Learning", slug: "language", category: "Professional", icon: FaGraduationCap, description: "Programming languages and learning resources" },
  { name: "Problem Solving", slug: "problemsolving", category: "Professional", icon: FaBrain, description: "Algorithmic thinking and problem-solving strategies" },
  { name: "Soft Skills", slug: "softskills", category: "Professional", icon: FaUsers, description: "Communication, teamwork, and career development" },
  { name: "Sales & Pre-Sales", slug: "sales-presales", category: "Professional", icon: FaUsers, description: "Technical sales and client engagement" },
  { name: "PMP", slug: "pmp", category: "Professional", icon: FaGraduationCap, description: "Project management and PMP certification" },
  
  // Prompt Engineering
  { name: "Prompt Engineering", slug: "promptengineering", category: "Tools", icon: FaBrain, description: "Master AI prompt engineering for error handling, new features, updates, and code review" },
  
  // AI/ML
  { name: "AI/ML", slug: "ai-ml", category: "AI/ML", icon: FaBrain, description: "Artificial Intelligence, Machine Learning, and Data Science concepts" },
];

const categories = ["All", "Frontend", "Backend", "Full Stack", "Cloud", "DevOps", "Database", "Mobile", "CS Fundamentals", "Tools", "System Design", "Quality Assurance", "Comparisons", "Professional", "AI/ML", "Interview Questions"];

const interviewQuestionCategories = [
  { name: "Frontend", slug: "frontend", icon: FaCode, description: "Browser, optimization, Lighthouse, and frontend fundamentals" },
  { name: "Backend", slug: "backend", icon: FaServer, description: "APIs, microservices, caching, and backend architecture" },
  { name: "Databases", slug: "databases", icon: FaDatabase, description: "SQL, NoSQL, indexing, transactions, and database design" },
  { name: "System Design", slug: "system-design", icon: FaNetworkWired, description: "Scalability, load balancing, caching, and distributed systems" },
];

function ContentPageContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showReviewsDrawer, setShowReviewsDrawer] = useState(false);

  // Update category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredConcepts = concepts.filter(concept => {
    const matchesSearch = concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         concept.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || concept.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const showInterviewQuestions = selectedCategory === "Interview Questions";
  const showInterviewQuestionsInAll = selectedCategory === "All";

  const groupedConcepts = filteredConcepts.reduce((acc, concept) => {
    if (!acc[concept.category]) {
      acc[concept.category] = [];
    }
    acc[concept.category].push(concept);
    return acc;
  }, {} as Record<string, Concept[]>);

  const toggleConcept = (slug: string) => {
    const newExpanded = new Set(expandedConcepts);
    if (newExpanded.has(slug)) {
      newExpanded.delete(slug);
    } else {
      newExpanded.add(slug);
    }
    setExpandedConcepts(newExpanded);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isSidebarOpen && !target.closest('.sidebar') && !target.closest('.sidebar-toggle')) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="sidebar-toggle md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                aria-label="Toggle sidebar"
              >
                <FaBars size={20} />
              </button>
              <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
                <Image
                  src="/codewitharqam-logo.svg"
                  alt="CodeWithArqam Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeWithArqam
                </span>
              </Link>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block w-full max-w-2xl px-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search concepts, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="md:hidden flex-1 max-w-2xl mx-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search concepts, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside
          className={`sidebar fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto transition-transform duration-300 z-30 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Categories</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1 text-slate-600 dark:text-slate-300"
                aria-label="Close sidebar"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <div className="space-y-1">
              {categories.map((category, index) => {
                const isInterviewQuestions = category === "Interview Questions";
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 relative overflow-visible group cursor-pointer ${
                      isSelected
                        ? isInterviewQuestions
                          ? "bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 text-white font-semibold shadow-lg shadow-slate-500/30 scale-[1.02]"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                        : isInterviewQuestions
                          ? "bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 text-white font-semibold shadow-md shadow-slate-500/20 hover:scale-[1.01] hover:shadow-lg"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {isInterviewQuestions && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 via-slate-500/20 to-slate-400/20 animate-shimmer rounded-lg"></div>
                        {isSelected && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 opacity-20 blur-md animate-pulse rounded-lg"></div>
                        )}
                      </>
                    )}
                    {isInterviewQuestions && (
                      <span className="absolute -top-1 -right-1 z-10 text-[10px] bg-slate-600 dark:bg-slate-500 text-white px-1.5 py-0.5 rounded-full font-bold shadow-md border border-white/20">
                        New
                      </span>
                    )}
                    <span className="relative flex items-center whitespace-nowrap pr-8">
                      <span className="truncate">{category}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Learn & Explore
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Comprehensive guides, tutorials, and resources for software development
            </p>
          </div>

          {/* Category Filter Pills (Mobile) */}
          <div className="md:hidden mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => {
                const isInterviewQuestions = category === "Interview Questions";
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 relative overflow-visible cursor-pointer ${
                      isSelected
                        ? isInterviewQuestions
                          ? "bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 text-white shadow-lg shadow-slate-500/30 scale-105"
                          : "bg-blue-600 text-white"
                        : isInterviewQuestions
                          ? "bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 text-white shadow-md shadow-slate-500/20"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {isInterviewQuestions && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 via-slate-500/20 to-slate-400/20 animate-shimmer rounded-full"></div>
                        {isSelected && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 opacity-20 blur-sm animate-pulse rounded-full"></div>
                        )}
                      </>
                    )}
                    {isInterviewQuestions && (
                      <span className="absolute -top-1 -right-1 z-10 text-[10px] bg-slate-600 dark:bg-slate-500 text-white px-1.5 py-0.5 rounded-full font-bold shadow-md border border-white/20">
                        New
                      </span>
                    )}
                    <span className="relative flex items-center pr-6">
                      <span>{category}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Concepts Grid */}
          {!showInterviewQuestions && (
            Object.keys(groupedConcepts).length === 0 ? (
              <div className="text-center py-12">
                <FaQuestionCircle className="mx-auto text-slate-400 mb-4" size={48} />
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  No concepts found matching your search.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedConcepts).map(([category, categoryConcepts]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
                      <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded"></span>
                      <span>{category}</span>
                      <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                        ({categoryConcepts.length})
                      </span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryConcepts.map((concept) => {
                        const Icon = concept.icon;
                        const isExpanded = expandedConcepts.has(concept.slug);
                        
                        return (
                          <div
                            key={concept.slug}
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                  <Icon className="text-blue-600 dark:text-blue-400" size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                  {concept.name}
                                </h3>
                              </div>
                            </div>
                            
                            {concept.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                {concept.description}
                              </p>
                            )}

                            <div className="flex items-center justify-between">
                              <Link
                                href={`/concepts/${concept.slug}`}
                                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                              >
                                <FaBook size={14} />
                                <span>Read More</span>
                              </Link>
                              <button
                                onClick={() => toggleConcept(concept.slug)}
                                className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                aria-label="Toggle details"
                              >
                                <FaChevronRight
                                  className={`transform transition-transform duration-200 ${
                                    isExpanded ? "rotate-90" : ""
                                  }`}
                                  size={16}
                                />
                              </button>
                            </div>

                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <Link
                                  href={`/concepts/${concept.slug}`}
                                  className="block w-full text-center px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm font-medium"
                                >
                                  Explore Full Content
                                </Link>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* Interview Questions Section - Shown when "Interview Questions" category is selected OR when "All" is selected (at the end) */}
          {(showInterviewQuestions || showInterviewQuestionsInAll) && (
            <div className={`space-y-8 animate-fadeIn ${showInterviewQuestionsInAll ? 'mt-12' : ''}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-200/20 via-slate-300/20 to-slate-200/20 dark:from-slate-700/20 dark:via-slate-600/20 dark:to-slate-700/20 rounded-2xl blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full blur-lg opacity-30 dark:opacity-20 animate-pulse"></div>
                      <div className="relative p-4 bg-gradient-to-r from-slate-500 to-slate-600 dark:from-slate-600 dark:to-slate-700 rounded-full">
                        <FaQuestionCircle className="text-white" size={32} />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                        Interview Questions
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        Prepare for your next technical interview with comprehensive Q&A
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {interviewQuestionCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.slug}
                          href={`/interview-questions/${category.slug}`}
                          className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer overflow-hidden"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: 'fadeInUp 0.6s ease-out forwards'
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/0 via-slate-200/0 to-slate-100/0 dark:from-slate-700/0 dark:via-slate-600/0 dark:to-slate-700/0 group-hover:from-slate-100/50 group-hover:via-slate-200/50 group-hover:to-slate-100/50 dark:group-hover:from-slate-700/30 dark:group-hover:via-slate-600/30 dark:group-hover:to-slate-700/30 transition-all duration-500"></div>
                          <div className="relative">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-300 to-slate-400 rounded-lg blur-md opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="relative p-3 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                  <Icon className="text-slate-600 dark:text-slate-300" size={24} />
                                </div>
                              </div>
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                                {category.name}
                              </h3>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                              {category.description}
                            </p>
                            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-500 to-slate-600 dark:from-slate-600 dark:to-slate-700 text-white rounded-lg text-sm font-medium group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                              <span>View Questions</span>
                              <FaChevronRight className="transform group-hover:translate-x-1 transition-transform" size={12} />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end space-y-3">
        {/* View Reviews Button - Disabled for now */}
        {/* <button
          onClick={() => setShowReviewsDrawer(true)}
          className="group"
          aria-label="View Reviews"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="relative px-5 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
              <FaComments className="text-purple-200" size={16} />
              <span className="hidden sm:inline">View Reviews</span>
              <span className="sm:hidden">Reviews</span>
            </div>
          </div>
        </button> */}

        {/* Write Review Button - Opens drawer to write reviews - Hidden when scroll to top is visible */}
        {!showScrollTop && <FloatingWriteReviewButton />}
      </div>

      {/* Interactive Reviews Drawer */}
      <ReviewsDrawer isOpen={showReviewsDrawer} onClose={() => setShowReviewsDrawer(false)} />
    </div>
  );
}

export default function ContentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading content...</p>
        </div>
      </div>
    }>
      <ContentPageContent />
    </Suspense>
  );
}

