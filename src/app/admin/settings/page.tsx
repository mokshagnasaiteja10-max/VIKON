"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, Loader, RefreshCw } from "lucide-react";
import { SiteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
        setCompanyName(data.settings.companyName);
        setTagline(data.settings.tagline);
        setLogoUrl(data.settings.logoUrl);
        setPhone(data.settings.phone);
        setWhatsapp(data.settings.whatsapp);
        setEmail(data.settings.email);
        setAddress(data.settings.address);
        setHeroTitle(data.settings.heroTitle);
        setHeroSubtitle(data.settings.heroSubtitle);
      }
    } catch (err) {
      setError("Failed to fetch general configuration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsSubmitting(true);
    setSuccess(false);

    const updatedSettings: SiteSettings = {
      ...settings,
      companyName,
      tagline,
      logoUrl,
      phone,
      whatsapp,
      email,
      address,
      heroTitle,
      heroSubtitle
    };

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings)
      });

      if (res.ok) {
        setSettings(updatedSettings);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to update general settings");
      }
    } catch (err) {
      alert("Error saving configurations");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 text-xs">Loading site configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Site Configurations</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Adjust the branding text, phone contacts, email, and hero display headers.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs text-rose-500">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-950/20 border border-emerald-900/45 rounded-xl text-xs text-emerald-400 font-bold">
          Configurations updated successfully! Changes are live on the website.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6">
          <Settings className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-bold font-display text-white">Branding & Contact Info</h3>
        </div>

        {/* Company name & tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Corporate Tagline *
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
            />
          </div>
        </div>

        {/* Contact phone, whatsapp, email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Phone Number *
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              WhatsApp Country+Phone (No Spaces/Symbols) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 919876543210"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
            />
            <p className="text-[9px] text-slate-500">Must start with country code (91 for India), no dashes or spaces.</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Contact Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Physical Office Address *
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
          />
        </div>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 pt-6 mb-6">
          <Settings className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-bold font-display text-white">Hero Intro Setup</h3>
        </div>

        {/* Hero title */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Hero Headline *
          </label>
          <input
            type="text"
            required
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
          />
          <p className="text-[10px] text-slate-550">Include &ldquo;Bhimavaram&rdquo; in the title to enable blue/green text-glow styling.</p>
        </div>

        {/* Hero subtitle */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Hero Sub-Headline / Description *
          </label>
          <textarea
            rows={3}
            required
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={fetchSettings}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
          >
            <Save className="h-4.5 w-4.5 mr-2" />
            {isSubmitting ? "Updating settings..." : "Save Configs"}
          </button>
        </div>
      </form>
    </div>
  );
}
