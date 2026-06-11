import fs from "fs";
import path from "path";
import {
  initialProperties,
  initialProjects,
  initialTestimonials,
  initialSiteSettings
} from "./mockData";
import { Property, Project, Testimonial, Lead, SiteSettings } from "../types";

// Firebase imports (lazy-loaded when needed to avoid compilation/initialization issues in mock mode)
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const isFirebaseEnabled = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Initialize Firebase if enabled
let firestoreDb: any = null;
if (isFirebaseEnabled) {
  try {
    const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();
    firestoreDb = getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize Firebase on server:", error);
  }
}

// File path for mock database
const MOCK_DB_FILE = path.join(process.cwd(), "src", "lib", "mock_db.json");

interface MockSchema {
  properties: Property[];
  projects: Project[];
  testimonials: Testimonial[];
  siteSettings: SiteSettings;
  leads: Lead[];
}

const isKvEnabled = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

async function getKvDb(): Promise<MockSchema | null> {
  if (!isKvEnabled) return null;
  try {
    const res = await fetch(`${process.env.KV_REST_API_URL}/get/vikon_db`, {
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Vercel KV read error status:", res.status);
      return null;
    }
    const data = await res.json();
    if (data && data.result) {
      return JSON.parse(data.result) as MockSchema;
    }
    return null;
  } catch (error) {
    console.error("Failed to read from Vercel KV:", error);
    return null;
  }
}

async function setKvDb(data: MockSchema): Promise<boolean> {
  if (!isKvEnabled) return false;
  try {
    const res = await fetch(`${process.env.KV_REST_API_URL}/set/vikon_db`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    console.error("Failed to write to Vercel KV:", error);
    return false;
  }
}

// Ensure the local JSON file exists and return content
function readMockDb(): MockSchema {
  try {
    if (!fs.existsSync(MOCK_DB_FILE)) {
      const initialDb: MockSchema = {
        properties: initialProperties,
        projects: initialProjects,
        testimonials: initialTestimonials,
        siteSettings: initialSiteSettings,
        leads: []
      };
      // Ensure directory exists
      fs.mkdirSync(path.dirname(MOCK_DB_FILE), { recursive: true });
      fs.writeFileSync(MOCK_DB_FILE, JSON.stringify(initialDb, null, 2), "utf8");
      return initialDb;
    }
    const data = fs.readFileSync(MOCK_DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading mock DB file, returning defaults:", error);
    return {
      properties: initialProperties,
      projects: initialProjects,
      testimonials: initialTestimonials,
      siteSettings: initialSiteSettings,
      leads: []
    };
  }
}

function writeMockDb(data: MockSchema) {
  try {
    fs.mkdirSync(path.dirname(MOCK_DB_FILE), { recursive: true });
    fs.writeFileSync(MOCK_DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to mock DB file:", error);
  }
}

async function getActiveDb(): Promise<MockSchema> {
  if (isKvEnabled) {
    const kvData = await getKvDb();
    if (kvData) {
      return kvData;
    }
    const initialDb: MockSchema = {
      properties: initialProperties,
      projects: initialProjects,
      testimonials: initialTestimonials,
      siteSettings: initialSiteSettings,
      leads: []
    };
    await setKvDb(initialDb);
    return initialDb;
  }
  return readMockDb();
}

async function saveActiveDb(data: MockSchema) {
  if (isKvEnabled) {
    await setKvDb(data);
    return;
  }
  writeMockDb(data);
}

// ==================== DATABASE ACTIONS ====================

// --- SITE SETTINGS ---
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isFirebaseEnabled && firestoreDb) {
    try {
      const docRef = doc(firestoreDb, "site_settings", "global");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as SiteSettings;
      }
      // Write initial settings to firebase if missing
      await setDoc(docRef, initialSiteSettings);
      return initialSiteSettings;
    } catch (e) {
      console.error("Firebase site settings read error, falling back:", e);
    }
  }
  return (await getActiveDb()).siteSettings;
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "site_settings", "global");
    await setDoc(docRef, settings);
    return settings;
  }
  const db = await getActiveDb();
  db.siteSettings = settings;
  await saveActiveDb(db);
  return settings;
}

// --- PROPERTIES ---
export async function getProperties(): Promise<Property[]> {
  if (isFirebaseEnabled && firestoreDb) {
    try {
      const colRef = collection(firestoreDb, "properties");
      const snap = await getDocs(colRef);
      const list: Property[] = [];
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Property);
      });
      if (list.length === 0) {
        // Seed initial properties
        for (const prop of initialProperties) {
          await setDoc(doc(firestoreDb, "properties", prop.id), prop);
          list.push(prop);
        }
      }
      return list;
    } catch (e) {
      console.error("Firebase properties read error, falling back:", e);
    }
  }
  return (await getActiveDb()).properties;
}

