import { auth, isFirebaseEnabled } from "./firebase";
import { 
  signInWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";

export interface User {
  email: string;
  isDemo?: boolean;
}

const DEMO_USER_EMAIL = "admin@vikonconstructions.com";
const DEMO_USER_PASSWORD = "admin";
const DEMO_SESSION_KEY = "balaji_admin_session";

// Listener callback registry for auth state changes
type AuthCallback = (user: User | null) => void;
const listeners = new Set<AuthCallback>();
let currentMockUser: User | null = null;

// Initialize mock user state on client side
if (typeof window !== "undefined") {
  const stored = localStorage.getItem(DEMO_SESSION_KEY);
  if (stored) {
    currentMockUser = { email: stored, isDemo: true };
  }
}

export const authService = {
  isFirebase: isFirebaseEnabled,

  async login(email: string, password: string): Promise<User> {
    // Demo user fallback: bypass Firebase for local testing/dev
    if (email === DEMO_USER_EMAIL && password === DEMO_USER_PASSWORD) {
      currentMockUser = { email, isDemo: true };
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_SESSION_KEY, email);
        // Set a session cookie so middleware/API routes can see it too
        document.cookie = `${DEMO_SESSION_KEY}=true; path=/; max-age=86400; SameSite=Strict`;
      }
      listeners.forEach(cb => cb(currentMockUser));
      return currentMockUser;
    }

    if (isFirebaseEnabled && auth) {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      if (typeof window !== "undefined") {
        document.cookie = `${DEMO_SESSION_KEY}=true; path=/; max-age=86400; SameSite=Strict`;
      }
      return { email: credential.user.email || email };
    } else {
      throw new Error("Invalid admin credentials");
    }
  },

  async logout(): Promise<void> {
    currentMockUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_SESSION_KEY);
      // Clear cookie
      document.cookie = `${DEMO_SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict`;
    }

    if (isFirebaseEnabled && auth) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.error("Firebase signout error:", e);
      }
    }
    listeners.forEach(cb => cb(null));
  },

  onStateChange(callback: AuthCallback): () => void {
    if (typeof window !== "undefined" && !currentMockUser) {
      const stored = localStorage.getItem(DEMO_SESSION_KEY);
      if (stored === DEMO_USER_EMAIL) {
        currentMockUser = { email: stored, isDemo: true };
      }
    }

    if (currentMockUser) {
      // If we are in local mock user session, bypass Firebase auth state listener
      callback(currentMockUser);
      return () => {};
    }

    if (isFirebaseEnabled && auth) {
      return onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          if (typeof window !== "undefined") {
            document.cookie = `${DEMO_SESSION_KEY}=true; path=/; max-age=86400; SameSite=Strict`;
          }
          callback({ email: fbUser.email || "admin" });
        } else {
          // If mock user was set in the meantime
          if (currentMockUser) {
            callback(currentMockUser);
          } else {
            if (typeof window !== "undefined") {
              document.cookie = `${DEMO_SESSION_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict`;
            }
            callback(null);
          }
        }
      });
    } else {
      listeners.add(callback);
      // Immediately call with current state
      callback(currentMockUser);
      // Return unsubscriber
      return () => {
        listeners.delete(callback);
      };
    }
  },

  getCurrentUser(): User | null {
    if (typeof window !== "undefined" && !currentMockUser) {
      const stored = localStorage.getItem(DEMO_SESSION_KEY);
      if (stored === DEMO_USER_EMAIL) {
        currentMockUser = { email: stored, isDemo: true };
      }
    }
    if (currentMockUser) {
      return currentMockUser;
    }
    if (isFirebaseEnabled && auth) {
      const fbUser = auth.currentUser;
      return fbUser ? { email: fbUser.email || "admin" } : null;
    }
    return currentMockUser;
  }
};
