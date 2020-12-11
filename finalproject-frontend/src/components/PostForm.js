import axios from "axios";
import React from "react";

function PostForm({ userData, id, activitiesArray }) {
  function goHome(e) {
    e.preventDefault();
    window.location = "/";
  }
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
    console.log(title);
    axios
      .get(
        `http://localhost:4000/create/submit?author=${author}&bike=${bike}&description=${description}&distance=${distance}&lat=${lat}&lng=${lng}&likes=${likes}&polyline=${polyline}&title=${title}`
      )
      .then(function (response) {
        console.log({ SUCCESS: response });
      })
      .catch(function (error) {
        console.log("Error creating post", error);
      });
  }

  return (
    <div>
      <form className="PostForm" onSubmit={(e) => postTrail(e)}>
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
      <iframe
        style={{ display: "none" }}
        name="hiddenTarget"
        title="hiddenTarget"
        id="hiddenTarget"
        width="0"
        height="0"
        border="0"
      ></iframe>
    </div>
  );
}

export default PostForm;
