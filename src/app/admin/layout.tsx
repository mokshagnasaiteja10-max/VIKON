"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService, User } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Home, 
  Briefcase, 
  Quote, 
  UserSquare2, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Building2,
  ListCollapse,
  Loader
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = authService.onStateChange((user) => {
      setCurrentUser(user);
      setLoading(false);

      // Protect dashboard routes
      if (!user && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  // If path is login, do not render layout sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-slate-950 flex flex-col justify-center">{children}</div>;
  }

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push("/admin/login");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Home },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
    { name: "Leads Log", href: "/admin/leads", icon: UserSquare2 },
    { name: "Services CMS", href: "/admin/services", icon: ListCollapse },
    { name: "Settings", href: "/admin/settings", icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-medium">Verifying admin session...</p>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-100">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="font-display font-extrabold text-sm tracking-tight text-white uppercase">
              Balaji Admin
            </span>
          </Link>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-grow p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  active
                    ? "bg-blue-600 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 mr-3 ${active ? "text-slate-950" : "text-blue-600"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="px-4 py-2 bg-slate-950/60 rounded-lg text-xs truncate">
            <p className="text-slate-500">Logged in as:</p>
            <p className="font-bold text-slate-350 truncate">{currentUser.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 bg-rose-600/10 hover:bg-rose-650 text-rose-500 hover:text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <LogOut className="h-4.5 w-4.5 mr-3" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top bar for Mobile */}
        <header className="md:hidden h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-30">
          <Link href="/" className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <span className="font-display font-extrabold text-xs tracking-tight text-white uppercase">
              Balaji CMS
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden fixed inset-0 z-20 bg-slate-950/90 backdrop-blur-sm transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className={`w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between">
              <span className="font-display font-extrabold text-sm tracking-tight text-white uppercase">
                Navigation
              </span>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex-grow p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      active
                        ? "bg-blue-600 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white hover:bg-slate-850"
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 mr-3 ${active ? "text-slate-950" : "text-blue-600"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-3">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2.5 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <LogOut className="h-4.5 w-4.5 mr-3" />
                Logout Session
              </button>
            </div>
          </div>
        </div>

        {/* Content body */}
        <main className="flex-grow p-6 sm:p-10 overflow-y-auto">{children}</main>
      </div>

    </div>
  );
}
