"use client";

import { useState } from "react";
import { FaGraduationCap, FaChevronRight } from "react-icons/fa";
import QuizModal from "./QuizModal";

interface Props {
  quizData: {
    title: string;
    questions: Array<{ id: number; question: string; options: string[]; correct: number }>;
  };
}

export default function QuizInlineSection({ quizData }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="mt-10 rounded-2xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-500/5 via-indigo-500/3 to-transparent">
        <div className="px-5 py-4 border-b border-blue-500/15 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
            <FaGraduationCap size={17} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-black text-white">Test Your Knowledge</div>
            <div className="text-xs text-slate-500">{quizData.questions.length} questions &middot; 30s each &middot; streak mode</div>
          </div>
          <button onClick={() => setShowModal(true)} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all cursor-pointer shadow-lg shadow-blue-500/20">
            Start Quiz <FaChevronRight size={11} />
          </button>
        </div>
        <div className="px-5 py-4 space-y-2.5">
          {quizData.questions.slice(0, 4).map((q, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500 mt-0.5">{i + 1}</span>
              <span className="text-sm text-slate-500 leading-snug truncate">{q.question}</span>
            </div>
          ))}
          {quizData.questions.length > 4 && (
            <p className="text-xs text-slate-700 pl-7">+ {quizData.questions.length - 4} more questions</p>
          )}
        </div>
        <div className="px-5 pb-4">
          <button onClick={() => setShowModal(true)} className="w-full py-2.5 rounded-xl border border-blue-500/20 text-blue-400 text-sm font-semibold hover:bg-blue-500/10 transition-colors cursor-pointer">
            Take the quiz and test your understanding
          </button>
        </div>
      </div>
      <QuizModal isOpen={showModal} onClose={() => setShowModal(false)} quizData={quizData} />
    </>
  );
}
