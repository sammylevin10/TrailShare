import React from "react";

function PostForm() {
  return (
    <div>
      <form
        className="PostForm"
        action="http://localhost:4000/create/submit"
        method="post"
      >
        <input type="text" name="title" placeholder="Name your trail" />
        <textarea
          type="text"
          name="description"
          placeholder="Describe your trail (1-3 sentences)"
        ></textarea>
        <a href="/">
          <button>Share</button>
        </a>
      </form>
      <iframe title="hiddenTarget" width="0" height="0" border="0"></iframe>
    </div>
  );
}

export default PostForm;
