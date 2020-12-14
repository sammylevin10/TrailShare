import { React, useEffect, useState } from "react";
import GoogleMap from "google-map-react";
import decodePolyline from "decode-google-map-polyline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function Post({ data }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [encodedPolyline, setEncodedPolyline] = useState(null);

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
      .get("https://secure-ocean-28880.herokuapp.com/like", {
        params: { title: data.title, num: increment, email: data.email },
      })
      .catch(function (error) {
        console.warn("error", error);
      });
  }

  // Hook to initially set likes to reflect that of database
  // It also initializes polyline
  useEffect(() => {
    if (data.likes) {
      setLikes(data.likes);
    }
    setEncodedPolyline(decodePolyline(data.polyline));
  }, [data]);

  // Function to decode and render polyline data
  function renderPolylines(map, maps) {
    let nonGeodesicPolyline = new maps.Polyline({
      path: encodedPolyline,
      geodesic: false,
      strokeColor: "#27c659",
      strokeOpacity: 1,
      strokeWeight: 4,
    });
    nonGeodesicPolyline.setMap(map);
    fitBounds(map, maps);
  }

  // Function to resize map bounds based on polyline
  function fitBounds(map, maps) {
    var bounds = new maps.LatLngBounds();
    for (let marker of encodedPolyline) {
      bounds.extend(new maps.LatLng(marker.lat, marker.lng));
    }
    map.fitBounds(bounds, -30);
  }

  return (
    <div className="Post">
      <div className="Column1">
        <div className="Map-Container">
          <div className="Map" style={{ height: "100%", width: "100%" }}>
            <GoogleMap
              bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
              defaultCenter={{ lat: data.lat, lng: data.lng }}
              defaultZoom={5}
              yesIWantToUseGoogleMapApiInternals={true}
              options={{
                styles: require(`../components/MapStyle.json`),
              }}
              onGoogleApiLoaded={({ map, maps }) => renderPolylines(map, maps)}
            ></GoogleMap>
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
              className="IconGreen"
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
