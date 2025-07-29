// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-fe2ca.firebaseapp.com",
  projectId: "mern-blog-fe2ca",
  storageBucket: "mern-blog-fe2ca.firebasestorage.app",
  messagingSenderId: "42217759335",
  appId: "1:42217759335:web:c7fc8b55ccc6ca7e756ac2",
  measurementId: "G-P44W1ZN6TE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
