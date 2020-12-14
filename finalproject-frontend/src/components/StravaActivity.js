import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCalendarAlt,
  faStopwatch,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

function StravaActivity({ data }) {
  const [dateString, setDateString] = useState(null);
  const [duration, setDuration] = useState(null);
  useEffect(() => {
    let dateSubstring = data.start_date_local.substring(1, 10);
    let year = dateSubstring.substring(1, 3);
    let month = dateSubstring.substring(4, 6);
    let date = dateSubstring.substring(7, 9);
    setDateString(date + "/" + month + "/" + year);
    let time = data.moving_time / 60;
    let hours = (time / 60).toFixed(0);
    let minutes = (time % 60).toFixed(0);
    let hoursString = hours.toString();
    let minutesString = minutes.toString();
    if (hoursString.length == 1) {
      hoursString = "0" + hoursString;
    }
    if (minutesString.length == 1) {
      minutesString = "0" + minutesString;
    }
    setDuration(hoursString + ":" + minutesString);
  }, [data]);
  return (
    <Link
      className="StravaActivityButton"
      to={`compose-post/${data.upload_id}`}
    >
      <div className="StravaActivity">
        <div className="Column1">
          <h2>{data.name}</h2>
        </div>
        <div className="Column2">
          <div className="StatBar">
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faCalendarAlt} />
              <p>{dateString}</p>
            </div>
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faStopwatch} />
              <p>{duration}</p>
            </div>
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faFlag} />
              <p>{(data.distance / 1000).toFixed(1) + " km"}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default StravaActivity;
