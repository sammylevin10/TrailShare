import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faStopwatch,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

function StravaActivity() {
  return (
    <a className="StravaActivityButton" href="/compose-post">
      <div className="StravaActivity">
        <div className="Column1">
          <h2>Title of Activity</h2>
        </div>
        <div className="Column2">
          <div className="StatBar">
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faCalendarAlt} />
              <p>01/01/0001</p>
            </div>
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faStopwatch} />
              <p>00:00</p>
            </div>
            <div className="Stat">
              <FontAwesomeIcon className="Icon" icon={faFlag} />
              <p>00.0 mi</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default StravaActivity;
