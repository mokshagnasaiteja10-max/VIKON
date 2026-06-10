import React from "react";
import { getProperties } from "@/lib/db-server";
import PropertiesList from "@/components/properties/PropertiesList";

export const revalidate = 0;

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="bg-slate-50 dark:bg-luxury-bg py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Residential Assets</h1>
          <p className="text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            Premium Apartments in Bhimavaram
          </p>
          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base leading-relaxed">
            Discover premium 2 BHK and 3 BHK low-density luxury apartment units located in prime hubs like Rayalam Road and Asr Nagar. Built to strict structural and Vaastu compliance parameters.
          </p>
        </div>

        {/* Properties Container */}
        <PropertiesList initialProperties={properties} />
      </div>
    </div>
  );
}
