import React from "react";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Users, 
  Ruler,
  Star
} from "lucide-react";
import { 
  getSiteSettings, 
  getProperties, 
  getProjects, 
  getTestimonials 
} from "@/lib/db-server";

export const revalidate = 0; // Ensure data is loaded fresh on every request

export default async function HomePage() {
  const settings = await getSiteSettings();
  const allProperties = await getProperties();
  const allProjects = await getProjects();
  const allTestimonials = await getTestimonials();

  // Get featured items
  const featuredProperties = allProperties.slice(0, 3);
  const latestProjects = allProjects.slice(0, 3);
  const featuredTestimonials = allTestimonials.slice(0, 3);

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 bg-slate-950 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-10000"
          style={{ backgroundImage: `url('/images/hero_bg.png')`, opacity: 0.06 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        
        {/* Green Light Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/10 text-emerald-500 border border-blue-600/30 mb-6 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Trusted Builder in West Godavari
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {settings.heroTitle.split("Bhimavaram")[0]}
              <span className="text-gradient-brand">Bhimavaram</span>
            </h1>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
              {settings.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/properties"
                className="shimmer-btn flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold rounded-lg shadow-lg hover:shadow-blue-600/20 text-base transition-all"
              >
                Explore Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center px-8 py-4 border-2 border-slate-700 hover:border-blue-600 text-white font-bold rounded-lg hover:bg-slate-900/40 text-base transition-all"
              >
                Get a Quote
              </Link>
            </div>

            {/* Quick Contact Badge */}
            <div className="mt-10 flex flex-wrap gap-6 items-center text-sm text-slate-400">
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="flex items-center hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-blue-600 mr-2" />
                Call: {settings.phone}
              </a>
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-emerald-500 mr-2">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp: Direct Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST METRICS SECTION */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl p-8 backdrop-blur-md">
          <div className="text-center p-2">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-display">15+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Years of Trust</p>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-display">25+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Projects Completed</p>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-display">5L+</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Sq. Ft. Built</p>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-display">100%</p>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Vaastu Compliance</p>
          </div>
        </div>
      </section>

      {/* 3. SERVICE PREVIEW SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Expertise</h2>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Construction Services</p>
          <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            From deep-foundation boring works in clayey soils to modular interior finishing, we deliver robust solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {settings.services.slice(0, 6).map((service) => (
            <div 
              key={service.id} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group brand-border-glow"
            >
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${service.imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <Link
                  href={`/services#${service.id}`}
                  className="inline-flex items-center text-xs font-bold text-blue-600 uppercase tracking-wider hover:text-emerald-500 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROPERTIES PREVIEW */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Premium Listings</h2>
              <p className="text-3xl sm:text-4xl font-extrabold font-display">Featured Properties</p>
              <div className="h-1 w-16 bg-blue-600 mt-4 rounded-full" />
            </div>
            <Link
              href="/properties"
              className="mt-6 md:mt-0 inline-flex items-center px-5 py-2.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-blue-600 rounded-lg text-sm font-semibold transition-all"
            >
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div 
                key={property.id} 
                className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg flex flex-col group hover:border-blue-600/50 transition-all duration-300"
              >
                <div 
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${property.images[0]}')` }}
                >
                  <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full text-white ${
                    property.status === "Ready to Move" ? "bg-emerald-600" : "bg-blue-600"
                  }`}>
                    {property.status}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mb-2">
                    {property.bhk} BHK {property.type}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-emerald-500 transition-colors">
                    {property.name}
                  </h3>
                  <p className="flex items-center text-xs text-slate-400 mb-4">
                    <MapPin className="h-3.5 w-3.5 text-blue-600 mr-1.5 shrink-0" />
                    {property.location}
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-900 text-xs text-slate-400 mb-6">
                    <div className="flex items-center">
                      <Ruler className="h-4 w-4 text-blue-600 mr-2 shrink-0" />
                      <span>{property.area_sqft} Sq. Ft.</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white text-sm">{property.price}</span>
                    </div>
                  </div>

                  <Link
                    href={`/properties/${property.id}`}
                    className="inline-flex items-center justify-center w-full py-3 bg-slate-900 hover:bg-blue-600 hover:text-slate-950 font-bold rounded-lg text-sm transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO SHOWCASE PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Portfolio</h2>
            <p className="text-3xl sm:text-4xl font-extrabold">Featured Construction Projects</p>
            <div className="h-1 w-16 bg-blue-600 mt-4 rounded-full" />
          </div>
          <Link
            href="/projects"
            className="mt-6 md:mt-0 inline-flex items-center px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold transition-all"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/85 rounded-xl overflow-hidden shadow-md flex flex-col group hover:scale-[1.01] transition-transform duration-200"
            >
              <div 
                className="h-56 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${project.images[0]}')` }}
              >
                <span className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 text-emerald-500 border border-blue-600/30 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {project.type.replace("Apartments", "Apartment")}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">
                  {project.name}
                </h3>
                <p className="flex items-center text-xs text-slate-400 mb-4">
                  <MapPin className="h-3.5 w-3.5 text-blue-600 mr-1.5 shrink-0" />
                  {project.location}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.description}
                </p>
                <Link
                  href={`/projects/${project.id}`}
                  className="mt-auto inline-flex items-center text-xs font-bold text-blue-600 uppercase tracking-wider hover:text-emerald-500 transition-colors"
                >
                  View Case Study
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIAL PREVIEW */}
      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Testimonials</h2>
            <p className="text-3xl sm:text-4xl font-extrabold font-display">What Our Clients Say</p>
            <div className="h-1 w-16 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-slate-900 border border-slate-800/80 rounded-xl p-8 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-emerald-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4.5 w-4.5 ${i < testimonial.rating ? "fill-current" : "text-slate-700"}`} />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center border-t border-slate-850 pt-4">
                  <div>
                    <h4 className="text-white font-bold font-display text-sm">{testimonial.author_name}</h4>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="inline-flex items-center text-sm font-semibold text-emerald-500 hover:text-blue-400 transition-colors"
            >
              Read More Client Experiences
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL-TO-ACTION */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-950 border-t border-slate-800 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display mb-6">
            Looking to Build or Buy in Bhimavaram?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Get in touch with our engineering and property consultancy team today. We provide transparent layouts, heavy structure designs, and on-time handovers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-slate-950 font-bold rounded-lg shadow-md text-base transition-colors"
            >
              Enquire Now / Contact Us
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 font-bold rounded-lg shadow-md text-base transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current mr-2">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
