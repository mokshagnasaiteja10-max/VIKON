"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Briefcase, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Loader, 
  MapPin, 
  Calendar, 
  Save, 
  Undo
} from "lucide-react";
import { Project } from "@/types";

function AdminProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [view, setView] = useState<"list" | "form">("list");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formId, setFormId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<any>("Ongoing Apartments");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [imagesInput, setImagesInput] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString().split("T")[0]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError("Failed to fetch projects list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchParams.get("add") === "true") {
      resetForm();
      setView("form");
      setIsEditing(false);
      router.replace("/admin/projects");
    }
  }, [searchParams, router]);

  const resetForm = () => {
    setFormId("");
    setName("");
    setType("Ongoing Apartments");
    setLocation("");
    setDescription("");
    setFeaturesInput("Bored pile foundation, RCC columns framed structure, Brick work phase");
    setImagesInput("/images/pile_construction.png");
    setCreatedAt(new Date().toISOString().split("T")[0]);
  };

  const handleEditClick = (proj: Project) => {
    setFormId(proj.id);
    setName(proj.name);
    setType(proj.type);
    setLocation(proj.location);
    setDescription(proj.description);
    setFeaturesInput(proj.features.join(", "));
    setImagesInput(proj.images.join(", "));
    setCreatedAt(new Date(proj.created_at).toISOString().split("T")[0]);

    setIsEditing(true);
    setView("form");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This will remove it from the showcase portfolio.")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      alert("Error deleting project");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;

    setIsSubmitting(true);

    const features = featuresInput.split(",").map(s => s.trim()).filter(Boolean);
    const images = imagesInput.split(",").map(s => s.trim()).filter(Boolean);

    const projId = isEditing ? formId : name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const projectPayload: Project = {
      id: projId,
      name,
      type,
      location,
      description,
      features,
      images: images.length > 0 ? images : ["/images/pile_construction.png"],
      created_at: new Date(createdAt).toISOString()
    };

    try {
      const url = isEditing ? `/api/projects/${projId}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectPayload)
      });

      if (res.ok) {
        await fetchProjects();
        setView("list");
        resetForm();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to save project");
      }
    } catch (err) {
      alert("Error saving project details");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 text-xs">Querying project registry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Portfolio Construction Registry</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage your corporate showcase and completed/ongoing apartments.
          </p>
        </div>
        {view === "list" ? (
          <button
            onClick={() => { resetForm(); setIsEditing(false); setView("form"); }}
            className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors"
          >
            <Plus className="h-4.5 w-4.5 mr-1.5" />
            Add Project
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
          {projects.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-xs">
              No projects registered in your showcase. Click &ldquo;Add Project&rdquo; to begin.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {projects.map((project) => (
                <div key={project.id} className="p-6 hover:bg-slate-850/40 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Info */}
                  <div className="flex items-start gap-4">
                    {project.images[0] && (
                      <div 
                        className="h-16 w-16 bg-cover bg-center rounded-lg border border-slate-800 shrink-0 mt-1"
                        style={{ backgroundImage: `url('${project.images[0]}')` }}
                      />
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200 text-sm sm:text-base">{project.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-emerald-500 border border-slate-750 text-[9px] font-bold uppercase tracking-wider">
                          {project.type}
                        </span>
                      </div>
                      
                      <p className="flex items-center text-xs text-slate-400">
                        <MapPin className="h-3 w-3 text-blue-600 mr-1.5 shrink-0" />
                        {project.location}
                      </p>

                      <p className="flex items-center text-[10px] text-slate-500">
                        <Calendar className="h-3 w-3 text-slate-550 mr-1.5 shrink-0" />
                        Created: {new Date(project.created_at).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full lg:w-auto shrink-0 justify-end">
                    <button
                      onClick={() => handleEditClick(project)}
                      className="p-2 border border-slate-850 hover:border-blue-600 bg-slate-950/60 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold px-3 py-2"
                    >
                      <Edit3 className="h-4 w-4 text-blue-600" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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
            {isEditing ? `Edit Project: ${name}` : "Add Portfolio Project"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Project Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Project Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikon Towers"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Location *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Asr Nagar, Bhimavaram"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Project Type */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Project Classification *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              >
                <option value="Ongoing Apartments">Ongoing Apartments</option>
                <option value="Completed Apartments">Completed Apartments</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Launch / Completion Date *
              </label>
              <input
                type="date"
                required
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Project Case Description *
            </label>
            <textarea
              rows={5}
              required
              placeholder="Outline the details of the site build (sqft size, flooring, materials, safety foundations, pile configurations)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Features */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Project Key Specs / Highlights (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="20m deep pile cap foundation, 30 flats total, 6 passenger elevator"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>

            {/* Images */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Project Showcase Images (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="/images/pile_construction.png, https://images.unsplash.com/..."
                value={imagesInput}
                onChange={(e) => setImagesInput(e.target.value)}
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
              {isSubmitting ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function AdminProjectsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading projects form...</div>}>
      <AdminProjectsContent />
    </Suspense>
  );
}
