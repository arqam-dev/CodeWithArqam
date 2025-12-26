"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
  FaArrowUp
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
  
  // Cloud & DevOps
  { name: "AWS Certification", slug: "aws-certification", category: "Cloud", icon: FaCloud, description: "AWS services, architecture, and certification prep" },
  { name: "Cloud Computing", slug: "cloudcomputing", category: "Cloud", icon: FaCloud, description: "Cloud platforms, services, and deployment" },
  { name: "DevOps", slug: "devops", category: "Cloud", icon: FaTools, description: "CI/CD, containers, and infrastructure as code" },
  
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
  { name: "Web Development", slug: "webdevelopment", category: "Tools", icon: FaCode, description: "Full-stack web development practices" },
  { name: "Quality Assurance", slug: "qualityassurance", category: "Tools", icon: FaCheckCircle, description: "Testing, QA processes, and best practices" },
  
  // Professional Skills
  { name: "Language Learning", slug: "language", category: "Professional", icon: FaGraduationCap, description: "Programming languages and learning resources" },
  { name: "Problem Solving", slug: "problemsolving", category: "Professional", icon: FaBrain, description: "Algorithmic thinking and problem-solving strategies" },
  { name: "Soft Skills", slug: "softskills", category: "Professional", icon: FaUsers, description: "Communication, teamwork, and career development" },
  { name: "Sales & Pre-Sales", slug: "sales-presales", category: "Professional", icon: FaUsers, description: "Technical sales and client engagement" },
  { name: "PMP", slug: "pmp", category: "Professional", icon: FaGraduationCap, description: "Project management and PMP certification" },
];

const categories = ["All", "Frontend", "Backend", "Cloud", "Database", "Mobile", "CS Fundamentals", "Tools", "Professional"];

export default function ContentPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);

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
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeWithArqam
              </Link>
            </div>
            <div className="flex-1 max-w-2xl mx-4">
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
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
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
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                    selectedCategory === category
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{category}</span>
                  {selectedCategory === category && <FaChevronRight size={12} />}
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-900 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Content Stats</h3>
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Total Concepts:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{concepts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Categories:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{categories.length - 1}</span>
                </div>
                <div className="flex justify-between">
                  <span>Filtered:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">{filteredConcepts.length}</span>
                </div>
              </div>
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
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Concepts Grid */}
          {Object.keys(groupedConcepts).length === 0 ? (
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
          )}

          {/* Interview Questions Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-700 dark:to-slate-900 rounded-2xl border border-purple-200 dark:border-purple-900">
            <div className="flex items-center space-x-3 mb-4">
              <FaQuestionCircle className="text-purple-600 dark:text-purple-400" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Interview Questions
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Prepare for your next technical interview with comprehensive questions and answers.
            </p>
            <div className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors cursor-pointer">
              Coming Soon
            </div>
          </div>
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
    </div>
  );
}

