"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Home, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Loader, 
  MapPin, 
  Ruler, 
  Bed, 
  Save, 
  Undo,
  Sparkles
} from "lucide-react";
import { Property } from "@/types";
import ImageUploader from "@/components/admin/ImageUploader";

function AdminPropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // View states: 'list' | 'form'
  const [view, setView] = useState<"list" | "form">("list");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [formId, setFormId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Apartment");
  const [status, setStatus] = useState<"Ready to Move" | "Under Construction">("Ready to Move");
  const [areaSqft, setAreaSqft] = useState(1200);
  const [price, setPrice] = useState("₹45 Lakhs");
  const [bhk, setBhk] = useState(2);
  const [description, setDescription] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [imagesInput, setImagesInput] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/properties");
      const data = await res.json();
      setProperties(data.properties || []);
    } catch (err) {
      setError("Failed to fetch property list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle URL triggering Add Form (from dashboard quick link)
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      resetForm();
      setView("form");
      setIsEditing(false);
      // Clean up search query param to avoid re-triggering
      router.replace("/admin/properties");
    }
  }, [searchParams, router]);

  const resetForm = () => {
    setFormId("");
    setName("");
    setLocation("");
    setType("Apartment");
    setStatus("Ready to Move");
    setAreaSqft(1200);
    setPrice("₹45 Lakhs");
    setBhk(2);
    setDescription("");
    setFeaturesInput("100% Vaastu Compliant, Reserved Car Parking, Power Backup");
    setImagesInput("/images/hero_bg.png");
  };

  const handleEditClick = (prop: Property) => {
    setFormId(prop.id);
    setName(prop.name);
    setLocation(prop.location);
    setType(prop.type);
    setStatus(prop.status);
    setAreaSqft(prop.area_sqft);
    setPrice(prop.price || "");
    setBhk(prop.bhk);
    setDescription(prop.description);
    setFeaturesInput(prop.features.join(", "));
    setImagesInput(prop.images.join(", "));
    
    setIsEditing(true);
    setView("form");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property listing? This cannot be undone.")) return;
    
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
      } else {
        alert("Failed to delete listing");
      }
    } catch (err) {
      alert("Error deleting listing");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) return;

    setIsSubmitting(true);
    
    // Process comma separated lists
    const features = featuresInput.split(",").map(s => s.trim()).filter(Boolean);
    const images = imagesInput.split(",").map(s => s.trim()).filter(Boolean);
    
    // Generate id if adding
    const propId = isEditing ? formId : name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const propertyPayload: Property = {
      id: propId,
      name,
      location,
      type,
      status,
      area_sqft: Number(areaSqft),
      price,
      bhk: Number(bhk),
      description,
      features,
      images: images.length > 0 ? images : ["/images/hero_bg.png"]
    };

    try {
      const url = isEditing ? `/api/properties/${propId}` : "/api/properties";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyPayload)
      });

      if (res.ok) {
        await fetchProperties();
        setView("list");
        resetForm();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to save property listing");
      }
    } catch (err) {
      alert("Network error occurred while saving property");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 text-xs">Querying properties inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Properties Inventory</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage your public 2 BHK and 3 BHK apartment listings.
          </p>
        </div>
        {view === "list" ? (
          <button
            onClick={() => { resetForm(); setIsEditing(false); setView("form"); }}
            className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-colors"
          >
            <Plus className="h-4.5 w-4.5 mr-1.5" />
            Add Property
          </button>
        ) : (
          <button
            onClick={() => { setView("list"); }}
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
          {properties.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-xs">
              No properties found in your catalog. Click &ldquo;Add Property&rdquo; to begin.
            </div>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {properties.map((property) => (
                <div key={property.id} className="p-6 hover:bg-slate-850/40 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Left Info */}
                  <div className="flex items-start gap-4">
                    {property.images[0] && (
                      <div 
                        className="h-16 w-16 bg-cover bg-center rounded-lg border border-slate-800 shrink-0 mt-1"
                        style={{ backgroundImage: `url('${property.images[0]}')` }}
                      />
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200 text-sm sm:text-base">{property.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          property.status === "Ready to Move" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                        }`}>
                          {property.status}
                        </span>
                      </div>
                      <p className="flex items-center text-xs text-slate-400">
                        <MapPin className="h-3 w-3 text-blue-600 mr-1 shrink-0" />
                        {property.location}
                      </p>
                      
                      {/* Specs */}
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center"><Bed className="h-3.5 w-3.5 text-blue-600 mr-1.5" />{property.bhk} BHK</span>
                        <span className="flex items-center"><Ruler className="h-3.5 w-3.5 text-blue-600 mr-1.5" />{property.area_sqft} SqFt</span>
                        <span className="font-bold text-slate-350">{property.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full lg:w-auto shrink-0 justify-end">
                    <button
                      onClick={() => handleEditClick(property)}
                      className="p-2 border border-slate-850 hover:border-blue-600 bg-slate-950/60 text-slate-400 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold px-3 py-2"
                    >
                      <Edit3 className="h-4 w-4 text-blue-600" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
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

      {/* --- FORM VIEW (ADD / EDIT) --- */}
      {view === "form" && (
        <form onSubmit={handleFormSubmit} className="bg-slate-900 border border-slate-800/80 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
            {isEditing ? `Edit: ${name}` : "Create New Property Listing"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Property Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Property / Building Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Apartments Block B"
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
                placeholder="e.g. Rayalam Road, Bhimavaram"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {/* BHK count */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Bedroom Layout (BHK) *
              </label>
              <input
                type="number"
                required
                min={1}
                max={6}
                value={bhk}
                onChange={(e) => setBhk(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>

            {/* Area Sqft */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Builtup Area (Sq. Ft.) *
              </label>
              <input
                type="number"
                required
                min={100}
                value={areaSqft}
                onChange={(e) => setAreaSqft(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>

            {/* Price Label */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Price / Starting Price *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₹48 Lakhs"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>

            {/* Availability Status */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Construction Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Listing Description *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Provide a compelling description of amenities, distance to railway station, hospitals, flooring quality..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Features (Comma Separated) */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Features & Amenities (Comma Separated)
              </label>
              <input
                type="text"
                placeholder="100% Vaastu Compliant, Gated Security, Generator, Power Backup"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
              <p className="text-[10px] text-slate-500">Separate specifications with commas (e.g. East Facing Door, Reserved Parking)</p>
            </div>

            {/* Images (Comma Separated) */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Image URLs (Comma Separated)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-3">
                  <input
                    type="text"
                    placeholder="/images/hero_bg.png, https://images.unsplash.com/..."
                    value={imagesInput}
                    onChange={(e) => setImagesInput(e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
                  />
                </div>
                <div className="md:col-span-1">
                  <ImageUploader 
                    onUploadSuccess={(url) => {
                      const current = imagesInput.trim();
                      if (current) {
                        setImagesInput(`${current}, ${url}`);
                      } else {
                        setImagesInput(url);
                      }
                    }} 
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500">Add absolute image links or local asset paths. Separate multiple links with commas.</p>
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
              {isSubmitting ? "Saving..." : "Save Listing"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function AdminPropertiesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading properties form...</div>}>
      <AdminPropertiesContent />
    </Suspense>
  );
}
