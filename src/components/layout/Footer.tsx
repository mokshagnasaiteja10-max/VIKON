import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Building2, Facebook, Twitter, Instagram } from "lucide-react";
import { SiteSettings } from "@/types";

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Intro */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg tracking-tight text-white">
                  {settings.companyName}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">
                  Bhimavaram
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400">
              {settings.tagline}. Specialized in multi-story apartments, custom home construction, and deep bored cast-in-situ pile foundation designs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-display">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-blue-600 transition-colors">Our Services</Link></li>
              <li><Link href="/projects" className="hover:text-blue-600 transition-colors">Portfolio Projects</Link></li>
              <li><Link href="/properties" className="hover:text-blue-600 transition-colors">Property Listings</Link></li>
              <li><Link href="/testimonials" className="hover:text-blue-600 transition-colors">Client Reviews</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Form</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-display">Our Offerings</h3>
            <ul className="space-y-2 text-sm">
              {settings.services.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link href={`/services#${service.id}`} className="hover:text-blue-600 transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services#pile-construction" className="hover:text-blue-600 transition-colors">
                  Bored Pile Foundations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg mb-4 font-display">Get in Touch</h3>
            <div className="flex items-start text-sm space-x-3 text-slate-400">
              <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </div>
            <div className="flex items-center text-sm space-x-3 text-slate-400">
              <Phone className="h-5 w-5 text-blue-600 shrink-0" />
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                {settings.phone}
              </a>
            </div>
            <div className="flex items-center text-sm space-x-3 text-slate-400">
              <Mail className="h-5 w-5 text-blue-600 shrink-0" />
              <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                {settings.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {currentYear} {settings.companyName}. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/admin/login" className="hover:text-blue-600 transition-colors font-medium">
              Admin Portal
            </Link>
            <span className="text-slate-800">|</span>
            <span className="text-slate-600">Designed with Integrity & Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
