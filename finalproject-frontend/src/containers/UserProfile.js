import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";

function UserProfile() {
  return (
    <div className="UserProfile">
      <h2>Firstname Lastname</h2>
      <div className="StatBar">
        <div className="Stat">
          <FontAwesomeIcon className="Icon" icon={faPen} />
          <p>0 posts</p>
        </div>
        <div className="Stat">
          <FontAwesomeIcon className="Icon" icon={faFlag} />
          <p>00.0 mi</p>
        </div>
        <div className="Stat">
          <FontAwesomeIcon className="Icon" icon={faHeart} />
          <p>0 likes</p>
        </div>
      </div>
      <button>Sign Out</button>
    </div>
  );
}

export default UserProfile;
