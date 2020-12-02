import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";

function Home({ postsArray }) {
  if (postsArray) {
    return (
      <div className="Home">
        {/* Data.map(element, iterator) is a function that acts like an enhanced for loop. It parses through each element in the iterable type */}
        {/* For every object in addData, generate Post */}
        {postsArray.map((postData, i) => (
          <Post key={i} data={postData} />
        ))}
      </div>
    );
  } else {
    return <div className="Home">Loading...</div>;
  }
}

export default Home;
