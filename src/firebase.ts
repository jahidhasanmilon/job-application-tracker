import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1XYVwwEN_4uGZmAbEfrWnDMxSCvvafUA",
  authDomain: "job-application-tracker-aadfe.firebaseapp.com",
  projectId: "job-application-tracker-aadfe",
  storageBucket: "job-application-tracker-aadfe.firebasestorage.app",
  messagingSenderId: "565313787733",
  appId: "1:565313787733:web:abbbc9039dded0937f81dc",
  measurementId: "G-BJ6X3CB3DK"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);