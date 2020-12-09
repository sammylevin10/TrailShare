import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";

function UserProfile({ LogoutFunction, userData }) {
  return (
    <div className="UserProfile">
      <h2>{userData.name}</h2>
      <p>{userData.email}</p>
      <p>{userData.uid}</p>
      <div className="StatBar">
        <div className="Stat">
          <FontAwesomeIcon className="Icon" icon={faPen} />
          <p>{userData.posts} posts</p>
        </div>
        <div className="Stat">
          <FontAwesomeIcon className="Icon" icon={faFlag} />
          <p>{userData.distance} mi</p>
        </div>
        <div className="Stat">
          <FontAwesomeIcon className="Icon" icon={faHeart} />
          <p>{userData.likes} likes</p>
        </div>
      </div>
      <button onClick={(e) => LogoutFunction(e)}>Sign Out</button>
    </div>
  );
}

export default UserProfile;
