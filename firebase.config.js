import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyARbTzZV71VeVDfAZLekBgEr6n6b3FgUgw",
  authDomain: "jatra-39833.firebaseapp.com",
  projectId: "jatra-39833",
  storageBucket: "jatra-39833.appspot.com",
  messagingSenderId: "600625273486",
  appId: "1:600625273486:web:bcac6238d073458b4187df",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);