export async function saveProperty(property: Property): Promise<Property> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "properties", property.id);
    await setDoc(docRef, property);
    return property;
  }
  const db = await getActiveDb();
  const index = db.properties.findIndex((p) => p.id === property.id);
  if (index >= 0) {
    db.properties[index] = property;
  } else {
    db.properties.push(property);
  }
  await saveActiveDb(db);
  return property;
}

export async function deleteProperty(id: string): Promise<boolean> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "properties", id);
    await deleteDoc(docRef);
    return true;
  }
  const db = await getActiveDb();
  const filtered = db.properties.filter((p) => p.id !== id);
  if (filtered.length !== db.properties.length) {
    db.properties = filtered;
    await saveActiveDb(db);
    return true;
  }
  return false;
}

// --- PROJECTS ---
export async function getProjects(): Promise<Project[]> {
  if (isFirebaseEnabled && firestoreDb) {
    try {
      const colRef = collection(firestoreDb, "projects");
      const snap = await getDocs(colRef);
      const list: Project[] = [];
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Project);
      });
      if (list.length === 0) {
        for (const proj of initialProjects) {
          await setDoc(doc(firestoreDb, "projects", proj.id), proj);
          list.push(proj);
        }
      }
      return list;
    } catch (e) {
      console.error("Firebase projects read error, falling back:", e);
    }
  }
  return (await getActiveDb()).projects;
}

export async function saveProject(project: Project): Promise<Project> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "projects", project.id);
    await setDoc(docRef, project);
    return project;
  }
  const db = await getActiveDb();
  const index = db.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    db.projects[index] = project;
  } else {
    db.projects.push(project);
  }
  await saveActiveDb(db);
  return project;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "projects", id);
    await deleteDoc(docRef);
    return true;
  }
  const db = await getActiveDb();
  const filtered = db.projects.filter((p) => p.id !== id);
  if (filtered.length !== db.projects.length) {
    db.projects = filtered;
    await saveActiveDb(db);
    return true;
  }
  return false;
}

// --- TESTIMONIALS ---
export async function getTestimonials(): Promise<Testimonial[]> {
  if (isFirebaseEnabled && firestoreDb) {
    try {
      const colRef = collection(firestoreDb, "testimonials");
      const snap = await getDocs(colRef);
      const list: Testimonial[] = [];
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      if (list.length === 0) {
        for (const test of initialTestimonials) {
          await setDoc(doc(firestoreDb, "testimonials", test.id), test);
          list.push(test);
        }
      }
      return list;
    } catch (e) {
      console.error("Firebase testimonials read error, falling back:", e);
    }
  }
  return (await getActiveDb()).testimonials;
}

export async function saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "testimonials", testimonial.id);
    await setDoc(docRef, testimonial);
    return testimonial;
  }
  const db = await getActiveDb();
  const index = db.testimonials.findIndex((t) => t.id === testimonial.id);
  if (index >= 0) {
    db.testimonials[index] = testimonial;
  } else {
    db.testimonials.push(testimonial);
  }
  await saveActiveDb(db);
  return testimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "testimonials", id);
    await deleteDoc(docRef);
    return true;
  }
  const db = await getActiveDb();
  const filtered = db.testimonials.filter((t) => t.id !== id);
  if (filtered.length !== db.testimonials.length) {
    db.testimonials = filtered;
    await saveActiveDb(db);
    return true;
  }
  return false;
}

// --- LEADS ---
export async function getLeads(): Promise<Lead[]> {
  if (isFirebaseEnabled && firestoreDb) {
    try {
      const colRef = collection(firestoreDb, "leads");
      const snap = await getDocs(colRef);
      const list: Lead[] = [];
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Lead);
      });
      // Sort by date descending
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return list;
    } catch (e) {
      console.error("Firebase leads read error, falling back:", e);
    }
  }
  const leads = (await getActiveDb()).leads;
  return leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function saveLead(lead: Lead): Promise<Lead> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "leads", lead.id);
    await setDoc(docRef, lead);
    return lead;
  }
  const db = await getActiveDb();
  const index = db.leads.findIndex((l) => l.id === lead.id);
  if (index >= 0) {
    db.leads[index] = lead;
  } else {
    db.leads.push(lead);
  }
  await saveActiveDb(db);
  return lead;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (isFirebaseEnabled && firestoreDb) {
    const docRef = doc(firestoreDb, "leads", id);
    await deleteDoc(docRef);
    return true;
  }
  const db = await getActiveDb();
  const filtered = db.leads.filter((l) => l.id !== id);
  if (filtered.length !== db.leads.length) {
    db.leads = filtered;
    await saveActiveDb(db);
    return true;
  }
  return false;
}
