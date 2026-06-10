"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const SERVICES_OPTIONS = [
  "Residential Building Construction",
  "Apartment Construction",
  "Deep Pile Foundation Construction",
  "Commercial Construction",
  "School Building Construction",
  "House Construction (Individual Homes)",
  "Property Buying Enquiry",
  "General Consultation"
];

function ContactFormInner() {
  const searchParams = useSearchParams();
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("General Consultation");
  const [propertyRef, setPropertyRef] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Prefill values from URL search parameters (e.g., from property details or services page)
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const propertyParam = searchParams.get("property");
    const projectParam = searchParams.get("project");

    if (serviceParam) {
      // Find matches in the array
      const matched = SERVICES_OPTIONS.find(
        (opt) => opt.toLowerCase().includes(serviceParam.toLowerCase()) || 
                 serviceParam.toLowerCase().includes(opt.toLowerCase())
      );
      if (matched) setSelectedService(matched);
      else setSelectedService(serviceParam);
    }
    
    if (propertyParam) {
      setPropertyRef(propertyParam);
      setSelectedService("Property Buying Enquiry");
      setMessage(`I would like to receive details and pricing for: ${propertyParam}.`);
    }

    if (projectParam) {
      setSelectedService("General Consultation");
      setMessage(`Inquiry regarding case study: ${projectParam}.`);
    }
  }, [searchParams]);

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
          service: selectedService,
          property_name: propertyRef,
          message
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFullName("");
        setPhone("");
        setEmail("");
        setPropertyRef("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please verify inputs.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900 rounded-2xl p-8 text-center space-y-4">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
        <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Form Submitted Successfully!</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Thank you for reaching out to us. Your requirements have been logged into our leads management portal. Our engineering team will review the details and call you back shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-6 py-2 bg-slate-900 hover:bg-blue-600 text-white hover:text-slate-950 font-bold rounded-lg text-sm transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Kumar"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. +91 99999 88888"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Email Address (Optional)
          </label>
          <input
            type="email"
            placeholder="e.g. ramesh@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Service Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Requested Service *
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
          >
            {SERVICES_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Property Reference */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Property Reference (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g. Sri Sai Ram Residency flat reference"
          value={propertyRef}
          onChange={(e) => setPropertyRef(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Additional Requirements / Message
        </label>
        <textarea
          rows={4}
          placeholder="Describe your project, plot location, dimensions, timeline, or query..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800 dark:text-slate-100 resize-y"
        />
      </div>

      {/* Status Error Display */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-3 rounded-lg">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-350 text-slate-950 font-bold rounded-lg text-sm flex items-center justify-center transition-colors shadow-md"
      >
        {isSubmitting ? (
          <span>Sending enquiry...</span>
        ) : (
          <>
            <Send className="h-4.5 w-4.5 mr-2" />
            <span>Send Enquiry Message</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading form parameters...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
