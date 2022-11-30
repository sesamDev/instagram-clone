import React from "react";
import { savePostToStorage } from "../../App";

function handleUploadButton(e) {
  e.preventDefault();
  console.log("SUBMIT");
  const postText = e.target.postTextContent.value;
  const file = e.target[1].files[0];

  savePostToStorage(file, postText);
  e.target.postTextContent.value = "";
}
const CreatePost = () => {
  return (
    <div>
      <h1>Upload new post</h1>
      <form onSubmit={handleUploadButton}>
        <textarea name="postTextContent" />
        <input name="imageFile" id="mediaCapture" type="file" accept="image/*" capture="camera" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default CreatePost;
