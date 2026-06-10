"use client";

import React, { useState, useEffect } from "react";
import { 
  UserSquare2, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare,
  Building,
  Loader,
  Search
} from "lucide-react";
import { Lead } from "@/types";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error("Unauthorized or database failure");
      const data = await res.json();
      setLeads(data.leads || []);
      if (data.leads && data.leads.length > 0 && !selectedLead) {
        setSelectedLead(data.leads[0]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to query leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead? This action is permanent.")) return;
    
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
        if (selectedLead?.id === id) {
          const remaining = leads.filter(l => l.id !== id);
          setSelectedLead(remaining.length > 0 ? remaining[0] : null);
        }
      } else {
        alert("Failed to delete lead");
      }
    } catch (err) {
      alert("Error deleting lead");
    }
  };

  const filteredLeads = leads.filter(l => 
    l.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm) ||
    l.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white">
        <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 text-xs">Loading captured leads pipeline...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">Leads Pipeline</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review form inquiries submitted by potential clients.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl text-xs text-rose-500">
          {error}
        </div>
      )}

      {/* Main split dashboard view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Leads List (Left Col) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px]">
          <div className="p-4 border-b border-slate-800 flex items-center relative">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
            />
          </div>

          <div className="flex-grow overflow-y-auto divide-y divide-slate-800/50">
            {filteredLeads.length === 0 ? (
              <div className="py-10 text-center text-slate-500 text-xs">
                No matching leads found.
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`w-full text-left p-4 hover:bg-slate-850/40 transition-colors block border-l-4 ${
                    selectedLead?.id === lead.id
                      ? "border-blue-600 bg-slate-800/30"
                      : "border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-200 text-xs truncate max-w-[150px]">
                      {lead.full_name}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-emerald-500 truncate mt-1">
                    {lead.service}
                  </p>
                  
                  {lead.property_name && (
                    <p className="text-[9px] text-slate-500 truncate mt-0.5">
                      Property Ref: {lead.property_name}
                    </p>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Lead Details (Right Col) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800/80 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[600px]">
          {selectedLead ? (
            <div className="space-y-6 flex-grow overflow-y-auto">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">{selectedLead.full_name}</h3>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-blue-600/10 text-emerald-500 border border-blue-600/20 text-[10px] uppercase font-bold tracking-wider">
                    {selectedLead.service}
                  </span>
                </div>
                
                <button
                  onClick={() => handleDelete(selectedLead.id)}
                  className="p-2 bg-rose-600/10 hover:bg-rose-650 text-rose-500 hover:text-white rounded-lg transition-colors border border-rose-900/30"
                  title="Delete Lead"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Lead Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center space-x-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-slate-500">Phone number</p>
                    <a href={`tel:${selectedLead.phone}`} className="font-bold text-slate-200 hover:text-white transition-colors">
                      {selectedLead.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-slate-500">Email Address</p>
                    <p className="font-bold text-slate-200">
                      {selectedLead.email || "Not Provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-slate-500">Submitted On</p>
                    <p className="font-bold text-slate-200">
                      {new Date(selectedLead.created_at).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {selectedLead.property_name && (
                  <div className="flex items-center space-x-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <Building className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-slate-500">Property Reference</p>
                      <p className="font-bold text-slate-200 truncate">{selectedLead.property_name}</p>
                    </div>
                  </div>
                )}

                {selectedLead.how_heard && (
                  <div className="flex items-center space-x-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <UserSquare2 className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-slate-500">Source (How Heard)</p>
                      <p className="font-bold text-slate-200 truncate">{selectedLead.how_heard}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-slate-450 tracking-wider flex items-center">
                  <MessageSquare className="h-4 w-4 text-blue-600 mr-2" /> Message Description
                </h4>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[120px] whitespace-pre-wrap">
                  {selectedLead.message || "No message provided."}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center text-slate-500 text-xs">
              Select a lead from the list to view full details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
