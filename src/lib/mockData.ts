import { Property, Project, Testimonial, SiteSettings } from "../types";

export const initialSiteSettings: SiteSettings = {
  companyName: "Sri Balaji Construction & Real Estate",
  logoUrl: "/images/logo.png",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // No +, spaces or dashes
  email: "info@balajiconstructions.com",
  address: "D.No. 4-12-85/A, Rayalam Road, Near Asr Nagar, Bhimavaram, Andhra Pradesh - 534204",
  heroTitle: "Building Premium Landmarks in Bhimavaram",
  heroSubtitle: "Turnkey Civil Construction, Deep Pile Foundations, and Premium 2 BHK / 3 BHK Vaastu-Compliant Apartments built with unmatched quality and trust.",
  tagline: "Quality in Every Square Foot",
  services: [
    {
      id: "residential-construction",
      title: "Residential Building Construction",
      description: "From individual villas to premium apartments, we design and construct residential spaces with a strong emphasis on Vaastu compliance, structural safety, and high-quality materials.",
      features: [
        "100% Vaastu-Compliant layout and floor planning",
        "Superior grade cement and FE 550 steel for high durability",
        "On-time delivery with regular status and video updates",
        "Turnkey execution from foundation to interior furnishing"
      ],
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "apartment-construction",
      title: "Apartment Construction",
      description: "We build premium residential apartments in Bhimavaram, featuring modern amenities, low-density spacing, and high-quality utility systems.",
      features: [
        "Earthquake-resistant RCC framed structures",
        "Power backup generators and dedicated borewells",
        "Spacious corridors and premium passenger lifts",
        "Secured gated premises with CCTV surveillance"
      ],
      imageUrl: "/images/hero_bg.png"
    },
    {
      id: "pile-construction",
      title: "Deep Pile Foundation Construction",
      description: "Specialized bored cast-in-situ pile foundation services, essential for the clay-heavy soil profile of the West Godavari delta region. Ideal for multi-story apartments and commercial complexes.",
      features: [
        "Deep bored cast-in-situ piles with state-of-the-art hydraulic rigs",
        "Soil investigation and load testing before structural planning",
        "Expert pile cap design for uniform load distribution",
        "Experienced team of pile foundation engineers"
      ],
      imageUrl: "/images/pile_construction.png"
    },
    {
      id: "commercial-construction",
      title: "Commercial Construction",
      description: "Delivering state-of-the-art corporate buildings, shopping complexes, and educational institutional buildings that stand out in key hubs of Bhimavaram.",
      features: [
        "Large span structures with flexible interior layouts",
        "Aesthetic front elevations and glass curtain walls",
        "Fire safety compliance and standard emergency exits",
        "Sufficient cellar parking mapping"
      ],
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "school-construction",
      title: "School Building Construction",
      description: "Designing and building spacious, safety-first educational infrastructure with proper ventilation, playgrounds, and laboratory layouts.",
      features: [
        "High-density occupancy safety design",
        "Spacious high-ceiling classrooms with proper lighting",
        "Dedicated play zones and auditorium planning",
        "Premium washroom facilities and pure drinking water setups"
      ],
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "house-construction",
      title: "House Construction (Individual Homes)",
      description: "We offer customized individual house construction packages, helping landowners build their dream homes within budget.",
      features: [
        "Tailored layout mapping with interior consultation",
        "Material testing certificates for concrete, steel, and sand",
        "Regular architectural supervision",
        "Premium bathroom, electrical, and plumbing fixtures included"
      ],
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

export const initialProperties: Property[] = [
  {
    id: "sri-sai-ram-residency",
    name: "Sri Sai Ram Residency",
    location: "Rayalam Road, Bhimavaram",
    type: "Apartment",
    status: "Ready to Move",
    area_sqft: 1450,
    images: [
      "/images/hero_bg.png",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "3 BHK Premium Flat",
      "100% Vaastu Compliant",
      "East Facing Main Door",
      "No Common Walls",
      "Reserved Car Parking",
      "24/7 Municipal & Bore Water"
    ],
    description: "Sri Sai Ram Residency offers premium 3 BHK flats on Rayalam Road. Built with the highest standards, the building features low density living, a spacious corridor, elevator, and close proximity to key schools and hospitals in Bhimavaram.",
    price: "₹48 Lakhs onwards",
    bhk: 3
  },
  {
    id: "balaji-emerald-heights",
    name: "Balaji Emerald Heights",
    location: "Asr Nagar, Bhimavaram",
    type: "Apartment",
    status: "Under Construction",
    area_sqft: 1180,
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "2 BHK Luxury Flat",
      "Deep Pile Foundation",
      "North & East Facing Available",
      "Generator Backup",
      "Children's Play Area",
      "Possession in 6 Months"
    ],
    description: "Located in the highly sought-after Asr Nagar area, Balaji Emerald Heights is a premium residential community. The project is constructed using deep bored pile foundations to ensure solid safety against local soft-clay soil conditions. Featuring modern amenities and elegant layout styling.",
    price: "₹38 Lakhs onwards",
    bhk: 2
  },
  {
    id: "srinivasa-grand-villas",
    name: "Srinivasa Grand Villas",
    location: "Near J P Road, Bhimavaram",
    type: "Villa",
    status: "Ready to Move",
    area_sqft: 2200,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "4 BHK Duplex Villa",
      "Private Terrace & Garden",
      "Vaastu Checked & Approved",
      "Premium Marble Flooring",
      "Solar Water Heater Fitted",
      "Gated Community Security"
    ],
    description: "A state-of-the-art duplex villa located just off J P Road in Bhimavaram. Perfectly designed for high-net-worth investors and families seeking privacy, safety, and luxury. Features imported Italian marble, modular kitchen, and double-height ceiling in the living hall.",
    price: "₹95 Lakhs",
    bhk: 4
  }
];

export const initialProjects: Project[] = [
  {
    id: "godavari-view-apartments",
    name: "Godavari View Apartments",
    type: "Completed Apartments",
    location: "Rayalam Road, Bhimavaram",
    description: "A grand residential block with 20 premium 3 BHK units. Completed in 2024, the project was delivered 2 months ahead of schedule, showcasing our execution speed and quality.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Bored cast-in-situ pile foundation",
      "Premium sanitary fittings",
      "Solar power for common area lighting",
      "Full occupancy completed"
    ],
    created_at: "2024-11-15T00:00:00.000Z"
  },
  {
    id: "sri-balaji-castle",
    name: "Sri Balaji Castle",
    type: "Ongoing Apartments",
    location: "Asr Nagar, Bhimavaram",
    description: "Our current flagship project featuring low-density, highly spacious 2 & 3 BHK flats. The structure is reinforced with heavy steel rods and deep pile foundation to prevent any seismic or settlement threats.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Ongoing columns and brickwork phase",
      "Double borewell with water softener plant",
      "Ready sample flat available for walk-in review",
      "Booking open (60% sold out)"
    ],
    created_at: "2025-02-10T00:00:00.000Z"
  },
  {
    id: "bhimavaram-public-school",
    name: "Bhimavaram Public School Block C",
    type: "Completed Apartments", // Categorized under completed for general portfolio grid, or we can filter it
    location: "Vendra Road, Bhimavaram",
    description: "Turnkey construction of a three-story academic block spanning 30,000 sq ft. Features wide staircases, fire safety grids, and high ceiling classrooms for superior ventilation.",
    images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Heavy load structural design",
      "Industrial grade electrical wiring",
      "Anti-skid floor tiles in corridors",
      "Handed over in September 2025"
    ],
    created_at: "2025-09-01T00:00:00.000Z"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "testi-1",
    author_name: "G. Satyanarayana Murthy",
    role: "Retired Bank Manager & Property Buyer",
    quote: "I purchased a 3 BHK flat in Sri Sai Ram Residency. The construction quality is exemplary. Unlike other builders who compromise on steel and sand, Balaji Constructions provides proper certificates and allowed us to inspect concrete mixing at every stage. Fully Vaastu compliant too!",
    rating: 5,
    created_at: "2025-12-05T00:00:00.000Z"
  },
  {
    id: "testi-2",
    author_name: "K. Ranga Rao",
    role: "Landowner (Joint Venture Partner)",
    quote: "We partnered with Sri Balaji Constructions for a joint venture on our 800 sq. yards land in Asr Nagar. Their transparent agreement, dedication to using pile foundations due to soft soil, and prompt share distribution made the entire process stress-free. Highly recommended!",
    rating: 5,
    created_at: "2026-01-20T00:00:00.000Z"
  },
  {
    id: "testi-3",
    author_name: "Dr. Lakshmi Prasanna",
    role: "Pediatrician & Villa Owner",
    quote: "Their team built my custom individual house near JP Road. They mapped the architecture beautifully, incorporating my clinic room on the ground floor while keeping the living area private. The interior wood carvings and quality of bathroom fitting work is top notch.",
    rating: 5,
    created_at: "2026-03-11T00:00:00.000Z"
  }
];
