import { React, useState } from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faHeart } from "@fortawesome/free-solid-svg-icons";

function Post({ data }) {
  const [center, setCenter] = useState({
    lat: 59.95,
    lng: 30.33,
  });
  return (
    <div className="Post">
      <div className="Column1">
        <div className="Map-Container">
          <div className="Map" style={{ height: "100%", width: "100%" }}>
            {center !== null && (
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
                defaultCenter={center}
                defaultZoom={13}
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
          <p>{data.distance + " mi"}</p>
        </div>
        <div className="Stat">
          <FontAwesomeIcon className="Icon" icon={faHeart} />
          <p>{data.likes + " likes"}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;