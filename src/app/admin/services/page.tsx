"use client";

import React, { useState, useEffect } from "react";
import { 
  ListCollapse, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Loader, 
  Save, 
  Undo,
  Check
} from "lucide-react";
import { SiteSettings, Service } from "@/types";

export default function AdminServicesCMS() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [view, setView] = useState<"list" | "form">("list");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formId, setFormId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings(data.settings || null);
    } catch (err) {
      setError("Failed to fetch site settings content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const resetForm = () => {
    setFormId("");
    setTitle("");
    setDescription("");
    setFeaturesInput("Vaastu compliant, Material certification, Handovers scheduled");
    setImageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80");
  };

  const handleEditClick = (service: Service) => {
    setFormId(service.id);
    setTitle(service.title);
    setDescription(service.description);
    setFeaturesInput(service.features.join(", "));
    setImageUrl(service.imageUrl);

    setIsEditing(true);
    setView("form");
  };

  const handleDelete = async (id: string) => {
    if (!settings) return;
    if (!confirm("Are you sure you want to delete this service option? This will update your services page layout.")) return;

    const updatedServices = settings.services.filter((s) => s.id !== id);
    const updatedSettings = { ...settings, services: updatedServices };

    try {
      setLoading(true);
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings)
      });

      if (res.ok) {
        setSettings(updatedSettings);
      } else {
        alert("Failed to delete service");
      }
    } catch (err) {
      alert("Error deleting service");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || !title || !description) return;

    setIsSubmitting(true);

    const features = featuresInput.split(",").map((s) => s.trim()).filter(Boolean);
    const serviceId = isEditing ? formId : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newService: Service = {
      id: serviceId,
      title,
      description,
      features,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    };

    let updatedServices = [...settings.services];
    if (isEditing) {
      const idx = updatedServices.findIndex((s) => s.id === formId);
      if (idx >= 0) updatedServices[idx] = newService;
    } else {
      updatedServices.push(newService);
    }

    const updatedSettings = { ...settings, services: updatedServices };

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings)
      });

      if (res.ok) {
        setSettings(updatedSettings);
        setView("list");
        resetForm();
      } else {
        alert("Failed to save services config");
      }
    } catch (err) {
      alert("Error saving services");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 text-xs">Querying services schemas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Services Configuration (CMS)</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Configure construction services shown on the public website.
          </p>
        </div>
        {view === "list" ? (
          <button
            onClick={() => { resetForm(); setIsEditing(false); setView("form"); }}
            className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors"
          >
            <Plus className="h-4.5 w-4.5 mr-1.5" />
            Add Service
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
        <div className="bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
          {settings.services.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-xs">
              No services configured. Click &ldquo;Add Service&rdquo; to begin.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {settings.services.map((service) => (
                <div key={service.id} className="p-6 hover:bg-slate-850/40 transition-colors flex flex-col lg:flex-row items-start justify-between gap-6">
                  {/* Left Info */}
                  <div className="flex items-start gap-4">
                    {service.imageUrl && (
                      <div 
                        className="h-16 w-16 bg-cover bg-center rounded-lg border border-slate-850 shrink-0 mt-1"
                        style={{ backgroundImage: `url('${service.imageUrl}')` }}
                      />
                    )}
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-200 text-sm sm:text-base">{service.title}</h4>
                      <p className="text-slate-450 text-xs leading-relaxed max-w-xl line-clamp-2">
                        {service.description}
                      </p>
                      
                      {/* Specs */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {service.features.map((feat, fIdx) => (
                          <span 
                            key={fIdx} 
                            className="px-2 py-0.5 bg-slate-950 text-slate-450 border border-slate-850 rounded text-[9px] font-semibold flex items-center"
                          >
                            <Check className="h-2.5 w-2.5 text-blue-600 mr-1" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full lg:w-auto shrink-0 justify-end">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="p-2 border border-slate-850 hover:border-blue-600 bg-slate-950/60 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold px-3 py-2"
                    >
                      <Edit3 className="h-4 w-4 text-blue-600" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 border border-slate-850 hover:border-rose-600 bg-slate-950/60 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold px-3 py-2"
                    >
                      <Trash2 className="h-4 w-4 text-rose-500" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- FORM VIEW --- */}
      {view === "form" && (
        <form onSubmit={handleFormSubmit} className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
            {isEditing ? `Edit Service: ${title}` : "Create Construction Offering"}
          </h3>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Service Offering Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Turnkey Civil Construction"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Service Scope / Description *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Detail what is covered under this construction division..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Features */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Core Deliverables / Bullets (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="100% Vaastu Compliance layout, Raw material verification sheets, On-site cameras"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Illustrative Image URL
              </label>
              <input
                type="text"
                placeholder="/images/hero_bg.png or Unsplash image link"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>
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
              {isSubmitting ? "Saving Scope..." : "Save Offering"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
