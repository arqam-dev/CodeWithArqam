"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FaLinkedin, 
  FaYoutube, 
  FaInstagram, 
  FaTiktok,
  FaGithub,
  FaCalendarAlt,
  FaCode,
  FaCloud,
  FaDatabase,
  FaMobile,
  FaGraduationCap,
  FaBook,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaServer,
  FaTools,
  FaBrain,
  FaQuestionCircle,
  FaRocket,
  FaFire,
  FaStar,
  FaMagic,
  FaUsers,
  FaCheckCircle,
  FaChartLine,
  FaLaptopCode,
  FaNetworkWired,
  FaCog,
  FaPaintBrush
} from "react-icons/fa";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { label: "Total Concepts", value: "27+", icon: FaBook, color: "from-slate-500 to-slate-600" },
    { label: "Categories", value: "12", icon: FaGraduationCap, color: "from-slate-600 to-slate-700" },
    { label: "Students Taught", value: "500+", icon: FaUsers, color: "from-slate-500 to-slate-600" },
    { label: "Years Experience", value: "9+", icon: FaChartLine, color: "from-slate-600 to-slate-700" }
  ];

  const features = [
    {
      icon: FaBook,
      title: "Comprehensive Guides",
      description: "In-depth explanations of programming concepts with real-world examples and best practices.",
      color: "slate"
    },
    {
      icon: FaQuestionCircle,
      title: "Interactive Quizzes",
      description: "Test your knowledge with 25-question quizzes for each concept to reinforce learning.",
      color: "slate"
    },
    {
      icon: FaRocket,
      title: "Career Ready",
      description: "Learn skills that employers are looking for, from fundamentals to advanced topics.",
      color: "slate"
    },
    {
      icon: FaMagic,
      title: "Expert Teaching",
      description: "Learn from a Principal Software Engineer with 9+ years of industry experience.",
      color: "slate"
    }
  ];

  const categories = [
    { name: "Frontend", icon: FaCode, count: 5, color: "slate", description: "JavaScript, React, Angular, HTML, CSS" },
    { name: "Backend", icon: FaServer, count: 2, color: "slate", description: "Node.js, GraphQL, APIs" },
    { name: "Full Stack", icon: FaLaptopCode, count: 1, color: "slate", description: "Next.js, Full-stack frameworks" },
    { name: "Cloud", icon: FaCloud, count: 3, color: "slate", description: "AWS, DevOps, Cloud Computing" },
    { name: "Database", icon: FaDatabase, count: 1, color: "slate", description: "SQL, NoSQL, Database Design" },
    { name: "CS Fundamentals", icon: FaBrain, count: 5, color: "slate", description: "Data Structures, OOP, OS, Networking" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src="/codewitharqam-logo.svg"
                alt="CodeWithArqam Logo"
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeWithArqam
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/portfolio"
                className="px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
              >
                <FaUsers size={14} />
                <span>My Portfolio</span>
              </Link>
              <a
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2u6eGe7KMtG7nwQDNGC-UxAlHH21vlDjC3juwWY6IW19sIeWux52A3ZN4jx6EbojIFQKnnP-yu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
              >
                <FaCalendarAlt size={14} />
                <span>Book Free Mentoring</span>
              </a>
              <Link
                href="/content"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
              >
                <FaMagic size={14} />
                <span>Learning Guides</span>
              </Link>

              {/* Interactive Social Media Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setShowSocialDropdown(true)}
                onMouseLeave={() => setShowSocialDropdown(false)}
              >
                <button
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border border-blue-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer relative group"
                  aria-label="Social Media"
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative flex items-center space-x-0.5">
                      <FaLinkedin size={14} className="text-blue-600" />
                      <FaYoutube size={12} className="text-red-600" />
                      <FaInstagram size={12} className="text-pink-600" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden lg:inline">Social</span>
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping opacity-75"></span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                </button>
                
                {showSocialDropdown && (
                  <div className="absolute top-full right-0 mt-2 origin-top-right z-50 pointer-events-auto">
                    <div className="absolute top-0 right-0 w-20 h-4 -mt-4"></div>
                    <div className="relative w-72 h-72">
                      {[
                        { icon: FaLinkedin, href: "https://www.linkedin.com/in/arqam-dev/", color: "text-blue-600", bgColor: "bg-blue-50 dark:bg-blue-900/20", label: "LinkedIn", angle: 15, hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/40" },
                        { icon: FaYoutube, href: "https://www.youtube.com/@codewitharqam", color: "text-red-600", bgColor: "bg-red-50 dark:bg-red-900/20", label: "YouTube", angle: 45, hoverColor: "hover:bg-red-100 dark:hover:bg-red-900/40" },
                        { icon: FaInstagram, href: "https://www.instagram.com/codewitharqam", color: "text-pink-600", bgColor: "bg-pink-50 dark:bg-pink-900/20", label: "Instagram", angle: 75, hoverColor: "hover:bg-pink-100 dark:hover:bg-pink-900/40" },
                        { icon: FaTiktok, href: "https://www.tiktok.com/@codewitharqam", color: "text-slate-900 dark:text-white", bgColor: "bg-slate-50 dark:bg-slate-800", label: "TikTok", angle: 105, hoverColor: "hover:bg-slate-100 dark:hover:bg-slate-700" },
                        { icon: FaGithub, href: "https://github.com/arqam-dev", color: "text-slate-900 dark:text-white", bgColor: "bg-slate-50 dark:bg-slate-800", label: "GitHub", angle: 135, hoverColor: "hover:bg-slate-100 dark:hover:bg-slate-700" }
                      ].map((social, index) => {
                        const radius = 110;
                        const angleRad = (social.angle * Math.PI) / 180;
                        const x = Math.cos(angleRad) * radius;
                        const y = Math.sin(angleRad) * radius;
                        const Icon = social.icon;
                        
                        return (
                          <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute group/item transition-all duration-300 ease-out cursor-pointer"
                            style={{
                              left: `${144 + x}px`,
                              top: `${y}px`,
                              transform: 'translate(-50%, -50%) scale(0)',
                              animation: `socialBubbleIn 0.2s ease-out ${index * 0.03}s forwards`
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.4)';
                              e.currentTarget.style.zIndex = '10';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                              e.currentTarget.style.zIndex = '1';
                            }}
                          >
                            <div className="relative">
                              <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-30 group-hover/item:animate-ping" style={{ animationDelay: '0s' }}></div>
                              <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-20 group-hover/item:animate-ping" style={{ animationDelay: '0.2s' }}></div>
                              <div className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-10 group-hover/item:animate-ping" style={{ animationDelay: '0.4s' }}></div>
                              
                              <div className={`relative w-14 h-14 rounded-full ${social.bgColor} ${social.hoverColor} shadow-xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover/item:shadow-2xl group-hover/item:border-blue-400 dark:group-hover/item:border-blue-500 transition-all duration-300 group-hover/item:rotate-12`}>
                                <Icon size={22} className={`${social.color} group-hover/item:scale-125 transition-transform duration-300`} />
                              </div>
                              
                              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap transform translate-x-0 group-hover/item:translate-x-2">
                                <div className={`px-3 py-2 rounded-lg ${social.bgColor} shadow-xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm`}>
                                  <span className="text-sm font-bold text-slate-900 dark:text-white">{social.label}</span>
                                </div>
                                <div className={`absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 ${social.bgColor.replace('bg-', 'border-')} border-r-slate-200 dark:border-r-slate-700`}></div>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FaUsers size={14} />
                <span>My Portfolio</span>
              </Link>
              <a
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2u6eGe7KMtG7nwQDNGC-UxAlHH21vlDjC3juwWY6IW19sIeWux52A3ZN4jx6EbojIFQKnnP-yu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FaCalendarAlt size={14} />
                <span>Book Free Mentoring</span>
              </a>
              <Link
                href="/content"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FaMagic size={14} />
                <span>Learning Guides</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Banner Section - Arqam's Info */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
                  Principal Software Engineer & Tech Educator
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                Learn with <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">Arqam</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300">
                Master Full-Stack Development with <span className="font-semibold text-blue-600 dark:text-blue-400">9+ Years</span> of Industry Experience
              </p>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                Hi, I'm <strong className="text-slate-900 dark:text-white">Muhammad Arqam</strong>, a Principal Software Engineer based in Portugal. 
                I've taught <strong className="text-slate-900 dark:text-white">500+ students</strong> and created comprehensive learning resources to help you master modern web development.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/content"
                  className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                >
                  <FaBook size={16} />
                  <span>Start Learning</span>
                  <FaArrowRight size={14} />
                </Link>
                <a
                  href="https://www.linkedin.com/company/106984678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 flex items-center space-x-2"
                >
                  <FaLinkedin size={16} />
                  <span>Follow Company</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link href="/portfolio" className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl">
                  <Image
                    src="/arqam-pic.jpg"
                    alt="Muhammad Arqam"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-90"
                    priority
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Why Learn with CodeWithArqam?
          </h2>
          <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Comprehensive learning resources designed by industry experts to help you succeed in your tech career.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                slate: "from-slate-500 to-slate-600"
              };
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colorClasses[feature.color as keyof typeof colorClasses]} mb-4`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-900 dark:text-white">
            Explore Learning Paths
          </h2>
          <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Choose from 12 categories covering everything from frontend to cloud computing.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const colorClasses = {
                slate: "from-slate-500 to-slate-600"
              };
              return (
                <Link
                  key={index}
                  href={`/content?category=${category.name}`}
                  className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[category.color as keyof typeof colorClasses]}`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <span className="px-3 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/content"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <FaMagic size={18} />
              <span>View All Concepts</span>
              <FaArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-slate-300">
            Join 500+ students learning modern web development with comprehensive guides, interactive quizzes, and expert mentorship.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/content"
              className="px-8 py-4 bg-white text-slate-800 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <FaBook size={18} />
              <span>Explore Concepts</span>
            </Link>
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2u6eGe7KMtG7nwQDNGC-UxAlHH21vlDjC3juwWY6IW19sIeWux52A3ZN4jx6EbojIFQKnnP-yu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-200 flex items-center space-x-2"
            >
              <FaCalendarAlt size={18} />
              <span>Book Free Session</span>
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-slate-300 mb-4">Follow us on social media for updates and tips</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.linkedin.com/company/106984678"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Company LinkedIn"
                title="CodeWithArqam Company Page"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.youtube.com/@codewitharqam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://www.instagram.com/codewitharqam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} CodeWithArqam. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Learn Full-Stack Development with Industry Experts | Portugal, Europe
          </p>
          <div className="mt-4">
            <a
              href="https://www.linkedin.com/in/arqam-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
            >
              <FaLinkedin size={18} />
              <span className="text-sm">Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
