import React from "react";
import { getTestimonials } from "@/lib/db-server";
import { Star, Quote, Shield } from "lucide-react";
import ReviewSubmitButton from "@/components/testimonials/ReviewSubmitButton";

export const revalidate = 0;

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-slate-50 dark:bg-luxury-bg py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Reviews</h1>
          <p className="text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            What Our Clients & Partners Say
          </p>
          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg leading-relaxed">
            Read stories from local landowners who did joint ventures with us, retirees who bought our 3 BHK apartments, and clients who hired us for turnkey house builds.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testi) => (
            <div 
              key={testi.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              {/* Decorative Quote Icon */}
              <Quote className="absolute right-6 top-6 h-10 w-10 text-slate-100 dark:text-slate-800/60 pointer-events-none" />

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6 text-emerald-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      className={`h-4.5 w-4.5 ${
                        idx < testi.rating ? "fill-current" : "text-slate-200 dark:text-slate-700"
                      }`} 
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed italic mb-8">
                  &ldquo;{testi.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5 flex items-center justify-between">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold font-display text-sm">{testi.author_name}</h4>
                  <p className="text-xs text-slate-500">{testi.role}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                  <Shield className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to contact */}
        <div className="mt-20 text-center space-y-6">
          <p className="text-slate-500 dark:text-slate-350 text-sm max-w-md mx-auto leading-relaxed">
            Have you built a home or booked a premium apartment with us in Bhimavaram? We value your experience.
          </p>
          <div className="flex justify-center">
            <ReviewSubmitButton />
          </div>
        </div>

      </div>
    </div>
  );
}
