import { collection, doc, getDocs, getFirestore, query, where } from "firebase/firestore";

import React from "react";
import { updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

// Function used to get posts made by user to later update display name
async function queryDBToGetPostsByUser(userID) {
  // Array to hold post paths
  let pathToUsersPosts = [];

  const postsRef = collection(getFirestore(), "posts");

  // Create the query to load all posts made by user
  const postByUserQuery = query(postsRef, where("uid", "==", userID.toString()));

  // Get paths from each post
  const querySnapshot = await getDocs(postByUserQuery);
  querySnapshot.forEach((doc) => {
    pathToUsersPosts.push(doc.id);
  });

  return pathToUsersPosts;
}

// Update display name of all post made by user
async function updatePostsDisplayName(userID, newDisplayName) {
  const postPaths = await queryDBToGetPostsByUser(userID);

  postPaths.forEach((path) => {
    const docRef = doc(getFirestore(), "posts", path);
    updateDoc(docRef, { name: newDisplayName });
  });
}

const Profile = (props) => {
  let { photoURL, displayName, email } = props.auth.currentUser;
  console.log(props.auth.currentUser);

  async function handleDisplayNameUpdate(e) {
    e.preventDefault();
    let newDisplayName = e.target.value;
    const user = props.auth.currentUser;

    // Update the users display name
    await updateProfile(user, {
      displayName: newDisplayName,
    });
    await updatePostsDisplayName(user.uid, newDisplayName);
  }

  return (
    <div>
      <div>
        {console.log(props.auth.currentUser)}
        <img src={photoURL} alt="profilePic" />
        <input type="text" defaultValue={displayName} onBlur={handleDisplayNameUpdate}></input>
        <p>{email}</p>
      </div>
      <div>All of users posts here</div>
    </div>
  );
};

export default Profile;
