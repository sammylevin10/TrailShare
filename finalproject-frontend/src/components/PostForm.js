import axios from "axios";
import React from "react";

function PostForm({ userData, id, activitiesArray }) {
  const activity = activitiesArray.find(({ upload_id }) => upload_id == id);

  function postTrail(e) {
    e.preventDefault();
    const author = userData.name;
    const bike = activity.type == "Ride";
    const description = e.currentTarget.description.value;
    const distance = activity.distance;
    const lat = activity.start_latitude;
    const lng = activity.start_longitude;
    const likes = 0;
    const polyline = activity.map.summary_polyline;
    const title = e.currentTarget.title.value;
    const email = userData.email;
    axios
      .get(
        `http://localhost:4000/create/submit?email=${email}&author=${author}&bike=${bike}&description=${description}&distance=${distance}&lat=${lat}&lng=${lng}&likes=${likes}&polyline=${polyline}&title=${title}`
      )
      .catch(function (error) {
        console.warn("Error creating post", error);
      });
    window.location = "/";
  }

  return (
    <div>
      <form className="PostForm" onSubmit={(e) => postTrail(e)} action="/">
        <input type="text" name="title" placeholder="Name your trail" />
        <textarea
          type="text"
          name="description"
          placeholder="Describe your trail (1-3 sentences)"
        ></textarea>
        <input type="hidden" name="likes" value="0" />
        <input type="hidden" name="distance" value="0" />
        <button>Share</button>
      </form>
    </div>
  );
}

export default PostForm;
