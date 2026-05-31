
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // your existing config
  apiKey: "AIzaSyDfwxdQjgsfp80Ruu68_SOErGCI8Ip3pPE",
  authDomain: "studyflow-ai-e51cc.firebaseapp.com",
  projectId: "studyflow-ai-e51cc",
  storageBucket: "studyflow-ai-e51cc.firebasestorage.app",
  messagingSenderId: "6493322781",
  appId: "1:6493322781:web:5e0c2f3457a8e16d72d0f4",
  measurementId: "G-GV517N031N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);