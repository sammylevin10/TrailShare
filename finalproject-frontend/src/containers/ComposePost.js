import React from "react";
import PostForm from "../components/PostForm";

function ComposePost({ userData }) {
  return (
    <div className="ComposePost">
      <h2>Share "Strava Activity" with your locality</h2>
      <PostForm userData={userData} />
    </div>
  );
}

export default ComposePost;
