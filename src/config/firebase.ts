import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aegis-commerce.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aegis-commerce",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aegis-commerce.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "787778804118",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:787778804118:web:840ed30ed5b739192e65b7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-2Z04CHVL7D"
};

// Initialize Firebase client safely
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize analytics conditionally when supported in browser environment
export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(firebaseApp);
  }
  return null;
};
