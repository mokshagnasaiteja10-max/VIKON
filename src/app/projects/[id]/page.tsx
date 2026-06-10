import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/db-server";
import { MapPin, Calendar, CheckSquare, ArrowLeft } from "lucide-react";

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-slate-50 dark:bg-luxury-bg py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          href="/projects" 
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <span className="inline-block px-3 py-1 bg-blue-600/10 text-emerald-500 border border-blue-600/30 text-[10px] font-bold rounded-full uppercase tracking-wider mb-4">
            {project.type}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mb-4">
            {project.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <span className="flex items-center">
              <MapPin className="h-4.5 w-4.5 text-blue-600 mr-2 shrink-0" />
              {project.location}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4.5 w-4.5 text-blue-600 mr-2 shrink-0" />
              Est. Date: {new Date(project.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Details & description (Left Col) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Visual */}
            <div 
              className="h-80 sm:h-96 w-full bg-cover bg-center rounded-2xl shadow-md border border-slate-200 dark:border-slate-800"
              style={{ backgroundImage: `url('${project.images[0]}')` }}
            />

            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Project Case Study</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {project.description}
              </p>
            </div>
          </div>

          {/* Specifications (Right Col) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                Project Highlights
              </h3>
              
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-350">
                    <CheckSquare className="h-4 w-4 text-blue-600 mr-2.5 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Enquiry Block */}
            <div className="bg-slate-900 border border-slate-850 rounded-xl p-6 text-white text-center space-y-4">
              <h4 className="font-bold font-display text-base">Inquire About This Work</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Interested in similar architecture, layout, or structural piles for your joint venture/plot? Get in touch.
              </p>
              <Link
                href={`/contact?project=${encodeURIComponent(project.name)}`}
                className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold text-center rounded-lg text-xs tracking-wider uppercase transition-colors"
              >
                Send Enquiry
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
