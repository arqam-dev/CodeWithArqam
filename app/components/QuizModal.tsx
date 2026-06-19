"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes, FaChevronRight, FaRedo, FaTrophy, FaClock } from "react-icons/fa";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface QuizData {
  title: string;
  questions: Question[];
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizData: QuizData;
}

const LABELS = ["A", "B", "C", "D", "E"];
const TIME_PER_Q = 30;
const TIMER_R = 20;
const TIMER_CIRC = 2 * Math.PI * TIMER_R;

function getGrade(pct: number) {
  if (pct >= 90) return { grade: "S", label: "Master! 🏆", color: "#f59e0b", ring: "#f59e0b", bg: "from-yellow-500/15 to-orange-500/5" };
  if (pct >= 80) return { grade: "A", label: "Expert! 🎉", color: "#22c55e", ring: "#22c55e", bg: "from-green-500/15 to-emerald-500/5" };
  if (pct >= 70) return { grade: "B", label: "Great! 👏", color: "#3b82f6", ring: "#3b82f6", bg: "from-blue-500/15 to-indigo-500/5" };
  if (pct >= 50) return { grade: "C", label: "Good! 💪", color: "#06b6d4", ring: "#06b6d4", bg: "from-cyan-500/15 to-sky-500/5" };
  return { grade: "D", label: "Keep Studying! 📚", color: "#f97316", ring: "#f97316", bg: "from-orange-500/15 to-amber-500/5" };
}

