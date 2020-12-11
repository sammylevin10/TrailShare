import React from "react";

function PostForm({ userData, id, activitiesArray }) {
  function goHome(e) {
    e.preventDefault();
    window.location = "/";
  }

  const activity = activitiesArray.find(({ upload_id }) => upload_id == id);
  console.log("activity", activity);

  return (
    <div>
      <form
        className="PostForm"
        action="http://localhost:4000/create/submit"
        method="post"
        target="hiddenTarget"
      >
        <input type="text" name="title" placeholder="Name your trail" />
        <textarea
          type="text"
          name="description"
          placeholder="Describe your trail (1-3 sentences)"
        ></textarea>
        <input type="hidden" name="author" value={userData.name} />
        <input type="hidden" name="likes" value="0" />
        <input type="hidden" name="distance" value="0" />
        <button onClick={goHome}>Share</button>
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
