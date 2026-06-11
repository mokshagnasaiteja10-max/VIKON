import React from "react";
import { getSiteSettings } from "@/lib/db-server";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="bg-slate-50 dark:bg-luxury-bg py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Get in Touch</h1>
          <p className="text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            Start Your Construction Journey
          </p>
          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Have a project in Bhimavaram or West Godavari? Fill out the lead form below to get a detailed cost sheet, or contact us directly.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Contact Details (Left Col) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Office Location</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Visit us to discuss land joint ventures, structural pile configurations, or flat bookings.
            </p>

            <div className="space-y-4">
              {/* Address Card */}
              <a 
                href="https://maps.app.goo.gl/DKf6GScPm6j3Aku88" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-600/50 rounded-xl p-5 shadow-sm flex items-start gap-4 transition-all"
              >
                <MapPin className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    Office Location <span className="text-[10px] text-blue-600 font-normal">(Open Map)</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {settings.address}
                  </p>
                </div>
              </a>

              {/* Phone Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <Phone className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Phone Support</h4>
                  <a 
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`} 
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors mt-1 block"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <Mail className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Email Address</h4>
                  <a 
                    href={`mailto:${settings.email}`} 
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors mt-1 block"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Timing Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-start gap-4">
                <Clock className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Business Hours</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Mon - Sat: 9:00 AM - 6:00 PM <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-xl p-6 text-center space-y-3">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-500 mx-auto fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Need Instant Support?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Connect directly with our engineering team on WhatsApp for quick layout mapping updates.
              </p>
              <a
                href={`https://wa.me/${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form Area (Right Col) */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>

        {/* Map Frame */}
        <div className="relative group w-full h-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.5694297400135!2d81.50842417535775!3d16.533122099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a362d3a66c03e5f%3A0x331f46533f1d3e3b!2sVIKON%20CONSTRUCTIONS!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            title={`${settings.companyName} Location`}
          />
          {/* Overlay link */}
          <div className="absolute bottom-4 right-4 z-10">
            <a
              href="https://maps.app.goo.gl/DKf6GScPm6j3Aku88"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-slate-950 text-xs font-bold rounded-lg shadow-lg uppercase tracking-wider transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
