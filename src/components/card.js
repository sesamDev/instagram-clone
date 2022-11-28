import "../styles/Card.css";

import React from "react";

const Card = () => {
  return (
    <div className="card">
      <div className="author">Author</div>
      <div className="cardContent">Image here</div>
      <div className="actionButtons">Like button etc</div>
      <div className="numLikes">Number of likes</div>
      <div className="cardTextContent">Text content</div>
      <div className="cardShowComments">See all comments</div>
      <div className="datetimePosted">2 hours ago</div>
      <div className="addComment">Add a comment</div>
    </div>
  );
};

export default Card;
