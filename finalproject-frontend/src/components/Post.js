import { React, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function Post({ data }) {
  const [center, setCenter] = useState({
    lat: 59.95,
    lng: 30.33,
  });
  let [liked, setLiked] = useState(false);
  let [likes, setLikes] = useState(0);

  // Function to increment likes state variable and increment likes in firestore
  // Uses optimistic rendering strategy (assume local likes value matches firestore likes)
  function likeUnlike() {
    let increment = 1;
    if (liked) {
      increment = -1;
    }
    setLiked(!liked);
    setLikes(likes + increment);
    axios
      .get("http://localhost:4000/like", {
        params: { title: data.title, num: increment, email: data.email },
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }

  // Hook to initially set likes to reflect that of database
  // It also initializes center
  useEffect(() => {
    if (data.likes) {
      setLikes(data.likes);
    }
    let newCenter = {
      lat: data.lat,
      lng: data.lng,
    };
    console.log(newCenter);
  }, [data]);

  return (
    <div className="Post">
      <div className="Column1">
        <div className="Map-Container">
          <div className="Map" style={{ height: "100%", width: "100%" }}>
            {center !== null && (
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
                defaultCenter={{ lat: data.lat, lng: data.lng }}
                defaultZoom={14}
                // Custom styling for the map, set to the color scheme of the website
                options={{
                  styles: require(`../components/MapStyle.json`),
                }}
              ></GoogleMapReact>
            )}
          </div>
        </div>
      </div>
      <div className="Column2">
        <h2>{data.title}</h2>
        <h3>{data.author}</h3>
        <p>{data.description}</p>
        <div className="Stat">
          <FontAwesomeIcon className="Icon" icon={faFlag} />
          <p>{(data.distance / 1000).toFixed(1) + " km"}</p>
        </div>
        <div className="Stat">
          {liked ? (
            <FontAwesomeIcon
              onClick={likeUnlike}
              className="Icon"
              icon={faHeart}
            />
          ) : (
            <FontAwesomeIcon
              onClick={likeUnlike}
              className="Icon"
              icon={farHeart}
            />
          )}

          <p>{likes + " likes"}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
