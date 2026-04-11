import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB92W...",
  authDomain: "garderobe-chat.firebaseapp.com",
  projectId: "garderobe-chat",
  storageBucket: "garderobe-chat.appspot.com",
  messagingSenderId: "981150112263",
  appId: "1:981150112263:web:c39dca93c83057017028a2"
};

export const app = initializeApp(firebaseConfig);