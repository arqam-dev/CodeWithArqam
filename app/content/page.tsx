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
  FaComments,
  FaRobot,
  FaShieldAlt,
  FaBuilding,
  FaWifi,
  FaLeaf,
  FaAtom,
  FaCoins,
  FaVrCardboard
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
  
  // Interesting Topics
  { name: "Agentic AI", slug: "agentic-ai", category: "Interesting Topics", icon: FaRobot, description: "Autonomous AI agents that can make decisions and take actions independently" },
  { name: "Generative AI", slug: "generative-ai", category: "Interesting Topics", icon: FaBrain, description: "AI systems that generate new content, including text, images, code, and more" },
  { name: "Security", slug: "security", category: "Interesting Topics", icon: FaShieldAlt, description: "Cybersecurity, information security, and secure development practices" },
  { name: "Artificial Intelligence", slug: "artificial-intelligence", category: "Interesting Topics", icon: FaBrain, description: "Fundamental concepts and applications of artificial intelligence" },
  { name: "Data", slug: "data", category: "Interesting Topics", icon: FaDatabase, description: "Data management, analytics, big data, and data-driven decision making" },
  { name: "Cloud", slug: "cloud", category: "Interesting Topics", icon: FaCloud, description: "Cloud computing platforms, services, and architectures" },
  { name: "Enterprise Platforms", slug: "enterprise-platforms", category: "Interesting Topics", icon: FaBuilding, description: "Enterprise software platforms, solutions, and architectures" },
  { name: "5G and Edge Computing", slug: "5g-edge-computing", category: "Interesting Topics", icon: FaWifi, description: "5G networks, edge computing, and distributed computing at the edge" },
  { name: "Sustainability and Technology", slug: "sustainability-technology", category: "Interesting Topics", icon: FaLeaf, description: "Green technology, sustainable computing, and environmental impact of technology" },
  { name: "Automation", slug: "automation", category: "Interesting Topics", icon: FaCog, description: "Process automation, robotic process automation, and automated systems" },
  { name: "Agile and DevOps", slug: "agile-devops", category: "Interesting Topics", icon: FaTools, description: "Agile methodologies, DevOps practices, and modern software development workflows" },
  { name: "Quantum Computing", slug: "quantum-computing", category: "Interesting Topics", icon: FaAtom, description: "Quantum computing principles, algorithms, and quantum information science" },
  { name: "Blockchain", slug: "blockchain", category: "Interesting Topics", icon: FaCoins, description: "Blockchain technology, cryptocurrencies, smart contracts, and decentralized systems" },
  { name: "XR and the Metaverse", slug: "xr-metaverse", category: "Interesting Topics", icon: FaVrCardboard, description: "Extended Reality (VR/AR/MR), metaverse platforms, and immersive technologies" },
];

