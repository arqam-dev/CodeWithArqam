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
  FaMagic,
  FaExclamationTriangle,
  FaArrowLeft
} from "react-icons/fa";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
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
                href="/"
                className="px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
              >
                <FaArrowLeft size={14} />
                <span>Back to Home</span>
              </Link>
              <Link
                href="/content"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 cursor-pointer"
              >
                <FaMagic size={14} />
                <span>Learning Guides</span>
              </Link>
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
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-lg transition-all duration-200 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FaArrowLeft size={14} />
                <span>Back to Home</span>
              </Link>
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

      {/* Interactive Hero Section - Different from Home */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
                  Principal Software Engineer
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
                Muhammad Arqam
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300">
                Solutions Architect & Tech Lead<br />
                <span className="font-semibold text-blue-600 dark:text-blue-400">Based in Portugal, Europe</span>
              </p>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
                Full-Stack Software Engineer with <strong className="text-slate-900 dark:text-white">9+ years</strong> of experience. 
                Expert in <strong className="text-slate-900 dark:text-white">JavaScript, Node.js, AWS, MEAN/MERN Stack</strong> and serverless technologies.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => scrollToSection("experience")}
                  className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
                >
                  <FaCode size={16} />
                  <span>View Experience</span>
                  <FaArrowRight size={14} />
                </button>
                <a
                  href="https://www.linkedin.com/in/arqam-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 flex items-center space-x-2"
                >
                  <FaLinkedin size={16} />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-4 border-purple-400 opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/arqam-pic.jpg"
                    alt="Muhammad Arqam"
                    width={384}
                    height={384}
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
                      className="bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 dark:from-teal-500 dark:via-cyan-600 dark:to-teal-700 h-2.5 rounded-full transition-all duration-1000"
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
                  <a href="mailto:codewitharqam@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    codewitharqam@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FaPhone className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="flex-1 relative group">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                  <div className="inline-flex items-center">
                    <span className="text-blue-600 dark:text-blue-400 blur-sm select-none pointer-events-none">
                      (+351) 000000000
                    </span>
                    <FaExclamationTriangle 
                      className="ml-2 text-yellow-500 dark:text-yellow-400 cursor-help" 
                      size={16}
                    />
                  </div>
                  <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 border border-slate-700">
                    <div className="flex items-start space-x-2">
                      <FaExclamationTriangle className="text-yellow-400 mt-0.5 flex-shrink-0" size={14} />
                      <p>Phone number is hidden due to too many queries in pipeline</p>
                    </div>
                  </div>
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
                  <h3 className="font-semibold text-slate-900 dark:text-white">Personal LinkedIn</h3>
                  <a
                    href="https://www.linkedin.com/in/arqam-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Connect with me
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <FaLinkedin className="text-slate-600 dark:text-slate-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Company LinkedIn</h3>
                  <a
                    href="https://www.linkedin.com/company/106984678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:underline"
                  >
                    Follow CodeWithArqam
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
                  href="https://www.linkedin.com/in/arqam-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-colors duration-200"
                  aria-label="Personal LinkedIn"
                  title="Personal LinkedIn Profile"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/company/106984678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-700 text-white rounded-full hover:bg-slate-800 transition-colors duration-200"
                  aria-label="Company LinkedIn"
                  title="CodeWithArqam Company Page"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://www.youtube.com/@codewitharqam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <FaYoutube size={24} />
                </a>
                <a
                  href="https://www.instagram.com/codewitharqam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-colors duration-200"
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

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Muhammad Arqam. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Full-Stack Software Engineer & Solutions Architect | Portugal, Europe
          </p>
        </div>
      </footer>
    </div>
  );
}

