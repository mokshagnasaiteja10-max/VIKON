import React from "react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/db-server";
import { ArrowRight, Check } from "lucide-react";

export const revalidate = 0;

export default async function ServicesPage() {
  const settings = await getSiteSettings();

  return (
    <div className="bg-slate-50 dark:bg-luxury-bg py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">What We Do</h1>
          <p className="text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            Professional Construction & Engineering Services
          </p>
          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg leading-relaxed">
            From laying deep structural bored piles in soft Godavari delta clay to crafting premium luxury finishes, we deliver turnkey excellence.
          </p>
        </div>

        {/* Services Showcase */}
        <div className="space-y-24">
          {settings.services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={service.id}
                id={service.id}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 scroll-mt-24 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual */}
                <div className="w-full lg:w-1/2">
                  <div 
                    className="h-80 sm:h-96 w-full bg-cover bg-center rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 relative overflow-hidden"
                    style={{ backgroundImage: `url('${service.imageUrl}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Feature Bullets */}
                  <ul className="space-y-3">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                        <span className="h-5 w-5 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 mr-3 shrink-0 mt-0.5">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white hover:text-slate-950 font-bold rounded-lg text-sm transition-all"
                    >
                      Enquire About This Service
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Contracting Banner */}
        <div className="mt-32 p-8 sm:p-12 bg-slate-900 border border-slate-800 rounded-2xl text-center text-white max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08)_0%,transparent_50%)] pointer-events-none" />
          <h3 className="text-2xl font-bold font-display mb-4">Need a Custom Layout or Civil Contracting?</h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 max-w-xl mx-auto">
            We offer structural vetting, municipal plan drawings, and soil testing parameters. Let&apos;s schedule a joint site inspection at your plot in Bhimavaram or regional West Godavari.
          </p>
          <Link
            href="/contact?service=Custom Consultation"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold rounded-lg text-sm shadow-md transition-colors"
          >
            Schedule Free Inspection
          </Link>
        </div>

      </div>
    </div>
  );
}
