// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgo-HmQklYA8ncqUg9_Z2Wrqm6tQvIxLg",
  authDomain: "nexus-81e18.firebaseapp.com",
  projectId: "nexus-81e18",
  storageBucket: "nexus-81e18.firebasestorage.app",
  messagingSenderId: "502742981360",
  appId: "1:502742981360:web:f392db3ad611272103c035",
  measurementId: "G-35TJBNHPPC"
};

// Initialize Firebase only if not already initialized
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  // Client-side only
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  
  auth = getAuth(app);
  
  // Initialize analytics only if supported
  isSupported().then(supported => {
    if (supported && app) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth };
