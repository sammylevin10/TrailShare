import React from "react";
import PostForm from "../components/PostForm";
import { useParams } from "react-router-dom";

function ComposePost({ userData, activitiesArray }) {
  let { id } = useParams();

  return (
    <div className="ComposePost">
      <h2>Share this trail with your locality</h2>
      <PostForm userData={userData} id={id} activitiesArray={activitiesArray} />
    </div>
  );
}

export default ComposePost;
