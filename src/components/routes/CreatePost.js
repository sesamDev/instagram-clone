import "../../styles/CreatePost.css";

import { addDoc, collection, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getProfilePicUrl, getUserName, getUserUID } from "../../App";

import React from "react";
import { getAuth } from "firebase/auth";
import uniqid from "uniqid";

// Saves a new post containing an image and text in Firebase.
// This first saves the text in Firestore.
// Then saves the image in Storage.
async function savePostToStorage(file, postTextContent) {
  try {
    // 1 - Add a post with a loading icon that will get updated with the shared image.
    const postRef = await addDoc(collection(getFirestore(), "posts"), {
      id: uniqid(),
      uid: getUserUID(),
      name: getUserName(),
      text: postTextContent,
      imageUrl: "",
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp(),
      likes: [],
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

function handleUploadButton(e) {
  e.preventDefault();
  console.log("SUBMIT");
  const postText = e.target.postTextContent.value;
  const file = e.target[1].files[0];

  savePostToStorage(file, postText);
  e.target.postTextContent.value = "";
}

const CreatePost = (props) => {
  console.log(props.auth.currentUser.uid);
  return (
    <div className="newPostContainer">
      <h1>Upload new post</h1>
      <form onSubmit={handleUploadButton}>
        <textarea name="postTextContent" placeholder="Write a caption.." />
        <label className="uploadLabel" for="mediaCapture">
          Upload image
        </label>
        <input name="imageFile" id="mediaCapture" type="file" accept="image/*" capture="camera" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default CreatePost;