export default function QuizModal({ isOpen, onClose, quizData }: QuizModalProps) {
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [timedOut, setTimedOut] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [animIn, setAnimIn] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const questions = quizData.questions;
  const total = questions.length;
  const q = questions[index] ?? questions[0];
  const correctCount = results.filter(Boolean).length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const gradeInfo = getGrade(percentage);

  const reset = () => {
    setPhase("intro");
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(TIME_PER_Q);
    setTimedOut(false);
    setResults([]);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      reset();
      setTimeout(() => setAnimIn(true), 40);
    } else {
      document.body.style.overflow = "unset";
      setAnimIn(false);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || answered || phase !== "quiz") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setTimedOut(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isOpen, answered, index, phase]);

  // Handle time-out
  useEffect(() => {
    if (!timedOut) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setAnswered(true);
    setStreak(0);
    setResults(prev => [...prev, false]);
    setTimedOut(false);
  }, [timedOut]);

  // Keyboard: A/B/C/D to pick answer
  useEffect(() => {
    if (!isOpen || answered || phase !== "quiz") return;
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, "1": 0, "2": 1, "3": 2, "4": 3 };
      const optIdx = map[e.key.toLowerCase()];
      if (optIdx !== undefined && optIdx < q.options.length) handleSelect(optIdx);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, answered, phase, index]);

  // Keyboard: Enter/Space to advance
  useEffect(() => {
    if (!isOpen || !answered || phase !== "quiz") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleNext(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, answered, phase, index]);

  const handleSelect = (optIdx: number) => {
    if (answered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(optIdx);
    setAnswered(true);
    const correct = optIdx === q.correct;
    if (correct) {
      setStreak(s => {
        const ns = s + 1;
        setMaxStreak(ms => Math.max(ms, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }
    setResults(prev => [...prev, correct]);
  };

  const handleNext = () => {
    if (index + 1 >= total) {
      setPhase("results");
      return;
    }
    setIndex(i => i + 1);
    setSelected(null);
    setAnswered(false);
    setTimeLeft(TIME_PER_Q);
  };

  if (!isOpen) return null;

  const timerPct = timeLeft / TIME_PER_Q;
  const timerColor = timerPct > 0.5 ? "#22c55e" : timerPct > 0.25 ? "#f59e0b" : "#ef4444";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${animIn ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div className={`relative w-full max-w-lg transition-all duration-300 ${animIn ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}>

        {/* INTRO */}
        {phase === "intro" && (
          <div className="rounded-2xl bg-gradient-to-b from-slate-800 to-[#0f172a] border border-slate-700/50 shadow-2xl overflow-hidden">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors cursor-pointer z-10">
              <FaTimes size={14} />
            </button>
            <div className="px-8 pt-10 pb-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/30">
                <span className="text-3xl">🧠</span>
              </div>
              <h2 className="text-xl font-black text-white mb-1">{quizData.title}</h2>
              <p className="text-slate-400 text-sm">Test your knowledge with a timed quiz</p>
            </div>
            <div className="grid grid-cols-3 gap-3 px-8 mb-6">
              <div className="bg-slate-800/70 rounded-xl p-3 text-center border border-slate-700/40">
                <div className="text-xl font-black text-blue-400">{total}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Questions</div>
              </div>
              <div className="bg-slate-800/70 rounded-xl p-3 text-center border border-slate-700/40">
                <div className="text-xl font-black text-emerald-400">{TIME_PER_Q}s</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Per Question</div>
              </div>
              <div className="bg-slate-800/70 rounded-xl p-3 text-center border border-slate-700/40">
                <div className="text-xl font-black text-orange-400">🔥</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Streak Mode</div>
              </div>
            </div>
            <div className="mx-8 mb-6 px-3.5 py-2.5 bg-slate-800/50 rounded-xl border border-slate-700/40">
              <span className="text-xs text-slate-500">⌨️ Press </span>
              <kbd className="px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-mono">A</kbd>
              <kbd className="ml-1 px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-mono">B</kbd>
              <kbd className="ml-1 px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-mono">C</kbd>
              <kbd className="ml-1 px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-mono">D</kbd>
              <span className="text-xs text-slate-500"> to pick · </span>
              <kbd className="px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-mono">Enter</kbd>
              <span className="text-xs text-slate-500"> to advance</span>
            </div>
            <div className="px-8 pb-8">
              <button
                onClick={() => setPhase("quiz")}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                Start Quiz <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {phase === "quiz" && (
          <div className="rounded-2xl bg-gradient-to-b from-slate-800 to-[#0f172a] border border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-700/50 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold text-slate-300 truncate mr-3">{quizData.title}</span>
                  <span className="flex-shrink-0">{index + 1} / {total}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700/80 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }}
                  />
                </div>
              </div>
              <div className={`text-sm font-black min-w-[36px] text-center transition-all ${streak > 0 ? "text-orange-400" : "text-slate-700"}`}>
                🔥{streak}
              </div>
              <div className="relative w-11 h-11 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r={TIMER_R} fill="none" stroke="#1e293b" strokeWidth="3.5" />
                  <circle cx="24" cy="24" r={TIMER_R} fill="none" stroke={timerColor} strokeWidth="3.5"
                    strokeDasharray={TIMER_CIRC} strokeDashoffset={TIMER_CIRC * (1 - timerPct)}
                    strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s ease" }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">{timeLeft}</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer flex-shrink-0">
                <FaTimes size={13} />
              </button>
            </div>

            <div className="px-5 pt-5 pb-4">
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Question {index + 1} · use A/B/C/D</span>
                <p className="mt-1.5 text-[15px] font-semibold text-white leading-relaxed">{q.question}</p>
              </div>
              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const label = LABELS[optIdx];
                  const isSelected = selected === optIdx;
                  const isCorrect = optIdx === q.correct;
                  const showFeedback = answered;
                  let wrap = "border-slate-700/80 bg-slate-800/60 ";
                  let badge = "bg-slate-700/80 text-slate-400 ";
                  let icon: string | null = null;
                  let textCls = "text-slate-300 ";
                  if (showFeedback) {
                    if (isCorrect) {
                      wrap = "border-emerald-500/50 bg-emerald-500/10 "; badge = "bg-emerald-500 text-white "; icon = "✓"; textCls = "text-emerald-200 ";
                    } else if (isSelected && !isCorrect) {
                      wrap = "border-rose-500/50 bg-rose-500/10 "; badge = "bg-rose-500 text-white "; icon = "✗"; textCls = "text-rose-200 ";
                    } else {
                      wrap = "border-slate-700/40 bg-slate-800/30 "; textCls = "text-slate-500 ";
                    }
                  } else if (isSelected) {
                    wrap = "border-blue-500/60 bg-blue-500/10 "; badge = "bg-blue-500 text-white "; textCls = "text-blue-200 ";
                  } else {
                    wrap += "hover:border-slate-600 hover:bg-slate-700/50 ";
                  }
                  return (
                    <button key={optIdx} onClick={() => handleSelect(optIdx)} disabled={answered}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-150 ${answered ? "cursor-default" : "cursor-pointer"} ${wrap}`}>
                      <span className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-black transition-all ${badge}`}>
                        {icon ?? label}
                      </span>
                      <span className={`text-sm leading-snug ${textCls}`}>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {answered && selected === null && (
                <div className="mt-3 px-3.5 py-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center gap-2">
                  <FaClock size={13} className="text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-amber-300">Time&apos;s up! Correct: <strong>{LABELS[q.correct]}</strong></span>
                </div>
              )}
            </div>

            <div className="px-5 pb-4 flex items-center justify-between">
              <div className="flex gap-1 flex-wrap" style={{ maxWidth: 220 }}>
                {results.map((r, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${r ? "bg-emerald-500" : "bg-rose-500"}`} />
                ))}
                {Array.from({ length: total - results.length }).map((_, i) => (
                  <div key={`e${i}`} className="w-2 h-2 rounded-full bg-slate-700" />
                ))}
              </div>
              <button onClick={handleNext} disabled={!answered}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${answered ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg cursor-pointer" : "bg-slate-700/50 text-slate-600 cursor-not-allowed"}`}>
                {index + 1 >= total ? "See Results" : "Next"} <FaChevronRight size={11} />
              </button>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {phase === "results" && (
          <div className="rounded-2xl bg-gradient-to-b from-slate-800 to-[#0f172a] border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: "88vh" }}>
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <FaTrophy size={15} className="text-yellow-400" />
                <h2 className="font-black text-white text-base">Quiz Complete!</h2>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer transition-colors">
                <FaTimes size={13} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-5 space-y-4">
              <div className={`rounded-2xl bg-gradient-to-br ${gradeInfo.bg} border border-slate-700/50 p-5 flex items-center gap-5`}>
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
                    <circle cx="48" cy="48" r="40" fill="none" stroke={gradeInfo.ring} strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 * (1 - percentage / 100)}
                      strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease 0.3s" }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black" style={{ color: gradeInfo.color }}>{gradeInfo.grade}</span>
                    <span className="text-xs text-slate-400">{percentage}%</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-black text-white mb-0.5">{gradeInfo.label}</div>
                  <div className="text-sm text-slate-400 mb-3">{correctCount} of {total} correct</div>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-lg font-black text-emerald-400">{correctCount}</div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wide">Correct</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-rose-400">{total - correctCount}</div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wide">Wrong</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-orange-400">🔥 {maxStreak}</div>
                      <div className="text-[10px] text-slate-600 uppercase tracking-wide">Best Streak</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2.5">Answer Review</h4>
                <div className="space-y-2">
                  {questions.map((question, i) => {
                    const wasCorrect = results[i] ?? false;
                    return (
                      <div key={question.id} className={`px-3.5 py-3 rounded-xl border ${wasCorrect ? "bg-emerald-500/5 border-emerald-500/15" : "bg-rose-500/5 border-rose-500/15"}`}>
                        <div className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5 ${wasCorrect ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
                            {wasCorrect ? "✓" : "✗"}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm text-slate-200 leading-snug mb-1">{question.question}</p>
                            <p className="text-xs text-emerald-400 font-medium">✓ {question.options[question.correct]}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={reset}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg">
                  <FaRedo size={11} /> Retake Quiz
                </button>
                <button onClick={onClose}
                  className="px-6 py-2.5 bg-slate-700/80 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-sm transition-colors cursor-pointer">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
