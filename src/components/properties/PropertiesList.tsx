"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Ruler, Bed, Layers, Sparkles } from "lucide-react";
import { Property } from "@/types";

interface PropertiesListProps {
  initialProperties: Property[];
}

export default function PropertiesList({ initialProperties }: PropertiesListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBhk, setSelectedBhk] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const filteredProperties = initialProperties.filter((property) => {
    // 1. Text Search (name or location)
    const matchesSearch = 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. BHK Filter
    const matchesBhk = 
      selectedBhk === "All" || 
      property.bhk === parseInt(selectedBhk);

    // 3. Status Filter
    const matchesStatus = 
      selectedStatus === "All" || 
      property.status === selectedStatus;

    return matchesSearch && matchesBhk && matchesStatus;
  });

  return (
    <div className="space-y-10">
      
      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Text Search */}
        <div className="relative md:col-span-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by apartment name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-slate-800 dark:text-slate-100"
          />
        </div>

        {/* BHK Selector */}
        <div className="md:col-span-3">
          <select
            value={selectedBhk}
            onChange={(e) => setSelectedBhk(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-slate-800 dark:text-slate-100"
          >
            <option value="All">All Bedrooms (BHK)</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
          </select>
        </div>

        {/* Status Selector */}
        <div className="md:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-slate-800 dark:text-slate-100"
          >
            <option value="All">All Statuses</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
          </select>
        </div>
      </div>

      {/* Grid List */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-400 text-sm">No properties match your current search options.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/85 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group hover:scale-[1.01]"
            >
              {/* Image & Status Badge */}
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${property.images[0]}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full text-white shadow-sm ${
                  property.status === "Ready to Move" ? "bg-emerald-600" : "bg-amber-600"
                }`}>
                  {property.status}
                </span>
              </div>

              {/* Content details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-blue-600 dark:text-emerald-500 font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="h-3 w-3" />
                    <span>{property.bhk} BHK Premium {property.type}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {property.name}
                  </h3>

                  <p className="flex items-center text-xs text-slate-400 mb-5">
                    <MapPin className="h-3.5 w-3.5 text-blue-600 mr-1.5 shrink-0" />
                    {property.location}
                  </p>

                  {/* Amenities/feature chips (first 3) */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {property.features.slice(0, 3).map((feat, fIdx) => (
                      <span 
                        key={fIdx} 
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[10px] font-medium rounded border border-slate-200 dark:border-slate-900"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom stats and action */}
                <div>
                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-950 text-xs text-slate-400 mb-6">
                    <div className="flex items-center">
                      <Ruler className="h-4 w-4 text-blue-600 mr-2 shrink-0" />
                      <span>{property.area_sqft} Sq. Ft.</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {property.price}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/properties/${property.id}`}
                      className="py-2.5 bg-slate-900 hover:bg-blue-600 text-white hover:text-slate-950 font-bold text-center rounded-lg text-xs transition-all"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/contact?property=${encodeURIComponent(property.name)}`}
                      className="py-2.5 border border-slate-200 dark:border-slate-800 hover:border-blue-600 text-slate-700 dark:text-slate-300 font-bold text-center rounded-lg text-xs hover:bg-slate-50 dark:hover:bg-slate-950 transition-all"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
