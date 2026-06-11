"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";
import { Building2, KeyRound, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await authService.login(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto px-4 py-8">
      {/* Back to Home Link */}
      <div className="text-center mb-6">
        <Link 
          href="/" 
          className="text-xs font-bold text-slate-500 hover:text-emerald-500 uppercase tracking-widest transition-colors"
        >
          ← Back to Public Website
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative Light effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="bg-white p-1 rounded-md h-12 w-12 flex items-center justify-center shrink-0 mx-auto mb-3">
            <img src="/images/logo.png" alt="Vikon Constructions Logo" className="max-h-full max-w-full object-contain" />
          </div>
          <h2 className="text-2xl font-extrabold font-display text-white tracking-tight">
            Vikon CMS
          </h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            Administrator Portal
          </p>
        </div>

        {/* Demo Credentials Tip */}
        <div className="mb-6 p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400 space-y-1">
          <p className="font-bold text-emerald-500">Demo Login Mode Fallback:</p>
          <p>Email: <code className="text-slate-900 font-semibold">admin@vikonconstructions.com</code></p>
          <p>Password: <code className="text-slate-900 font-semibold">admin</code></p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="flex items-center gap-2 text-xs text-rose-500 bg-rose-950/20 border border-rose-900/50 p-3 rounded-lg">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 text-slate-950 font-bold rounded-lg text-sm transition-colors shadow-md shadow-blue-600/10"
          >
            {isSubmitting ? "Authenticating..." : "Sign In to Console"}
          </button>
        </form>
      </div>
    </div>
  );
}
