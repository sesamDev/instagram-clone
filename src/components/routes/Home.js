import Card from "../card";
import React from "react";
import { signOutUser } from "../../App";

const Home = () => {
  return (
    <div>
      <Card />
      <button onClick={signOutUser}>Sign out</button>
    </div>
  );
};

export default Home;
