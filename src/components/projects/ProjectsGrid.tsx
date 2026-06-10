"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Project } from "@/types";

interface ProjectsGridProps {
  initialProjects: Project[];
}

type FilterType = "All" | "Ongoing Apartments" | "Completed Apartments";

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filterOptions: FilterType[] = ["All", "Ongoing Apartments", "Completed Apartments"];

  const filteredProjects = initialProjects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.type === activeFilter;
  });

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setActiveFilter(option)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeFilter === option
                ? "bg-blue-600 text-slate-950 shadow-md font-bold"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-400 text-base">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-md flex flex-col group hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div 
                className="h-56 w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url('${project.images[0]}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 text-emerald-500 border border-blue-600/30 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {project.type === "Ongoing Apartments" ? "Ongoing" : "Completed"}
                </span>
              </div>

              {/* Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="flex items-center text-xs text-slate-400 mb-4">
                    <MapPin className="h-3.5 w-3.5 text-blue-600 mr-1.5 shrink-0" />
                    {project.location}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>
                
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-xs font-bold text-blue-600 uppercase tracking-wider hover:text-emerald-500 transition-colors mt-auto"
                >
                  View Case Study
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
