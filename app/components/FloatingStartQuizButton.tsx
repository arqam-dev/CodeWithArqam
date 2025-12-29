"use client";

import { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import QuizModal from "./QuizModal";

interface FloatingStartQuizButtonProps {
  conceptName: string;
}

export default function FloatingStartQuizButton({ conceptName }: FloatingStartQuizButtonProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasQuiz, setHasQuiz] = useState<boolean | null>(null);

  // Check if quiz exists on mount
  useEffect(() => {
    const checkQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz/${conceptName}`);
        if (response.ok) {
          setHasQuiz(true);
        } else {
          setHasQuiz(false);
        }
      } catch (error) {
        setHasQuiz(false);
      }
    };
    checkQuiz();
  }, [conceptName]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quiz/${conceptName}`);
      if (response.ok) {
        const data = await response.json();
        setQuizData(data);
        setShowQuiz(true);
      } else {
        console.log("No quiz available for this concept");
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  // Don't render if no quiz exists
  if (hasQuiz === false) {
    return null;
  }

  return (
    <>
      {/* Floating Start Quiz Button */}
      <button
        onClick={loadQuiz}
        disabled={loading || hasQuiz === null}
        className="group relative"
        aria-label="Start Quiz"
      >
        <div className="relative">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

          {/* Main button */}
          <div className="relative px-5 py-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-2 border-white/20 backdrop-blur-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <FaGraduationCap className="text-green-200" size={16} />
            <span className="hidden sm:inline">{loading ? "Loading..." : "Start Quiz"}</span>
            <span className="sm:hidden">{loading ? "..." : "Quiz"}</span>
          </div>
        </div>
      </button>

      {showQuiz && quizData && (
        <QuizModal
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          quizData={quizData}
        />
      )}
    </>
  );
}

