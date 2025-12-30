"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import InterviewQuestionsModal from "@/app/components/InterviewQuestionsModal";
import { FaSpinner } from "react-icons/fa";

function InterviewQuestionsPageContent() {
  const params = useParams();
  const category = params?.category as string;
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/interview-questions/${category}`);
        
        if (!response.ok) {
          throw new Error("Failed to load interview questions");
        }

        const data = await response.json();
        setContent(data.content);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load interview questions");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-slate-600 dark:text-slate-400">Loading interview questions...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || "Interview questions not found"}</p>
          <a
            href="/content"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Content
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <InterviewQuestionsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          window.history.back();
        }}
        category={category}
        content={content}
      />
    </>
  );
}

export default function InterviewQuestionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    }>
      <InterviewQuestionsPageContent />
    </Suspense>
  );
}

