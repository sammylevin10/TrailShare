import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

function StravaAuthenticate() {
  useEffect(() => {
    const url = window.location.href;
    const parsed = queryString.parse(url);
    localStorage.setItem("stravaAuthentication", JSON.stringify(parsed));
    const received = JSON.parse(localStorage.getItem("stravaAuthentication"));
    axios
      .post(
        `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&client_secret=${process.env.REACT_APP_STRAVA_CLIENT_SECRET}&code=${received.code}&grant_type=authorization_code`
      )
      .then(function (response) {
        console.log(
          "After generating the code from OAuth, here is the response that includes refresh token",
          response.data
        );
        localStorage.setItem("stravaRefreshToken", response.data.refresh_token);
      })
      .catch(function (error) {
        console.log("error", error);
        // console.log(error.response);
      });
    window.location = "/";
  }, []);

  return <div className="Home"></div>;
}

export default StravaAuthenticate;
