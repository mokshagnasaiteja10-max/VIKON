"use client";

import React, { useState } from "react";
import { Star, X, CheckCircle2, AlertCircle, PenTool } from "lucide-react";

export default function ReviewSubmitButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Form fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  
  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
    setStatus("idle");
    setFullName("");
    setPhone("");
    setEmail("");
    setRole("");
    setRating(5);
    setComment("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !comment) return;

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const formattedMessage = `Star Rating: ${rating}/5\nRole/Designation: ${role || "Customer"}\n\nReview:\n"${comment}"`;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          email,
          service: "Customer Review",
          message: formattedMessage
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit review. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold rounded-lg text-sm transition-all shadow-md active:scale-95 cursor-pointer"
      >
        <PenTool className="h-4 w-4" />
        Leave Us a Review
      </button>

      {/* Backdrop/Modal portal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 shrink-0">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <PenTool className="h-5 w-5 text-blue-600" />
                Submit Your Review
              </h3>
              <button 
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content Form */}
            <div className="p-6 overflow-y-auto flex-1">
              {status === "success" ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
                  <h4 className="text-xl font-bold font-display text-slate-900 dark:text-white">Review Submitted!</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for sharing your experience. To protect website integrity, new testimonials are reviewed by our administration before they are displayed. Your feedback is highly appreciated!
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white hover:text-slate-950 font-bold rounded-lg text-sm transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Have you booked a flat, purchased a home, or done joint-venture pile construction work with us? We'd love to hear your feedback.
                  </p>

                  {/* Star Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Overall Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isStarred = hoverRating !== null ? starVal <= hoverRating : starVal <= rating;
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setRating(starVal)}
                            onMouseEnter={() => setHoverRating(starVal)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-1 text-slate-200 dark:text-slate-800 transition-colors focus:outline-none"
                          >
                            <Star 
                              className={`h-7 w-7 transition-all ${
                                isStarred 
                                  ? "text-emerald-500 fill-emerald-500 scale-110" 
                                  : "text-slate-200 dark:text-slate-700 hover:scale-105"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                      />
                    </div>

                    {/* Role / Context */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Who are you? (Role)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Landowner, Flat Owner"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="Optional"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Your Review *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your experience with our construction quality, piling depth, timeline adherence, or customer care..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/55 p-3 rounded-lg">
                      <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-350 text-slate-950 font-bold rounded-lg text-sm flex items-center justify-center transition-colors shadow-md cursor-pointer"
                  >
                    {isSubmitting ? "Submitting review..." : "Submit Review for Moderation"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
