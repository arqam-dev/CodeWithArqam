"use client";

import { useState, useEffect } from "react";
import { FaStar, FaUser, FaEnvelope, FaSpinner, FaTimes, FaChevronLeft } from "react-icons/fa";

interface Review {
  name: string;
  email: string;
  rating: number;
  comment: string;
  timestamp?: string;
}

interface ReviewsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewsDrawer({ isOpen, onClose }: ReviewsDrawerProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reviews/fetch");
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-300 dark:text-slate-600"
            }`}
            size={16}
          />
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Close drawer"
            >
              <FaChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All Reviews</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Reviews List - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-blue-600 dark:text-blue-400" size={32} />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-slate-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No reviews yet</h3>
              <p className="text-slate-600 dark:text-slate-400">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        <FaUser size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 dark:text-white truncate">{review.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1 truncate">
                          <FaEnvelope size={10} />
                          <span className="truncate">{review.email}</span>
                        </p>
                      </div>
                    </div>
                    {review.timestamp && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 ml-2 flex-shrink-0">
                        {new Date(review.timestamp).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">{renderStars(review.rating)}</div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with stats */}
        {reviews.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-4 bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Average Rating:</span>
                  <span className="ml-2 font-semibold text-slate-900 dark:text-white">
                    {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400">Total Reviews:</span>
                  <span className="ml-2 font-semibold text-slate-900 dark:text-white">{reviews.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

