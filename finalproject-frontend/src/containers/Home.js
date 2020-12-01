import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post";

function Home({ postsArray }) {
  const [sampleAPIData, setSampleAPIData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000`)
      .then(function (response) {
        if (response.data) {
          setSampleAPIData(response.data);
          console.log("sampleAPIData State Variable: ", sampleAPIData);
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }, []);

  if (postsArray) {
    console.log("at home", postsArray);
    return (
      <div className="Home">
        {/* Data.map(element, iterator) is a function that acts like an enhanced for loop. It parses through each element in the iterable type */}
        {/* For every object in postsArray, generate Post */}
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
