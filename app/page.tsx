"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  FaLinkedin, 
  FaYoutube, 
  FaInstagram, 
  FaTiktok,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaCode,
  FaCloud,
  FaDatabase,
  FaMobile,
  FaGraduationCap,
  FaBook,
  FaGlobe,
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
  FaGem,
  FaMagic
} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "experience", "skills", "education", "publications", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const workExperience = [
    {
      company: "TKXEL PORTUGAL LDA",
      location: "Lisbon, Portugal",
      role: "PRINCIPAL SOFTWARE ENGINEER",
      period: "07/06/2021 - CURRENT",
      level: "Level 4",
      roles: "Principal Software Engineer | Tech Lead | Pre-Sales Engineer | Javascript Trainer",
      locations: "Portugal | London, Poland, Seattle, Boston, U.A.E",
      technologies: "AWS, AWS APIs (Lambdas), Amplify, GraphQL, DynamoDB, Angular 17, Node 18",
      responsibilities: [
        "Working as PSE, managing multiple projects, and reviewing PR of the respective modules.",
        "Manage Bootcamps regarding JavaScript technology.",
        "Backend Responsibilities: Writing Lambda functions and fixing them.",
        "Frontend Responsibilities: Creating UI and performing mutations and queries.",
        "Database Responsibilities: Manage DB and Create tables using amplify."
      ]
    },
    {
      company: "SOFTCIRCLES LLC",
      location: "Brooklyn, NY, United States",
      role: "SENIOR SOFTWARE ENGINEER",
      period: "01/08/2018 - 01/06/2021",
      level: "Level 3",
      roles: "Senior Software Engineer | Team Lead",
      technologies: "NodeJS (Express JS, Loopback 3, Loopback 4), Angular 8, React JS, React Native, MySQL, MongoDB, PostgreSQL, WordPress, Android",
      responsibilities: [
        "Managed up to 9 members team and managed project timelines.",
        "Create & manage the architecture of each project and PR reviews.",
        "Backend Responsibilities: Creating project architecture, Writing APIs, Scripts, etc.",
        "Frontend Responsibilities: Creating UI according to the given design and utilization of APIs.",
        "Database Responsibilities: Creating Schema, Writing SPs, Creating Views, etc."
      ]
    },
    {
      company: "ADNARE LLC",
      location: "Washington, United States",
      role: "SOFTWARE ENGINEER",
      period: "01/08/2017 - 01/09/2018",
      level: "Level 2",
      roles: "Software Engineer",
      office: "Redmond, WA, United States",
      technologies: ".Net (C#), Microsoft SQL Server, MS Access DB",
      responsibilities: [
        "Creating and managing the assigned modules.",
        "Backend Responsibilities: Writing APIs and other backend tasks.",
        "Frontend Responsibilities: Creating UI and APIs utilization.",
        "Database Responsibilities: Manage Schema, Write SPs, Creating Views, etc."
      ]
    },
    {
      company: "WATEEN TELECOM LLC",
      location: "Abu Dhabi Emirates, United Arab Emirates",
      role: "ASSOCIATE SOFTWARE ENGINEER",
      period: "01/02/2017 - 01/07/2017",
      level: "Level 1",
      roles: "Associate Software Engineer",
      technologies: ".Net (C#), MySQL",
      responsibilities: [
        "Managing the backend tasks only and a few database tasks.",
        "Backend Responsibilities: Writing APIs and bug fixing in various modules.",
        "Database Responsibilities: Writing basic data retrieval and creation queries."
      ]
    },
    {
      company: "LIVELLO TECHNOLOGIES GMBH",
      location: "Düsseldorf, Germany",
      role: "WEB DEVELOPER",
      period: "01/06/2015 - 01/11/2015",
      level: "Level 1",
      roles: "Internee",
      technologies: ".Net (C#), SQL Server",
      responsibilities: [
        "Managing the backend tasks only and a few database tasks.",
        "Backend Responsibilities: Support for writing APIs.",
        "Database Responsibilities: Writing queries and optimising them."
      ]
    }
  ];

  const skills = [
    { name: "JavaScript", percentage: 95, icon: FaCode },
    { name: "Node.js", percentage: 92, icon: FaCode },
    { name: "AWS", percentage: 88, icon: FaCloud },
    { name: "Angular", percentage: 90, icon: FaCode },
    { name: "React", percentage: 85, icon: FaCode },
    { name: "GraphQL", percentage: 87, icon: FaCode },
    { name: "MongoDB", percentage: 85, icon: FaDatabase },
    { name: "PostgreSQL", percentage: 88, icon: FaDatabase },
    { name: "MySQL", percentage: 90, icon: FaDatabase },
    { name: "DynamoDB", percentage: 82, icon: FaDatabase },
    { name: "Express.js", percentage: 93, icon: FaCode },
    { name: "React Native", percentage: 80, icon: FaMobile }
  ];

  const publications = [
    {
      year: "2021",
      title: "Javascript Library - JS Bunch",
      type: "NPM",
      link: "https://www.npmjs.com/package/js-bunch",
      description: "A variety of utilities and helper functions for various tasks, providing streamlined solutions across different contexts."
    },
    {
      year: "2021",
      title: "Javascript Library - Expressjs-mvc-Generator",
      type: "NPM",
      link: "https://www.npmjs.com/package/express-generator1",
      description: "Essential boilerplate code for connecting to multiple databases and organizing projects into specific folders."
    }
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
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Arqam
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "Experience", "Skills", "Education", "Publications", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.toLowerCase()
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item}
                </button>
              ))}
              <Link
                href="/content"
                className="relative text-sm font-bold transition-all duration-200 group"
              >
                <span className="relative z-10 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                  <FaMagic className="text-blue-200" size={14} />
                  <span>Content</span>
                  <FaArrowRight size={12} />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Social Media Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/muhammadarqam-845b4614b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.youtube.com/@codewitharqam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://www.instagram.com/codewitharqam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@codewitharqam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                aria-label="TikTok"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="https://github.com/arqam-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-4 space-y-3">
              {["Home", "Experience", "Skills", "Education", "Publications", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeSection === item.toLowerCase()
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {item}
                </button>
              ))}
              <Link
                href="/content"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg transform hover:scale-105 flex items-center space-x-2"
              >
                <FaMagic className="text-blue-200" size={14} />
                <span>Content</span>
                <span className="ml-auto px-2 py-0.5 bg-white/20 rounded-full text-xs">24+ Topics</span>
              </Link>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center space-x-4">
                  <a
                    href="https://www.linkedin.com/in/muhammadarqam-845b4614b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href="https://www.youtube.com/@codewitharqam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                    aria-label="YouTube"
                  >
                    <FaYoutube size={20} />
                  </a>
                  <a
                    href="https://www.instagram.com/codewitharqam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@codewitharqam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                    aria-label="TikTok"
                  >
                    <FaTiktok size={20} />
                  </a>
                  <a
                    href="https://github.com/arqam-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                  Full-Stack Software Engineer
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                Muhammad Arqam
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300">
                Solution Architect Based In <span className="font-semibold text-blue-600 dark:text-blue-400">Lisbon, Portugal</span>
              </p>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                I am a Full-Stack Software Engineer with <strong className="text-slate-900 dark:text-white">9+ years</strong> of experience. 
                My core competency is in JavaScript and RDBMs. I have worked on <strong className="text-slate-900 dark:text-white">MEAN Stack, MERN Stack, CMS & serverless</strong> technologies.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => scrollToSection("experience")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                >
                  <FaCode size={18} />
                  <span>View My Experience</span>
                  <FaArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                >
                  Get In Touch
                </button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
        <Image
                    src="/arqam-pic.jpg"
                    alt="Muhammad Arqam"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
          priority
        />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Work Experience
          </h2>
          <div className="space-y-8">
            {workExperience.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
                      <FaMapMarkerAlt size={16} />
                      <span className="font-semibold">{exp.company}</span>
                      <span className="text-slate-500 dark:text-slate-400">• {exp.location}</span>
                    </div>
                    {exp.office && (
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        Office: {exp.office}
                      </p>
                    )}
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-2">
                      {exp.level}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">{exp.period}</p>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4">{exp.roles}</p>
                {exp.locations && (
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    <strong>Locations:</strong> {exp.locations}
                  </p>
                )}
                <div className="mb-4">
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    <strong>Technologies:</strong> <span className="text-blue-600 dark:text-blue-400">{exp.technologies}</span>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="text-blue-600 dark:text-blue-400" size={24} />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Education & Training
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-start space-x-4">
                <FaGraduationCap className="text-blue-600 dark:text-blue-400 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    MPhil - Post Graduation (18 Years)
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                    University of Engineering and Technology, Lahore, Pakistan
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 mb-4">
                    Advanced studies in programming and technology, software development and system architecture.
                  </p>
                  <a
                    href="https://www.uet.edu.pk/home/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-2"
                  >
                    <FaGlobe size={16} />
                    <span>Visit Website</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-start space-x-4">
                <FaBook className="text-blue-600 dark:text-blue-400 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Post Graduation Certification
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                    University of Lisbon, Lisbon, Portugal
                  </p>
                  <a
                    href="https://www.ulisboa.pt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-2"
                  >
                    <FaGlobe size={16} />
                    <span>Visit Website</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Publications & Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                    {pub.year}
                  </span>
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
                    {pub.type}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {pub.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {pub.description}
                </p>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <FaGithub size={18} />
                  <span>View on NPM</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FaEnvelope className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                  <a href="mailto:arqam.career@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    arqam.career@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FaPhone className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                  <a href="tel:+351912998774" className="text-blue-600 dark:text-blue-400 hover:underline">
                    (+351) 912998774
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Location</h3>
                  <p className="text-slate-600 dark:text-slate-400">Lisbon, Portugal</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FaLinkedin className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">LinkedIn</h3>
                  <a
                    href="https://www.linkedin.com/in/muhammadarqam-845b4614b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Connect with me
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 text-center">
                Follow Me On
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.linkedin.com/in/muhammadarqam-845b4614b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://www.youtube.com/@codewitharqam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <FaYoutube size={24} />
                </a>
                <a
                  href="https://www.instagram.com/codewitharqam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@codewitharqam"
            target="_blank"
            rel="noopener noreferrer"
                  className="p-4 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-colors duration-200"
                  aria-label="TikTok"
                >
                  <FaTiktok size={24} />
          </a>
          <a
                  href="https://github.com/arqam-dev"
            target="_blank"
            rel="noopener noreferrer"
                  className="p-4 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 rounded-full hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <Link
          href="/content"
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            
            {/* Main button */}
            <div className="relative px-5 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-2 border-white/20 backdrop-blur-sm">
              <FaMagic className="text-blue-200" size={16} />
              <span className="hidden sm:inline">Explore Guides</span>
              <span className="sm:hidden">Learn</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              
              {/* Subtle notification badge */}
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white dark:ring-slate-900"></div>
            </div>
          </div>
        </Link>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Muhammad Arqam. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Full-Stack Software Engineer & Solution Architect | Lisbon, Portugal
          </p>
        </div>
      </footer>
    </div>
  );
}
