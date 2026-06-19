"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaLinkedin, FaYoutube, FaInstagram, FaTiktok, FaGithub,
  FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaCode,
  FaCloud, FaDatabase, FaMobile, FaGraduationCap,
  FaBars, FaTimes, FaArrowRight, FaServer, FaRocket,
  FaArrowLeft, FaCheckCircle, FaUsers, FaBolt,
  FaLayerGroup, FaChartLine, FaNpm, FaExternalLinkAlt
} from "react-icons/fa";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "experience", "skills", "education", "publications", "contact"];
      const sp = window.scrollY + 100;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && sp >= el.offsetTop && sp < el.offsetTop + el.offsetHeight) {
          setActiveSection(s); break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCountersStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "publications", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const statsData = [
    { value: "9+", label: "Years Experience", icon: FaChartLine, color: "from-blue-500 to-blue-600" },
    { value: "5", label: "Companies", icon: FaUsers, color: "from-purple-500 to-purple-600" },
    { value: "12+", label: "Tech Stacks", icon: FaLayerGroup, color: "from-emerald-500 to-emerald-600" },
    { value: "2", label: "NPM Packages", icon: FaNpm, color: "from-rose-500 to-rose-600" },
  ];

  const workExperience = [
    {
      company: "TKXEL PORTUGAL LDA", location: "Lisbon, Portugal",
      role: "Principal Software Engineer", period: "Jun 2021 – Present",
      subtitle: "PSE · Tech Lead · Pre-Sales · JS Trainer",
      techs: ["AWS", "Lambda", "Amplify", "GraphQL", "DynamoDB", "Angular 17", "Node 18"],
      highlights: ["Led multi-project teams & code reviews", "Ran JavaScript Bootcamps", "Built serverless backends with AWS Lambda", "Full-stack with Angular + GraphQL"],
      color: "from-blue-600 to-indigo-600", dot: "bg-blue-600",
    },
    {
      company: "SOFTCIRCLES LLC", location: "Brooklyn, NY, USA",
      role: "Senior Software Engineer", period: "Aug 2018 – Jun 2021",
      subtitle: "Senior Engineer · Team Lead",
      techs: ["Node.js", "Express", "LoopBack 4", "Angular 8", "React", "React Native", "MongoDB", "PostgreSQL"],
      highlights: ["Managed 9-person engineering team", "Architected full-stack projects end-to-end", "Built cross-platform mobile apps", "Multi-DB management (SQL + NoSQL)"],
      color: "from-purple-600 to-violet-600", dot: "bg-purple-600",
    },
    {
      company: "ADNARE LLC", location: "Washington, USA",
      role: "Software Engineer", period: "Aug 2017 – Sep 2018",
      subtitle: "Software Engineer",
      techs: [".NET (C#)", "SQL Server", "MS Access"],
      highlights: ["Developed and managed project modules", "REST API development", "Database schema & stored procedures"],
      color: "from-emerald-600 to-teal-600", dot: "bg-emerald-600",
    },
    {
      company: "WATEEN TELECOM", location: "Abu Dhabi, UAE",
      role: "Associate Software Engineer", period: "Feb 2017 – Jul 2017",
      subtitle: "Associate Software Engineer",
      techs: [".NET (C#)", "MySQL"],
      highlights: ["Backend API development", "Bug fixing across modules", "Database query optimisation"],
      color: "from-amber-500 to-orange-500", dot: "bg-amber-500",
    },
    {
      company: "LIVELLO TECHNOLOGIES", location: "Düsseldorf, Germany",
      role: "Web Developer Intern", period: "Jun 2015 – Nov 2015",
      subtitle: "Internee",
      techs: [".NET (C#)", "SQL Server"],
      highlights: ["Supported API development", "Query writing and optimisation"],
      color: "from-slate-500 to-slate-600", dot: "bg-slate-500",
    },
  ];

  const techGroups = [
    { name: "Frontend", badge: "text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40", card: "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20", icon: FaCode, techs: ["JavaScript", "TypeScript", "Angular 17", "React", "Next.js", "HTML5", "Tailwind CSS"] },
    { name: "Backend", badge: "text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40", card: "border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20", icon: FaServer, techs: ["Node.js", "Express.js", "LoopBack 4", "GraphQL", "REST APIs"] },
    { name: "Cloud & AWS", badge: "text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/40", card: "border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20", icon: FaCloud, techs: ["AWS Lambda", "AWS Amplify", "DynamoDB", "S3", "EC2", "API Gateway"] },
    { name: "Databases", badge: "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40", card: "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20", icon: FaDatabase, techs: ["MongoDB", "PostgreSQL", "MySQL", "DynamoDB", "SQL Server"] },
    { name: "Mobile", badge: "text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/40", card: "border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20", icon: FaMobile, techs: ["React Native", "Android"] },
  ];

  const pubs = [
    { year: "2021", title: "js-bunch", type: "NPM Package", link: "https://www.npmjs.com/package/js-bunch", desc: "Utility library with helper functions for common JS tasks — streamlined solutions across different contexts.", icon: "📦" },
    { year: "2021", title: "expressjs-mvc-generator", type: "NPM Package", link: "https://www.npmjs.com/package/express-generator1", desc: "Boilerplate generator for Express.js MVC projects with multi-DB connection setup and opinionated folder structure.", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-800" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Image src="/codewitharqam-logo.svg" alt="CodeWithArqam" width={28} height={28} />
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">CodeWithArqam</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeSection === item.id ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-semibold hover:opacity-90 transition-all cursor-pointer">
                <FaArrowLeft size={11} /> Back to Home
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-600 dark:text-slate-300 cursor-pointer" aria-label="Menu">
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">{item.label}</button>
            ))}
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-center mt-2 cursor-pointer">← Back to Home</Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="text-center lg:text-left space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Available for New Opportunities
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
                Muhammad<br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Arqam</span>
              </h1>
              <div>
                <p className="text-xl text-slate-300 font-light">Principal Software Engineer</p>
                <p className="text-base text-slate-500 mt-1">Solutions Architect · Tech Lead · JavaScript Expert</p>
                <p className="text-sm text-blue-400 font-medium mt-2 flex items-center gap-1 justify-center lg:justify-start">
                  <FaMapMarkerAlt size={12} /> Lisbon, Portugal, Europe
                </p>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Full-Stack engineer with <span className="text-white font-semibold">9+ years</span> building scalable systems across startups and enterprises. Expert in <span className="text-blue-400 font-semibold">JavaScript, Node.js, AWS</span> and modern full-stack frameworks.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <button onClick={() => scrollTo("experience")} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/30 cursor-pointer">
                  View Experience <FaArrowRight size={14} />
                </button>
                <a href="https://www.linkedin.com/in/arqam-dev/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white rounded-xl font-semibold transition-all cursor-pointer">
                  <FaLinkedin size={14} className="text-blue-400" /> LinkedIn
                </a>
                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2u6eGe7KMtG7nwQDNGC-UxAlHH21vlDjC3juwWY6IW19sIeWux52A3ZN4jx6EbojIFQKnnP-yu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-purple-600 hover:border-purple-400 text-purple-300 hover:text-white rounded-xl font-semibold transition-all cursor-pointer">
                  <FaCalendarAlt size={13} /> Book Mentoring
                </a>
              </div>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                {[
                  { href: "https://www.linkedin.com/in/arqam-dev/", I: FaLinkedin, c: "hover:text-blue-400" },
                  { href: "https://www.youtube.com/@codewitharqam", I: FaYoutube, c: "hover:text-red-400" },
                  { href: "https://www.instagram.com/codewitharqam", I: FaInstagram, c: "hover:text-pink-400" },
                  { href: "https://github.com/arqam-dev", I: FaGithub, c: "hover:text-white" },
                  { href: "https://www.tiktok.com/@codewitharqam", I: FaTiktok, c: "hover:text-slate-300" },
                ].map((s, i) => <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`text-slate-500 ${s.c} transition-colors cursor-pointer`}><s.I size={18} /></a>)}
              </div>
            </div>
            {/* Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full border border-blue-500/20 animate-pulse" />
                <div className="absolute -inset-8 rounded-full border border-purple-500/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-2xl" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-blue-500/10">
                  <Image src="/arqam-pic.jpg" alt="Muhammad Arqam" width={320} height={320} className="object-cover w-full h-full" priority />
                </div>
                <span className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">9+ Years</span>
                <span className="absolute -bottom-3 -left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">🇵🇹 Portugal</span>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce-gentle">
          <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-slate-600 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div ref={statsRef} className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center group">
                <div className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={20} />
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">{countersStarted ? s.value : "0"}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
              <FaCode className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Work Experience</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">9+ years · 3 continents · 5 companies</p>
            </div>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-slate-200 dark:to-slate-700 hidden md:block" />
            <div className="space-y-8">
              {workExperience.map((exp, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg text-white text-xs font-black z-10 flex-shrink-0`}>
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flex-1 group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1.5 mt-1">
                          <FaMapMarkerAlt size={11} /> {exp.company} · {exp.location}
                        </p>
                        <p className="text-xs text-slate-400 italic mt-0.5">{exp.subtitle}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">
                        <FaCalendarAlt size={10} /> {exp.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.techs.map((t, j) => <span key={j} className="text-xs font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-700">{t}</span>)}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-1.5">
                      {exp.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={12} /> {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-md flex-shrink-0">
              <FaBolt className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Skills & Tech Stack</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Technologies I use daily</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techGroups.map((g, i) => {
              const Icon = g.icon;
              return (
                <div key={i} className={`rounded-2xl border p-5 ${g.card} hover:shadow-md transition-all duration-200`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon size={15} className="text-slate-500 dark:text-slate-400" />
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${g.badge}`}>{g.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.techs.map((t, j) => (
                      <span key={j} className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 transition-transform cursor-default">{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-md flex-shrink-0">
              <FaGraduationCap className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Education</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Academic background</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🎓", degree: "MPhil — Post Graduation", school: "University of Engineering & Technology", location: "Lahore, Pakistan", desc: "Advanced studies in computer science, software architecture and system design.", link: "https://www.uet.edu.pk/home/" },
              { icon: "🏛️", degree: "Post Graduation Certificate", school: "University of Lisbon", location: "Lisbon, Portugal", desc: "Continuing education in technology and innovation at one of Europe's leading universities.", link: "https://www.ulisboa.pt/" },
            ].map((e, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{e.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{e.degree}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mt-0.5">{e.school}</p>
                    <p className="text-slate-500 text-xs flex items-center gap-1 mt-1"><FaMapMarkerAlt size={10} /> {e.location}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">{e.desc}</p>
                    <a href={e.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-medium mt-3 hover:underline">
                      <FaExternalLinkAlt size={10} /> Visit Website
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
              <FaRocket className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Open Source Projects</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Published NPM packages</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {pubs.map((p, i) => (
              <div key={i} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{p.type} · {p.year}</p>
                      <h3 className="font-bold text-slate-900 dark:text-white font-mono text-lg">{p.title}</h3>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <FaNpm className="text-red-600 dark:text-red-400" size={15} />
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                  View on NPM <FaExternalLinkAlt size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">Let&apos;s Build Something Great</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Open to senior/principal engineering roles, tech leadership, and consulting engagements.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { I: FaEnvelope, label: "Email", value: "codewitharqam@gmail.com", href: "mailto:codewitharqam@gmail.com", c: "text-blue-400" },
              { I: FaMapMarkerAlt, label: "Location", value: "Lisbon, Portugal, Europe", href: null, c: "text-emerald-400" },
              { I: FaLinkedin, label: "LinkedIn", value: "/in/arqam-dev", href: "https://www.linkedin.com/in/arqam-dev/", c: "text-blue-400" },
              { I: FaCalendarAlt, label: "Free Mentoring", value: "Book a session", href: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2u6eGe7KMtG7nwQDNGC-UxAlHH21vlDjC3juwWY6IW19sIeWux52A3ZN4jx6EbojIFQKnnP-yu", c: "text-purple-400" },
            ].map((c, i) => {
              const inner = (
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <c.I className={c.c} size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{c.label}</p>
                    <p className="text-white font-medium text-sm">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="cursor-pointer">{inner}</a> : <div key={i}>{inner}</div>;
            })}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.linkedin.com/in/arqam-dev/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 cursor-pointer">
              <FaLinkedin size={18} /> Connect on LinkedIn
            </a>
            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2u6eGe7KMtG7nwQDNGC-UxAlHH21vlDjC3juwWY6IW19sIeWux52A3ZN4jx6EbojIFQKnnP-yu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold transition-all cursor-pointer">
              <FaCalendarAlt size={16} /> Book Free Mentoring
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-center gap-5">
            {[
              { href: "https://www.linkedin.com/in/arqam-dev/", I: FaLinkedin },
              { href: "https://www.youtube.com/@codewitharqam", I: FaYoutube },
              { href: "https://www.instagram.com/codewitharqam", I: FaInstagram },
              { href: "https://github.com/arqam-dev", I: FaGithub },
              { href: "https://www.tiktok.com/@codewitharqam", I: FaTiktok },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer">
                <s.I size={16} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-600 py-6 px-4 text-center border-t border-slate-900">
        <p className="text-sm">© {new Date().getFullYear()} Muhammad Arqam · Principal Software Engineer · Lisbon, Portugal</p>
      </footer>
    </div>
  );
}