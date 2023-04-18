import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";
import Post from "../components/Post";
import Ellipsis from "react-spinners-css";

function UserProfile({ LogoutFunction, userData, postsArray }) {
  let postsDisplayed = 0;
  // LogoutFunction();

  if (postsArray && userData) {
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
            <p>{userData.distance} km</p>
          </div>
          <div className="Stat">
            <FontAwesomeIcon className="Icon" icon={faHeart} />
            <p>{userData.likes} likes</p>
          </div>
        </div>
        <button onClick={(e) => LogoutFunction(e)}>Sign Out</button>
        <div className="Spacer"></div>
        <h2>Trails that you've shared</h2>
        {postsArray.map((postData, i) => {
          if (i == 0) {
            postsDisplayed = 0;
          }
          if (postData.author == userData.name) {
            postsDisplayed += 1;
            return <Post key={i} data={postData} />;
          }
          if (postsArray.length == i + 1 && postsDisplayed == 0) {
            return <p className="ErrorText">You haven't shared any trails.</p>;
          }
        })}
      </div>
    );
  } else {
    LogoutFunction();
    return (
      <div className="LoadingWrapper">
        <Ellipsis color="#2eb157" size={100} />
      </div>
    );
  }
}

export default UserProfile;
