// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhVXogAUXvU6Co2tUTIqA2AZIvtjxzmYE",
  authDomain: "viktorija-base.firebaseapp.com",
  projectId: "viktorija-base",
  storageBucket: "viktorija-base.firebasestorage.app",
  messagingSenderId: "517244797530",
  appId: "1:517244797530:web:c1e30be739f9fbe4760e63",
  measurementId: "G-YYFCCXEQ5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firestore
const db = getFirestore(app);

export { db, analytics };
export default app; 