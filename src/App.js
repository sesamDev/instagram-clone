import "./styles/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
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
import SignUp from "./components/routes/SignUp";
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

export function createUserEmailPassword(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const username = e.target.username.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // Navigate to home page after creating account
      window.location.replace("../");

      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("ERROR: " + errorCode, errorMessage);
      // ..
    });
}

// Sign in with email and password.
export async function simpleSignIn(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

// Signs-in to Fakegram with Google.
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
  return <div className="App">{!!user ? <Home /> : <Login />}</div>;
}

export default App;
