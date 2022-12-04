import "./styles/App.css";

import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

import CreatePost from "./components/routes/CreatePost";
import Home from "./components/routes/Home";
import Login from "./components/routes/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/routes/Profile";
import SignUp from "./components/routes/SignUp";
import defaultUser from "./assets/defaultUser.png";
import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize auth
const auth = getAuth(firebaseApp);

// Returns the signed-in user's display name.
export function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || defaultUser;
}

// Signs-out of Fakegram.
export function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

export function getUserUID() {
  return auth.currentUser.uid;
}

function App() {
  const [user] = useAuthState(auth);
  const [activeView, setActiveView] = useState(() => "home");

  function renderViewSwitcher(selectedActiveView) {
    switch (selectedActiveView) {
      case "home":
        return !!user ? <Home /> : <Login setActiveView={setActiveView} />;
      case "signUp":
        return <SignUp auth={auth} setActiveView={setActiveView} />;
      case "profile":
        return <Profile auth={auth} />;
      case "createPost":
        return <CreatePost auth={auth} />;
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
