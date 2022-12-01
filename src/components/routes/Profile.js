import React from "react";
import { updateProfile } from "firebase/auth";

const Profile = (props) => {
  let { photoURL, displayName, email } = props.auth.currentUser;
  function handleDisplayNameUpdate(e) {
    e.preventDefault();

    let newDisplayName = e.target.value;

    updateProfile(props.auth.currentUser, {
      displayName: newDisplayName,
    })
      .then(() => {
        // Profile updated!
        console.log("Profile name updated to: " + newDisplayName);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div>
      <div>
        {console.log(props.auth.currentUser)}
        <img src={props.auth.currentUser.photoURL} alt="profilePic" />
        <input type="text" defaultValue={displayName} onBlur={handleDisplayNameUpdate}></input>
        <p>{props.auth.currentUser.email}</p>
      </div>
      <div>All of users posts here</div>
    </div>
  );
};

export default Profile;
