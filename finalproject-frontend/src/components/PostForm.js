import React from "react";

function PostForm() {
  return (
    <div>
      <form
        className="PostForm"
        action="http://localhost:4000/create/submit"
        method="post"
        target="hiddenFrame"
      >
        <input type="text" name="postTitle" placeholder="Name your trail" />
        <textarea
          type="text"
          name="postDescription"
          placeholder="Describe your trail (1-3 sentences)"
        ></textarea>
        <button>
          <a href="/">Share</a>
        </button>
      </form>
      <iframe name="hiddenFrame" width="0" height="0" border="0"></iframe>
    </div>
  );
}

export default PostForm;
