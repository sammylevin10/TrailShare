import { React, useEffect, useState } from "react";
import GoogleMap from "google-map-react";
// import {
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   Polyline,
// } from "react-google-maps";
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

  const testCoords = [
    { lat: 36.05298765935, lng: -112.083756616339 },
    { lat: 36.2169884797185, lng: -112.056727493181 },
  ];

  // STRATEGY:
  // Install google maps react instead of map react so you can use polyline component
  // Follow this thread https://stackoverflow.com/questions/45427635/how-to-create-polyline-using-react-google-maps-library
  // Decode the encoded polyline using some package
  // Use this fiddle to help http://jsfiddle.net/sv12dwp3/

  let markers =
    // { lat: 53.42728, lng: -6.24357 },
    // { lat: 43.681583, lng: -79.61146 },
    [
      {
        lat: 40.69212,
        lng: -73.98489,
      },
      {
        lat: 40.69207,
        lng: -73.98503,
      },
      {
        lat: 40.69219,
        lng: -73.9851,
      },
      {
        lat: 40.69219,
        lng: -73.98519,
      },
      {
        lat: 40.69213,
        lng: -73.98546,
      },
    ];
  // let center = [47.367347, 8.5500025];
  let zoom = 4;

  function renderPolylines(map, maps) {
    /** Example of rendering geodesic polyline */
    let geodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: true,
      strokeColor: "#00a1e1",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });
    geodesicPolyline.setMap(map);

    /** Example of rendering non geodesic polyline (straight line) */
    let nonGeodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: false,
      strokeColor: "#e4e4e4",
      strokeOpacity: 0.7,
      strokeWeight: 3,
    });
    nonGeodesicPolyline.setMap(map);

    fitBounds(map, maps);
  }

  function fitBounds(map, maps) {
    var bounds = new maps.LatLngBounds();
    for (let marker of markers) {
      bounds.extend(new maps.LatLng(marker.lat, marker.lng));
    }
    map.fitBounds(bounds);
  }

  return (
    <div className="Post">
      <div className="Column1">
        <div className="Map-Container">
          <div className="Map" style={{ height: "100%", width: "100%" }}>
            {center !== null && (
              <GoogleMap
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
                // style={{ height: "100vh", width: "100%" }}
                defaultCenter={{ lat: data.lat, lng: data.lng }}
                defaultZoom={14}
                onGoogleApiLoaded={({ map, maps }) =>
                  renderPolylines(map, maps)
                }
              >
                {/* <Marker text={"DUB"} lat={53.42728} lng={-6.24357} />
                <Marker text={"YYZ"} lat={43.681583} lng={-79.61146} /> */}
              </GoogleMap>
              // <GoogleMapReact
              //   bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
              //   defaultCenter={{ lat: data.lat, lng: data.lng }}
              //   defaultZoom={14}
              //   // Custom styling for the map, set to the color scheme of the website
              //   options={{
              //     styles: require(`../components/MapStyle.json`),
              //   }}
              // >
              //   <Polyline
              //     path={testCoords}
              //     options={{
              //       strokeColor: "#00ffff",
              //       strokeOpacity: 1,
              //       strokeWeight: 10,
              //       icons: [
              //         {
              //           icon: "hello",
              //           offset: "0",
              //           repeat: "10px",
              //         },
              //       ],
              //     }}
              //   />
              // </GoogleMapReact>
              // <script src= {`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}`} ></script>
              // <GoogleMap
              //   bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
              //   defaultZoom={14}
              //   defaultCenter={{ lat: data.lat, lng: data.lng }}
              // >
              //   {/*for creating path with the updated coordinates*/}
              //   <Polyline
              //     path={testCoords}
              //     geodesic={true}
              //     options={{
              //       strokeColor: "#ff2527",
              //       strokeOpacity: 0.75,
              //       strokeWeight: 2,
              //       // icons: [
              //       //   {
              //       //     icon: lineSymbol,
              //       //     offset: "0",
              //       //     repeat: "20px",
              //       //   },
              //       // ],
              //     }}
              //   />
              // </GoogleMap>
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
