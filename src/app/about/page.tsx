import React from "react";
import { getSiteSettings } from "@/lib/db-server";
import { Shield, Award, Users, HardHat, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="bg-slate-50 dark:bg-luxury-bg py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">About Us</h1>
          <p className="text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            Pioneering Quality Construction in West Godavari
          </p>
          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg leading-relaxed">
            For over 15 years, {settings.companyName} has been building homes, corporate hubs, and infrastructure that stand the test of time.
          </p>
        </div>

        {/* Company Story & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Our Journey & Dedication
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Established in Bhimavaram, Sri Balaji Construction started with a simple vision: to construct buildings that landowners and investors can rely on for generations. In the delta region of West Godavari, soil conditions require deep engineering expertise. We recognized early on that foundation strength is paramount, leading us to specialize in deep bored cast-in-situ pile foundations.
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Over the years, we have expanded our services to turnkey individual houses, multi-story apartments, schools, and commercial landmarks. We bring absolute transparency to every project, offering raw material testing sheets, structural engineer approvals, and regular video status reports to our clients.
            </p>
            <div className="border-l-4 border-blue-600 pl-4 py-2 italic text-slate-700 dark:text-slate-350 text-sm">
              &ldquo;We don&apos;t just construct spaces; we carve milestones of trust and engineering excellence in every square foot we build.&rdquo;
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="h-64 bg-cover bg-center rounded-xl shadow-md"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80')` }}
            />
            <div 
              className="h-64 bg-cover bg-center rounded-xl shadow-md mt-6"
              style={{ backgroundImage: `url('/images/pile_construction.png')` }}
            />
            <div 
              className="h-64 bg-cover bg-center rounded-xl shadow-md -mt-6"
              style={{ backgroundImage: `url('/images/hero_bg.png')` }}
            />
            <div 
              className="h-64 bg-cover bg-center rounded-xl shadow-md"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80')` }}
            />
          </div>
        </div>

        {/* Mission, Vision, and Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              To deliver high-grade civil construction services and premium residential assets that prioritize safety, cost-efficiency, and on-time handovers.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">Our Vision</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              To be the most trusted name in real estate development and bored pile contracting across Andhra Pradesh, recognized for quality and integrity.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3">Core Values</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Strict compliance to local municipality standards, structural design honesty, absolute Vaastu compliance, and premium aesthetic layouts.
            </p>
          </div>
        </div>

        {/* Safety & Soil Expertise Section */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/15 text-emerald-500 border border-blue-600/30 mb-4 uppercase tracking-wider">
                <HardHat className="w-3.5 h-3.5" /> Technical Excellence
              </span>
              <h2 className="text-3xl font-bold font-display text-white mb-4">
                Soil Profile Expertise (Delta Clay Soil Focus)
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Bhimavaram, Rayalam, and the wider West Godavari region belong to the Godavari delta block. The upper soil is primarily black cotton or soft alluvial clay, which has poor bearing capacity and high swelling-shrinkage characteristics. 
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-350">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Hydraulic boring rigs for piles up to 20m depth</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Structural load testing & soil stability analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>RCC column reinforcement with FE 550 grade steel</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Water table protection and basement tanking</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl text-center w-full max-w-xs">
                <p className="text-5xl font-extrabold text-blue-600 font-display">100%</p>
                <p className="text-sm font-semibold text-white mt-2">Zero Settlement Incidents</p>
                <p className="text-xs text-slate-500 mt-2">Over 25 apartment complexes constructed safely in clay zones.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Block */}
        <div className="my-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Leadership</h2>
            <p className="text-3xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              Guided by Engineering Integrity
            </p>
            <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-md max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Founder Avatar */}
            <div 
              className="h-80 md:h-full w-full md:col-span-5 bg-cover bg-center min-h-[300px]"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80')` }}
            />
            {/* Founder Summary */}
            <div className="p-8 sm:p-10 md:col-span-7 space-y-4">
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">Founder & Managing Director</span>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Sri K. Ramesh Balaji</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                With over 18 years of technical expertise in civil contracting and soil mechanics, Sri K. Ramesh Balaji leads the architectural and foundation design divisions at Sri Balaji Constructions. Under his guidance, the firm has pioneered safety checks for bored pile concrete capping systems in alluvial delta regions.
              </p>
              <div className="pt-2 italic text-slate-650 dark:text-slate-355 text-xs border-t border-slate-100 dark:border-slate-800">
                &ldquo;Every structure we deliver carries our absolute stamp of soil-stability vetting and structural longevity.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Visual Operations Gallery */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Operations</h2>
            <p className="text-3xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              Visual Operations Showcase
            </p>
            <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm group">
              <div 
                className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('/images/pile_construction.png')` }}
              />
              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Bored Pile Foundation Boring</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Drilling deep cast-in-situ pile shafts up to 20 meters depth into West Godavari soft clay.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm group">
              <div 
                className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80')` }}
              />
              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Concrete Slurry Slump Testing</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Mandatory quality check parameters for concrete fluidity and compressive strength parameters.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm group">
              <div 
                className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url('/images/hero_bg.png')` }}
              />
              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Superstructure RCC Slab Casting</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Framed structures with Fe 550 TMT steel reinforcing bar bindings for earthquake stability.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
