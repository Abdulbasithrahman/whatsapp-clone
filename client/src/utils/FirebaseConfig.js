import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUveVYGXj2sGAdI3A3SsEqHgYKopJirs8",
  authDomain: "whatsapp-clone-4060f.firebaseapp.com",
  projectId: "whatsapp-clone-4060f",
  storageBucket: "whatsapp-clone-4060f.appspot.com",
  messagingSenderId: "1084869700462",
  appId: "1:1084869700462:web:58998bbcebbe87aa1fef7f",
  measurementId: "G-3GG577HMPJ"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app); 