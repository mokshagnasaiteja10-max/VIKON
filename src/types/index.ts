export interface Property {
  id: string;
  name: string;
  location: string;
  type: string; // e.g., "Apartment", "Villa"
  status: "Ready to Move" | "Under Construction";
  area_sqft: number;
  images: string[];
  features: string[];
  description: string;
  price?: string; // e.g. "Contact for Price" or "₹65 Lakhs"
  bhk: number; // e.g. 2, 3
}

export interface Project {
  id: string;
  name: string;
  type: "Completed Apartments" | "Ongoing Apartments" | "Commercial" | "Residential";
  location: string;
  description: string;
  images: string[];
  features: string[];
  created_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  role: string;
  quote: string;
  rating: number; // 1-5 stars
  image?: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface SiteSettings {
  companyName: string;
  logoUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  tagline: string;
  services: Service[];
}

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  service: string;
  property_name?: string;
  message?: string;
  how_heard?: string;
  created_at: string;
  status: "New" | "Contacted" | "Closed";
}
