import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faStopwatch,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

function StravaActivity({ data }) {
  return (
    <a className="StravaActivityButton" href="/compose-post">
      <div className="StravaActivity">
        <div className="Column1">
          <h2>{data.name}</h2>
        </div>
        <div className="Column2">
          <div className="StatBar">
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faCalendarAlt} />
              <p>{data.start_date_local.substring(1, 10)}</p>
            </div>
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faStopwatch} />
              <p>{(data.moving_time / 60).toFixed(1) + " min"}</p>
            </div>
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faFlag} />
              <p>{(data.distance / 1000).toFixed(1) + " km"}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default StravaActivity;
