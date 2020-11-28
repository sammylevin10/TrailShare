import React from "react";

function PostForm() {
  return (
    <div>
      <form className="PostForm">
        <input type="text" name="postTitle" placeholder="Name your trail" />
        <textarea
          type="text"
          name="postDescription"
          placeholder="Describe your trail (1-3 sentences)"
        ></textarea>
        <button>Share</button>
      </form>
    </div>
  );
}

export default PostForm;