const categories = ["All", "Frontend", "Backend", "Full Stack", "Cloud", "DevOps", "Database", "Mobile", "CS Fundamentals", "Tools", "System Design", "Quality Assurance", "Comparisons", "Professional", "AI/ML", "Interesting Topics", "Interview Questions"];

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

  // category accent colors for cards
  const categoryAccents: Record<string, { gradient: string; text: string; badge: string; icon: string }> = {
    "Frontend": { gradient: "from-cyan-500 to-blue-600", text: "text-cyan-600 dark:text-cyan-400", badge: "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300", icon: "bg-cyan-100 dark:bg-cyan-900/40" },
    "Backend": { gradient: "from-violet-500 to-purple-600", text: "text-violet-600 dark:text-violet-400", badge: "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300", icon: "bg-violet-100 dark:bg-violet-900/40" },
    "Full Stack": { gradient: "from-blue-500 to-indigo-600", text: "text-blue-600 dark:text-blue-400", badge: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300", icon: "bg-blue-100 dark:bg-blue-900/40" },
    "Cloud": { gradient: "from-sky-500 to-blue-600", text: "text-sky-600 dark:text-sky-400", badge: "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300", icon: "bg-sky-100 dark:bg-sky-900/40" },
    "DevOps": { gradient: "from-orange-500 to-red-600", text: "text-orange-600 dark:text-orange-400", badge: "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300", icon: "bg-orange-100 dark:bg-orange-900/40" },
    "Database": { gradient: "from-amber-500 to-orange-600", text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300", icon: "bg-amber-100 dark:bg-amber-900/40" },
    "Mobile": { gradient: "from-pink-500 to-rose-600", text: "text-pink-600 dark:text-pink-400", badge: "bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300", icon: "bg-pink-100 dark:bg-pink-900/40" },
    "CS Fundamentals": { gradient: "from-teal-500 to-cyan-600", text: "text-teal-600 dark:text-teal-400", badge: "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300", icon: "bg-teal-100 dark:bg-teal-900/40" },
    "Tools": { gradient: "from-slate-500 to-slate-700", text: "text-slate-600 dark:text-slate-400", badge: "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300", icon: "bg-slate-100 dark:bg-slate-800" },
    "System Design": { gradient: "from-indigo-500 to-blue-700", text: "text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300", icon: "bg-indigo-100 dark:bg-indigo-900/40" },
    "Quality Assurance": { gradient: "from-emerald-500 to-green-600", text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300", icon: "bg-emerald-100 dark:bg-emerald-900/40" },
    "Comparisons": { gradient: "from-rose-500 to-pink-600", text: "text-rose-600 dark:text-rose-400", badge: "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300", icon: "bg-rose-100 dark:bg-rose-900/40" },
    "Professional": { gradient: "from-yellow-500 to-amber-600", text: "text-yellow-600 dark:text-yellow-400", badge: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300", icon: "bg-yellow-100 dark:bg-yellow-900/40" },
    "AI/ML": { gradient: "from-fuchsia-500 to-purple-700", text: "text-fuchsia-600 dark:text-fuchsia-400", badge: "bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300", icon: "bg-fuchsia-100 dark:bg-fuchsia-900/40" },
    "Interesting Topics": { gradient: "from-violet-500 to-indigo-600", text: "text-violet-600 dark:text-violet-400", badge: "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300", icon: "bg-violet-100 dark:bg-violet-900/40" },
  };
  const getAccent = (cat: string) => categoryAccents[cat] || categoryAccents["Tools"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* â”€â”€ Navbar â”€â”€ */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="sidebar-toggle md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer">
              <FaBars size={18} />
            </button>
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <Image src="/codewitharqam-logo.svg" alt="CodeWithArqam Logo" width={28} height={28} className="w-7 h-7" />
              <span className="hidden sm:block text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CodeWithArqam</span>
            </Link>
            {/* Search */}
            <div className="flex-1 max-w-xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search concepts, topics..." value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-700 transition-all" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <FaTimes size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* â”€â”€ Hero Banner â”€â”€ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)', backgroundSize: '28px 28px'}} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                &#127891; Learning Hub
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Explore &amp; Master
            </h1>
            <p className="mt-3 text-blue-200/80 text-base sm:text-lg max-w-lg">
              Deep-dive concept guides, interview prep, and hands-on quizzes - everything you need to level up.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 border border-white/15">
                <span className="text-2xl font-bold text-white">{concepts.length}</span>
                <span className="text-white/60 text-sm">Concept Guides</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 border border-white/15">
                <span className="text-2xl font-bold text-white">{categories.length - 1}</span>
                <span className="text-white/60 text-sm">Categories</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 border border-white/15">
                <span className="text-2xl font-bold text-white">4</span>
                <span className="text-white/60 text-sm">Interview Sets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* â”€â”€ Sidebar â”€â”€ */}
        <aside className={`sidebar fixed md:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-60 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700/60 overflow-y-auto transition-transform duration-300 z-30 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Categories</span>
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-slate-600 cursor-pointer"><FaTimes size={14} /></button>
            </div>
            <div className="space-y-0.5">
              {categories.map(category => {
                const isIQ = category === "Interview Questions";
                const isSelected = selectedCategory === category;
                const accent = getAccent(category);
                return (
                  <button key={category} onClick={() => { setSelectedCategory(category); setIsSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? isIQ ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : `bg-gradient-to-r ${accent.gradient} text-white shadow-sm`
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}>
                    <span className="truncate">{category}</span>
                    {isIQ && <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">HOT</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
        {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />}

        {/* â”€â”€ Main Content â”€â”€ */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Search feedback */}
          {searchQuery && (
            <div className="mb-5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <FaSearch size={12} />
              <span><strong className="text-slate-700 dark:text-slate-200">{filteredConcepts.length}</strong> result{filteredConcepts.length !== 1 ? 's' : ''} for "<em>{searchQuery}</em>"</span>
              <button onClick={() => setSearchQuery("")} className="text-blue-600 hover:underline cursor-pointer text-xs">Clear</button>
            </div>
          )}

          {/* â”€â”€ Concepts Grid â”€â”€ */}
          {!showInterviewQuestions && (
            Object.keys(groupedConcepts).length === 0 ? (
              <div className="text-center py-20">
                <FaQuestionCircle className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={56} />
                <p className="text-slate-500 dark:text-slate-400 text-lg">No concepts match your search.</p>
                <button onClick={() => setSearchQuery("")} className="mt-3 text-blue-600 hover:underline text-sm cursor-pointer">Clear search</button>
              </div>
            ) : (
              <div className="space-y-10">
                {Object.entries(groupedConcepts).map(([category, categoryConcepts]) => {
                  const accent = getAccent(category);
                  return (
                    <div key={category}>
                      {/* Category header */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${accent.gradient}`} />
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{category}</h2>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accent.badge}`}>{categoryConcepts.length} topics</span>
                      </div>
                      {/* Cards grid */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryConcepts.map(concept => {
                          const Icon = concept.icon;
                          return (
                            <Link key={concept.slug} href={`/concepts/${concept.slug}`}
                              className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
                              {/* Top accent bar */}
                              <div className={`h-1 bg-gradient-to-r ${accent.gradient}`} />
                              <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                  <div className={`p-2.5 rounded-xl ${accent.icon} flex-shrink-0`}>
                                    <Icon className={accent.text} size={18} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-slate-900 dark:text-white text-[0.92rem] leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{concept.name}</h3>
                                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${accent.text} opacity-70`}>{category}</span>
                                  </div>
                                </div>
                                {concept.description && (
                                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1 line-clamp-2">{concept.description}</p>
                                )}
                                <div className="mt-4 flex items-center justify-between">
                                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r ${accent.gradient} text-white shadow-sm group-hover:shadow-md transition-shadow`}>
                                    <FaBook size={11} />
                                    Study Guide
                                  </span>
                                  <FaChevronRight className={`${accent.text} group-hover:translate-x-1 transition-transform`} size={13} />
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}

          {/* â”€â”€ Interview Questions Section â”€â”€ */}
          {(showInterviewQuestions || showInterviewQuestionsInAll) && (
            <div className={showInterviewQuestionsInAll ? 'mt-14' : ''}>
              {showInterviewQuestionsInAll && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Interview Questions</h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">4 categories</span>
                </div>
              )}
              {showInterviewQuestions && (
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">Interview Questions</h1>
                  <p className="text-slate-500 dark:text-slate-400">Prepare for your next technical interview with comprehensive Q&amp;A sets.</p>
                </div>
              )}
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {interviewQuestionCategories.map((iq, i) => {
                  const Icon = iq.icon;
                  const iqColors = [
                    { gradient: "from-cyan-500 to-blue-600", icon: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400", badge: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300" },
                    { gradient: "from-violet-500 to-purple-600", icon: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400", badge: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300" },
                    { gradient: "from-amber-500 to-orange-600", icon: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300" },
                    { gradient: "from-indigo-500 to-blue-700", icon: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300" },
                  ][i % 4];
                  return (
                    <Link key={iq.slug} href={`/interview-questions/${iq.slug}`}
                      className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col">
                      <div className={`h-1.5 bg-gradient-to-r ${iqColors.gradient}`} />
                      <div className="p-6 flex flex-col flex-1">
                        <div className={`w-12 h-12 rounded-2xl ${iqColors.icon} flex items-center justify-center mb-4`}>
                          <Icon className={iqColors.text} size={22} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{iq.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{iq.description}</p>
                        <div className="mt-5 flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r ${iqColors.gradient} text-white shadow-sm`}>
                            Practice Now
                            <FaChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-8 right-8 p-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200 z-50 cursor-pointer" aria-label="Scroll to top">
          <FaArrowUp size={17} />
        </button>
      )}
      {!showScrollTop && <FloatingWriteReviewButton />}
      <ReviewsDrawer isOpen={showReviewsDrawer} onClose={() => setShowReviewsDrawer(false)} />
    </div>
  );
}

export default function ContentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
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
