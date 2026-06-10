"use client";

import React, { useState, useEffect } from "react";
import { 
  Quote, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Loader, 
  Star, 
  Save, 
  Undo
} from "lucide-react";
import { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [view, setView] = useState<"list" | "form">("list");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formId, setFormId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      setError("Failed to query testimonials catalog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const resetForm = () => {
    setFormId("");
    setName("");
    setRole("");
    setQuote("");
    setRating(5);
  };

  const handleEditClick = (testi: Testimonial) => {
    setFormId(testi.id);
    setName(testi.author_name);
    setRole(testi.role);
    setQuote(testi.quote);
    setRating(testi.rating);

    setIsEditing(true);
    setView("form");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client quote? This will remove it from the testimonials page.")) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
      } else {
        alert("Failed to delete review");
      }
    } catch (err) {
      alert("Error deleting review");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return;

    setIsSubmitting(true);

    const testId = isEditing ? formId : "testi-" + Date.now();

    const testimonialPayload: Testimonial = {
      id: testId,
      author_name: name,
      role,
      quote,
      rating: Number(rating),
      created_at: new Date().toISOString()
    };

    try {
      const url = isEditing ? `/api/testimonials/${testId}` : "/api/testimonials";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialPayload)
      });

      if (res.ok) {
        await fetchTestimonials();
        setView("list");
        resetForm();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to save testimonial");
      }
    } catch (err) {
      alert("Error saving testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 text-xs">Querying reviews catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Client Reviews</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage public testimonials and structural safety quotes.
          </p>
        </div>
        {view === "list" ? (
          <button
            onClick={() => { resetForm(); setIsEditing(false); setView("form"); }}
            className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors"
          >
            <Plus className="h-4.5 w-4.5 mr-1.5" />
            Add Review
          </button>
        ) : (
          <button
            onClick={() => setView("list")}
            className="inline-flex items-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors"
          >
            <Undo className="h-4.5 w-4.5 mr-1.5" />
            Cancel Form
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs text-rose-500">
          {error}
        </div>
      )}

      {/* --- LIST VIEW --- */}
      {view === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.length === 0 ? (
            <div className="md:col-span-2 py-20 bg-slate-900 border border-slate-800/80 rounded-xl text-center text-slate-500 text-xs">
              No testimonials registered. Click &ldquo;Add Review&rdquo; to begin.
            </div>
          ) : (
            testimonials.map((testi) => (
              <div 
                key={testi.id} 
                className="bg-slate-900 border border-slate-800/85 rounded-xl p-6 flex flex-col justify-between shadow-sm relative"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < testi.rating ? "fill-current" : "text-slate-800"}`} />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm italic mb-6 leading-relaxed">
                    &ldquo;{testi.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-2">
                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm font-display">{testi.author_name}</h4>
                    <p className="text-[10px] text-slate-500">{testi.role}</p>
                  </div>
                  
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => handleEditClick(testi)}
                      className="p-1.5 border border-slate-850 hover:border-blue-600 bg-slate-950/60 text-slate-400 hover:text-white rounded-lg transition-colors"
                      title="Edit Review"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(testi.id)}
                      className="p-1.5 border border-slate-850 hover:border-rose-600 bg-slate-950/60 text-slate-400 hover:text-white rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="h-4 w-4 text-rose-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* --- FORM VIEW --- */}
      {view === "form" && (
        <form onSubmit={handleFormSubmit} className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
            {isEditing ? `Edit Review: ${name}` : "Register New Testimonial"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Client / Partner Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. G. Satyanarayana Murthy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>

            {/* Rating */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Star Rating *
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              >
                <option value={5}>5 Stars (Excellent)</option>
                <option value={4}>4 Stars (Good)</option>
                <option value={3}>3 Stars (Average)</option>
                <option value={2}>2 Stars (Poor)</option>
                <option value={1}>1 Star (Critical)</option>
              </select>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Client Role / Profile Tag *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Flat Owner at Sri Sai Ram Residency or Retired Bank Manager"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
            />
          </div>

          {/* Quote */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Testimonial Quote *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Enter client quote text..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200 resize-y"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setView("list")}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
            >
              <Save className="h-4.5 w-4.5 mr-2" />
              {isSubmitting ? "Saving..." : "Save Testimonial"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
