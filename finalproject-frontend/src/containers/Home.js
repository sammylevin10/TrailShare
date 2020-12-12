import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";

function Home({ postsArray }) {
  const [bike, setBike] = useState(true);
  const [radius, setRadius] = useState(50);

  function handleBikeRun(e) {
    e.preventDefault();
    let value = e.currentTarget.value;
    if (value == "cycling") {
      setBike(true);
    } else {
      setBike(false);
    }
    console.log(bike);
  }

  function handleRadius(e) {
    e.preventDefault();
    let value = e.currentTarget.value;
  }

  if (postsArray) {
    return (
      <div className="Home">
        <p className="TrailParameters">
          Find{" "}
          <select name="bikeRun" onChange={(e) => handleBikeRun(e)}>
            <option value="cycling">cycling</option>
            <option value="running">running</option>
          </select>{" "}
          trails that are within{" "}
          <select name="radius" onChange={(e) => handleRadius(e)}>
            <option value="50">50 km</option>
            <option value="150">150 km</option>
            <option value="300">300 km</option>
            <option value="inf">∞ km</option>
          </select>{" "}
          of my current location
        </p>
        {/* Data.map(element, iterator) is a function that acts like an enhanced for loop. It parses through each element in the iterable type */}
        {/* For every object in addData, generate Post */}
        {postsArray.map((postData, i) => {
          if (postData.bike == bike) {
            return <Post key={i} data={postData} />;
          }
        })}
      </div>
    );
  } else {
    return <div className="Home">Loading...</div>;
  }
}

export default Home;
