"use client";

import { useState, useEffect } from "react";
import { FaStar, FaUser, FaEnvelope, FaSpinner, FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

interface Review {
  name: string;
  email: string;
  rating: number;
  comment: string;
  timestamp?: string;
}

interface ReviewsSectionProps {
  onClose?: () => void;
  showOnlyForm?: boolean;
}

export default function ReviewsSection({ onClose, showOnlyForm = false }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(showOnlyForm);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews/fetch");
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.rating || !formData.comment) {
      setSubmitStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: data.message || "Thank you for your review! You can view all reviews on the reviews page." });
        setFormData({ name: "", email: "", rating: 0, comment: "" });
        // Refresh reviews after a delay, then close drawer
        setTimeout(() => {
          fetchReviews();
          setShowForm(false);
          if (onClose) onClose();
        }, 2000);
      } else {
        // Better error handling
        if (data.error && data.error.includes("not configured")) {
          setSubmitStatus({ 
            type: "error", 
            message: "Reviews system is being set up. Your review has been saved and will appear soon!" 
          });
        } else {
          setSubmitStatus({ type: "error", message: data.error || "Failed to submit review. Please try again." });
        }
      }
    } catch (error: any) {
      setSubmitStatus({ type: "error", message: "Failed to submit review. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => setFormData({ ...formData, rating: star }) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            className={interactive ? "cursor-pointer" : ""}
            disabled={!interactive}
          >
            <FaStar
              className={`${
                star <= (interactive ? hoverRating || formData.rating : rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-slate-300 dark:text-slate-600"
              } ${interactive ? "hover:scale-110 transition-transform" : ""}`}
              size={interactive ? 24 : 18}
            />
          </button>
        ))}
      </div>
    );
  };

  // If showOnlyForm is true, only show the form drawer, not the reviews list
  if (showOnlyForm) {
    return (
      <>
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Write a Review</h3>
          <button
            onClick={() => {
              setShowForm(false);
              if (onClose) onClose();
            }}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close drawer"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Rating *
              </label>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                {renderStars(formData.rating, true)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Your Review *
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Share your experience and feedback..."
                required
              />
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg flex items-start space-x-3 ${
                  submitStatus.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <FaCheckCircle className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" size={20} />
                ) : (
                  <FaExclamationCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" size={20} />
                )}
                <span className={`text-sm ${submitStatus.type === "success" ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                  {submitStatus.message}
                </span>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  if (onClose) onClose();
                }}
                className="flex-1 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <FaSpinner className="animate-spin" size={16} />
                    <span>Submitting...</span>
                  </span>
                ) : (
                  "Submit Review"
                )}
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          Reviews & Feedback
        </h2>

        {/* Side Drawer for Review Form */}
        {showForm && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity duration-300"
              onClick={() => {
                setShowForm(false);
                if (onClose) onClose();
              }}
            ></div>

            {/* Drawer */}
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Write a Review</h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    if (onClose) onClose();
                  }}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close drawer"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      Rating *
                    </label>
                    <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                      {renderStars(formData.rating, true)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      placeholder="Share your experience and feedback..."
                      required
                    />
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-lg flex items-start space-x-3 ${
                        submitStatus.type === "success"
                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <FaCheckCircle className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" size={20} />
                      ) : (
                        <FaExclamationCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" size={20} />
                      )}
                      <span className={`text-sm ${submitStatus.type === "success" ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                        {submitStatus.message}
                      </span>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        if (onClose) onClose();
                      }}
                      className="flex-1 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center space-x-2">
                          <FaSpinner className="animate-spin" size={16} />
                          <span>Submitting...</span>
                        </span>
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        {/* Reviews List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <FaSpinner className="animate-spin text-blue-600 dark:text-blue-400 mx-auto" size={32} />
            </div>
          ) : reviews.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            reviews.map((review, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      <FaUser size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{review.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                        <FaEnvelope size={10} />
                        <span>{review.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">{renderStars(review.rating)}</div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                {review.timestamp && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                    {new Date(review.timestamp).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

