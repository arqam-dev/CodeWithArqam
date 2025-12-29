"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";

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

export default function QuizModal({ isOpen, onClose, quizData }: QuizModalProps) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Reset when modal closes
      setAnswers({});
      setShowResults(false);
      setScore(0);
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const submitQuiz = () => {
    let correctCount = 0;
    quizData.questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: modalContentRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const correctAnswers = showResults ? Object.keys(answers).filter(
    key => answers[parseInt(key)] === quizData.questions.find(q => q.id === parseInt(key))?.correct
  ).length : 0;
  const wrongAnswers = showResults ? Object.keys(answers).filter(
    key => answers[parseInt(key)] !== quizData.questions.find(q => q.id === parseInt(key))?.correct
  ).length : 0;
  const unanswered = quizData.questions.length - Object.keys(answers).length;
  const percentage = showResults ? Math.round((score / quizData.questions.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        ref={modalContentRef}
        className="fixed inset-0 bg-white dark:bg-slate-800 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center z-10 shadow-sm relative">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white pr-12">{quizData.title}</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-full transition-all cursor-pointer border-2 border-transparent hover:border-red-300 dark:hover:border-red-700 z-20"
            aria-label="Close modal"
            title="Close Quiz"
          >
            <FaTimes size={26} className="font-bold" />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {!showResults ? (
            <>
              <div className="mb-6 text-center">
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Answer all {quizData.questions.length} question{quizData.questions.length > 1 ? 's' : ''} and submit to see your score!
                </p>
              </div>

              <div className="space-y-6">
                {quizData.questions.map((q, index) => (
                  <div key={q.id} className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg shadow-md border-l-4 border-indigo-400 dark:border-indigo-600">
                    <span className="inline-block bg-indigo-500 dark:bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
                      Question {index + 1} of {quizData.questions.length}
                    </span>
                    <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                      {q.question}
                    </div>
                    <div className="space-y-3">
                      {q.options.map((option, optIndex) => {
                        const isSelected = answers[q.id] === optIndex;
                        const isCorrect = optIndex === q.correct;
                        const isWrong = isSelected && !isCorrect;
                        let className = "flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ";
                        
                        if (showResults) {
                          if (isCorrect) {
                            className += "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200";
                          } else if (isWrong) {
                            className += "bg-rose-100 dark:bg-rose-900/30 border-rose-400 dark:border-rose-600 text-rose-900 dark:text-rose-200";
                          } else {
                            className += "bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600";
                          }
                        } else {
                          className += isSelected
                            ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-400 dark:border-indigo-600"
                            : "bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20";
                        }

                        return (
                          <label
                            key={optIndex}
                            className={className}
                          >
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              value={optIndex}
                              checked={isSelected}
                              onChange={() => handleAnswerChange(q.id, optIndex)}
                              disabled={showResults}
                              className="mr-3 w-5 h-5 cursor-pointer"
                            />
                            <span className="text-slate-900 dark:text-slate-100">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={submitQuiz}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Submit Quiz
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 text-white p-8 rounded-lg mb-6 shadow-lg">
                  <h3 className="text-4xl font-bold mb-2">Your Score: {score} / {quizData.questions.length}</h3>
                  <p className="text-xl mb-2 text-slate-200">Percentage: {percentage}%</p>
                  <p className="text-lg text-slate-200">
                    {percentage >= 80 ? '🎉 Excellent!' : percentage >= 60 ? '👍 Good job!' : '📚 Keep learning!'}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <span className="text-3xl font-bold text-teal-600 dark:text-teal-400 block">{correctAnswers}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 mt-2 block">Correct</span>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <span className="text-3xl font-bold text-slate-500 dark:text-slate-400 block">{wrongAnswers}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 mt-2 block">Wrong</span>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <span className="text-3xl font-bold text-slate-500 dark:text-slate-400 block">{unanswered}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 mt-2 block">Unanswered</span>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 block">{percentage}%</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 mt-2 block">Accuracy</span>
                  </div>
                </div>

                {/* Questions with Answers Highlighted */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 text-center">Answer Review</h4>
                  <div className="space-y-6">
                    {quizData.questions.map((q, index) => {
                      const userAnswer = answers[q.id];
                      const isCorrect = userAnswer === q.correct;
                      const isUnanswered = userAnswer === undefined;
                      const isWrong = userAnswer !== undefined && userAnswer !== q.correct;
                      
                      return (
                        <div key={q.id} className={`p-6 rounded-lg shadow-md border-l-4 ${
                          isCorrect
                            ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-300 dark:border-teal-700'
                            : (isWrong || isUnanswered)
                            ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-400 dark:border-rose-600'
                            : 'bg-slate-100 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600'
                        }`}>
                          <span className="inline-block bg-indigo-500 dark:bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
                            Question {index + 1} of {quizData.questions.length}
                          </span>
                          <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                            {q.question}
                          </div>
                          {isUnanswered && (
                            <div className="mb-4 p-3 bg-rose-100 dark:bg-rose-900/30 border-2 border-rose-400 dark:border-rose-600 rounded-lg text-rose-900 dark:text-rose-200 font-semibold">
                              ⚠️ This question was not answered
                            </div>
                          )}
                          <div className="space-y-3">
                            {q.options.map((option, optIndex) => {
                              const isSelected = userAnswer === optIndex;
                              const isCorrectOption = optIndex === q.correct;
                              const isWrongOption = isSelected && !isCorrectOption;
                              let optionClassName = "flex items-center p-3 rounded-lg border-2 ";
                              
                              if (isCorrectOption) {
                                optionClassName += "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200";
                              } else if (isWrongOption) {
                                optionClassName += "bg-rose-100 dark:bg-rose-900/30 border-rose-400 dark:border-rose-600 text-rose-900 dark:text-rose-200";
                              } else if (isUnanswered && isCorrectOption) {
                                // Show correct answer in red border if question was unanswered
                                optionClassName += "bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-500 border-dashed text-rose-800 dark:text-rose-200";
                              } else {
                                optionClassName += "bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600";
                              }

                              return (
                                <div key={optIndex} className={optionClassName}>
                                  <input
                                    type="radio"
                                    name={`question-${q.id}-result`}
                                    checked={isSelected}
                                    disabled
                                    className="mr-3 w-5 h-5"
                                  />
                                  <span>{option}</span>
                                  {isCorrectOption && <span className="ml-auto text-emerald-700 dark:text-emerald-300 font-semibold">✓ Correct Answer</span>}
                                  {isWrongOption && <span className="ml-auto text-rose-700 dark:text-rose-300 font-semibold">✗ Wrong Answer</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Scroll Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
          <button
            onClick={scrollToTop}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            aria-label="Scroll to top"
            title="Scroll to Top"
          >
            <FaArrowUp size={20} />
          </button>
          <button
            onClick={scrollToBottom}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            aria-label="Scroll to bottom"
            title="Scroll to Bottom"
          >
            <FaArrowDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

