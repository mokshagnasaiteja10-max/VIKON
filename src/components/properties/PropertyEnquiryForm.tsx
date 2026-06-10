"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface PropertyEnquiryFormProps {
  propertyName: string;
}

export default function PropertyEnquiryForm({ propertyName }: PropertyEnquiryFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(`Hi, I am interested in inquiring about ${propertyName}. Please share pricing sheets and structural layouts.`);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          email,
          service: "Apartment Construction",
          property_name: propertyName,
          message
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFullName("");
        setPhone("");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl p-6 text-center space-y-3">
        <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
        <h4 className="font-bold text-slate-900 dark:text-white text-base">Enquiry Received!</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Thank you for your interest. Our executive will call you on your registered phone number shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs font-semibold text-blue-600 hover:text-emerald-500 underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-blue-600" />
        <h4 className="font-bold font-display text-slate-900 dark:text-white text-base">Instant Enquiry</h4>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="Mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Email Address (Optional)
          </label>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Message
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 resize-none"
          />
        </div>

        {/* Status Error Display */}
        {status === "error" && (
          <div className="flex items-center gap-2 text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-slate-950 font-bold rounded-lg text-sm flex items-center justify-center transition-colors shadow-md"
        >
          {isSubmitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              <span>Submit Enquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
