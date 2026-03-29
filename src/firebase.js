// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqWvogbNpt8Xf3KGmVOh--3T4GzVawIX0",
  authDomain: "gardrobe-chat.firebaseapp.com",
  projectId: "gardrobe-chat",
  storageBucket: "gardrobe-chat.firebasestorage.app",
  messagingSenderId: "346775819630",
  appId: "1:346775819630:web:e74d8cf7d5d87c0e495d7f",
  measurementId: "G-V77DLLY0G4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };