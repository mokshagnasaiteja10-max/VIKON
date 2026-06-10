"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  Briefcase, 
  Quote, 
  UserSquare2, 
  ArrowRight, 
  User, 
  Phone, 
  Mail,
  Loader,
  MessageSquarePlus
} from "lucide-react";
import { Property, Project, Testimonial, Lead } from "@/types";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    properties: 0,
    projects: 0,
    testimonials: 0,
    leads: 0
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError("");
        
        // Parallel fetches
        const [propRes, projRes, testiRes, leadRes] = await Promise.all([
          fetch("/api/properties"),
          fetch("/api/projects"),
          fetch("/api/testimonials"),
          fetch("/api/leads")
        ]);

        const [propData, projData, testiData, leadData] = await Promise.all([
          propRes.json(),
          projRes.json(),
          testiRes.json(),
          leadRes.json()
        ]);

        setMetrics({
          properties: propData.properties?.length || 0,
          projects: projData.projects?.length || 0,
          testimonials: testiData.testimonials?.length || 0,
          leads: leadData.leads?.length || 0
        });

        if (leadData.leads) {
          setRecentLeads(leadData.leads.slice(0, 5));
        }

      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard metrics. Verify database connections.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 text-xs font-medium">Assembling dashboard analytics...</p>
      </div>
    );
  }

  const statCards = [
    { name: "Total Properties", value: metrics.properties, icon: Home, color: "text-amber-500", bg: "bg-amber-500/10", href: "/admin/properties" },
    { name: "Portfolio Projects", value: metrics.projects, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10", href: "/admin/projects" },
    { name: "Testimonials", value: metrics.testimonials, icon: Quote, color: "text-purple-500", bg: "bg-purple-500/10", href: "/admin/testimonials" },
    { name: "Total Leads", value: metrics.leads, icon: UserSquare2, color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/admin/leads" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Console Overview</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor your lead pipeline, property availability list, and portfolio details.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs text-rose-500">
          {error}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link 
              key={card.name} 
              href={card.href}
              className="block bg-slate-900 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/80 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-2xl font-extrabold text-white font-display">
                  {card.value}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400 font-semibold">{card.name}</span>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Leads (Left Col) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800/85 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <h3 className="font-bold font-display text-white text-base">Recent Lead Inquiries</h3>
            <Link href="/admin/leads" className="text-xs font-bold text-emerald-500 hover:text-blue-400 transition-colors uppercase tracking-wider">
              Manage Leads →
            </Link>
          </div>

          <div className="flex-grow">
            {recentLeads.length === 0 ? (
              <div className="py-16 text-center text-slate-500 text-xs">
                No leads captured yet. Lead notifications will appear here.
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="p-5 hover:bg-slate-850/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200 text-sm">{lead.full_name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[9px] uppercase tracking-wider font-semibold">
                          {lead.service}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 text-blue-600 mr-1.5" />
                          {lead.phone}
                        </span>
                        {lead.email && (
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 text-blue-600 mr-1.5" />
                            {lead.email}
                          </span>
                        )}
                      </div>

                      {lead.message && (
                        <p className="text-xs text-slate-450 italic truncate max-w-md mt-1">
                          &ldquo;{lead.message}&rdquo;
                        </p>
                      )}
                    </div>
                    
                    <div className="text-right text-xs text-slate-500 mt-2 sm:mt-0 shrink-0">
                      <p>{new Date(lead.created_at).toLocaleDateString("en-IN")}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{new Date(lead.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions (Right Col) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800/85 rounded-xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold font-display text-white text-base border-b border-slate-800 pb-3">Quick Actions</h3>
          
          <div className="space-y-3">
            <Link 
              href="/admin/properties?add=true" 
              className="flex items-center p-3 rounded-lg border border-slate-800 hover:border-blue-600/40 bg-slate-950/60 hover:bg-slate-850/30 transition-all text-xs font-semibold text-slate-300"
            >
              <MessageSquarePlus className="h-4.5 w-4.5 text-blue-600 mr-3 shrink-0" />
              Add New Property Flat
            </Link>

            <Link 
              href="/admin/projects?add=true" 
              className="flex items-center p-3 rounded-lg border border-slate-800 hover:border-blue-600/40 bg-slate-950/60 hover:bg-slate-850/30 transition-all text-xs font-semibold text-slate-300"
            >
              <MessageSquarePlus className="h-4.5 w-4.5 text-blue-600 mr-3 shrink-0" />
              Add Portfolio Project
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
