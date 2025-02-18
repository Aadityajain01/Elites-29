// lib/firebase.js
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCy4G4hskPJkF4QU9BjcLm0ODjmyppM-H0",
  authDomain: "blood-link-6b183.firebaseapp.com",
  projectId: "blood-link-6b183",
  storageBucket: "blood-link-6b183.firebasestorage.app",
  messagingSenderId: "240882895790",
  appId: "1:240882895790:web:37f5183a62e0551a00d63f"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
