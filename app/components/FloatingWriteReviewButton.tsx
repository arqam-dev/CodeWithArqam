"use client";

import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import ReviewsSection from "./ReviewsSection";

export default function FloatingWriteReviewButton() {
  const [showReviewDrawer, setShowReviewDrawer] = useState(false);

  return (
    <>
      {/* Floating Write Review Button */}
      <button
        onClick={() => setShowReviewDrawer(true)}
        className="group relative"
        aria-label="Write a Review"
      >
        <div className="relative">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

          {/* Main button */}
          <div className="relative px-5 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
            <FaStar className="text-yellow-200" size={16} />
            <span className="hidden sm:inline">Write a Review</span>
            <span className="sm:hidden">Review</span>
          </div>
        </div>
      </button>

      {/* Review Drawer - Only show the drawer part */}
      {showReviewDrawer && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity duration-300"
            onClick={() => setShowReviewDrawer(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <ReviewsSection 
              onClose={() => setShowReviewDrawer(false)}
              showOnlyForm={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

