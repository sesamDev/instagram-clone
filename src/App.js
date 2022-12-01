import "./styles/App.css";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
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

import CreatePost from "./components/routes/CreatePost";
import Home from "./components/routes/Home";
import Login from "./components/routes/Login";
import Navbar from "./components/Navbar";
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

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}

export function createUserEmailPassword(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  const username = e.target.username.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: username,
      });
    })
    .then(() => {
      // Navigate to home page after creating account
      window.location.replace("../");
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

// Saves a new post containing an image and text in Firebase.
// This first saves the text in Firestore.
// Then saves the image in Storage.
export async function savePostToStorage(file, postTextContent) {
  try {
    // 1 - Add a post with a loading icon that will get updated with the shared image.
    const postRef = await addDoc(collection(getFirestore(), "posts"), {
      name: getUserName(),
      text: postTextContent,
      imageUrl: "",
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp(),
      likes: 0,
    });
    // 2 - Upload the image to Cloud Storage.
    const filePath = `${getAuth().currentUser.uid}/${postRef.id}/${file.name}`;
    const newImageRef = ref(getStorage(), filePath);
    const fileSnapshot = await uploadBytesResumable(newImageRef, file);

    // 3 - Generate a public URL for the file.
    const publicImageUrl = await getDownloadURL(newImageRef);

    // 4 - Update the chat message placeholder with the image's URL.
    await updateDoc(postRef, {
      imageUrl: publicImageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
    });
  } catch (error) {
    console.error("There was an error uploading a file to Cloud Storage:", error);
  }
}

function App() {
  const [user] = useAuthState(auth);
  const [activeView, setActiveView] = useState(() => "home");

  function renderViewSwitcher(selectedActiveView) {
    switch (selectedActiveView) {
      case "home":
        return !!user ? <Home /> : <Login setActiveView={setActiveView} />;
      case "signUp":
        return <SignUp setActiveView={setActiveView} />;
      case "profile":
        return <Profile auth={auth} />;
      case "createPost":
        return <CreatePost />;
      case "login":
        return <Login setActiveView={setActiveView} />;
      default:
        return !!user ? <Home /> : <Login />;
    }
  }

  return (
    <div className="App">
      {!!user ? <Navbar setActiveView={setActiveView} /> : null}
      {renderViewSwitcher(activeView)}
    </div>
  );
}

export default App;
