import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperties } from "@/lib/db-server";
import PropertyEnquiryForm from "@/components/properties/PropertyEnquiryForm";
import { MapPin, Ruler, Bed, Layers, ArrowLeft, ShieldCheck, Check } from "lucide-react";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const properties = await getProperties();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-slate-50 dark:bg-luxury-bg py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link 
          href="/properties" 
          className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Listings
        </Link>

        {/* Header Title Area */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${
              property.status === "Ready to Move" ? "bg-emerald-600" : "bg-blue-600"
            }`}>
              {property.status}
            </span>
            <span className="text-lg font-bold text-blue-600 dark:text-emerald-500">
              {property.price}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mb-3">
            {property.name}
          </h1>
          
          <p className="flex items-center text-slate-500 text-sm">
            <MapPin className="h-4.5 w-4.5 text-blue-600 mr-2 shrink-0" />
            {property.location}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Visuals & Info (Left Col) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image Banner */}
            <div 
              className="h-96 w-full bg-cover bg-center rounded-2xl shadow-md border border-slate-200 dark:border-slate-800"
              style={{ backgroundImage: `url('${property.images[0]}')` }}
            />

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm text-center">
              <div>
                <Bed className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium">Bedrooms</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm sm:text-base">{property.bhk} BHK</p>
              </div>
              <div className="border-l border-slate-200 dark:border-slate-800">
                <Ruler className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium">Super Builtup</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm sm:text-base">{property.area_sqft} SqFt</p>
              </div>
              <div className="border-l border-slate-200 dark:border-slate-800">
                <Layers className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium">Type</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm sm:text-base">{property.type}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Description</h2>
              <p className="text-slate-650 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                {property.description}
              </p>
            </div>

            {/* Key Specs Checklist */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Flat Features & Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-650 dark:text-slate-350">
                    <Check className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety & Structure Callout */}
            <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold font-display text-sm text-white">Structural Stability Guarantee</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This flat structure is reinforced using bored cast-in-situ pile foundation technology, preventing structural cracking or foundation sinkage issues prevalent in the West Godavari delta soil beds.
                </p>
              </div>
            </div>
          </div>

          {/* Inquiry form Col (Right Col) */}
          <div className="space-y-6">
            <PropertyEnquiryForm propertyName={property.name} />
          </div>
        </div>

      </div>
    </div>
  );
}
