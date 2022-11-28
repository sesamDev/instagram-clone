import "./styles/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { authStateObserver, useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import Home from "./components/routes/Home";
import Login from "./components/routes/Login";
import Profile from "./components/routes/Profile";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZjmR98ys26S7U5l9OIdlAsCrr4lTGcbk",
  authDomain: "instagram-clone-efe4c.firebaseapp.com",
  projectId: "instagram-clone-efe4c",
  storageBucket: "instagram-clone-efe4c.appspot.com",
  messagingSenderId: "685444481645",
  appId: "1:685444481645:web:9217b0de505c7b0b5cf564",
  measurementId: "G-QENFKPSKHL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize auth
const auth = getAuth(firebaseApp);

// Signs-in to Fakegram.
export async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

// Signs-out of Fakegram.
export function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

function App() {
  const [user] = useAuthState(auth);
  console.log(!!user);
  return <div className="App">{!!user ? <Home /> : <Login />}</div>;
}

export default App;
