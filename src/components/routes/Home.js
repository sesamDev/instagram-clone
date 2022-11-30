import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore";

import Card from "../card";

async function loadPosts() {
  // Array to hold objects created from posts in DB
  let postsArray = [];

  // Create the query to load the last 12 messages and listen for new ones.
  const recentMessagesQuery = query(collection(getFirestore(), "posts"), orderBy("timestamp", "desc"), limit(12));
  const querySnapshot = await getDocs(recentMessagesQuery);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // tempObj is used to add doc.id to the same object generated from doc
    let tempObj = doc.data();
    tempObj.id = doc.id;
    postsArray.push(tempObj);
  });

  return postsArray;
}
const Home = () => {
  const [posts, SetPosts] = useState([]);

  useEffect(() => {
    loadPosts().then((data) => SetPosts(data));
  }, []);
  return (
    <div>
      {posts.map((post) => {
        return <Card key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Home;
