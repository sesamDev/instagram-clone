import "../styles/Card.css";

import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import React from "react";
import { getUserName } from "../App";

const likeButton = (
  <svg aria-label="Like" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
  </svg>
);

const commentButton = (
  <svg aria-label="Comment" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
    <path
      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);

const shareButton = (
  <svg aria-label="Dela inlägg" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
    <line
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="22"
      x2="9.218"
      y1="3"
      y2="10.083"
    ></line>
    <polygon
      fill="none"
      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

const savePostButton = (
  <svg aria-label="Spara" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24">
    <polygon
      fill="none"
      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

// Function used to get posts made by user to later update display name
async function getPostFromDB(postID) {
  const postRef = doc(getFirestore(), "posts", postID);
  const currentLikes = (await getDoc(postRef)).data().likes;
  console.log(currentLikes);
  return { postRef, currentLikes };
}

async function updateLikesOnPost(post) {
  if (post.currentLikes.includes(getUserName())) {
    return null;
  }
  return updateDoc(post.postRef, { likes: [...post.currentLikes, getUserName()] });
}

async function handleLikingPost(e) {
  const cardID = e.target.parentNode.parentNode.parentNode.id;
  const likeButton = e.target.parentNode;
  likeButton.classList.add("paintRed");
  const post = await getPostFromDB(cardID);
  updateLikesOnPost(post);
}

const Card = (props) => {
  const { name, imageUrl, text, timestamp, profilePicUrl, likes, id } = props.post;

  // TODO: Fix timestamp
  return (
    <div className="card" id={id}>
      <div className="cardAuthor">
        <img src={profilePicUrl} alt="author" />
        <span>{name}</span>
      </div>

      <div className="cardImgContent">
        <img src={imageUrl} alt="content" />
      </div>
      {console.log(getUserName())}
      <div className="actionButtons">
        <span
          id="likeButton"
          className={likes.includes(getUserName()) ? "paintRed" : ""}
          onClick={(e) => handleLikingPost(e)}
        >
          {likeButton}
        </span>
        <span>{commentButton}</span>
        <span>{shareButton}</span>
        <span>{savePostButton}</span>
      </div>
      <div className="numLikes">{!!likes ? `${likes.length} likes` : " - likes"}</div>
      <div className="cardTextContent">{text}</div>
      <div className="cardContainerBottom">
        <div className="cardShowComments">See all comments</div>
        <div className="datetimePosted">timestamp</div>
        <div className="addComment">Add a comment</div>
      </div>
    </div>
  );
};

export default Card;
