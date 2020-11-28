import React from "react";

import StravaActivity from "../components/StravaActivity";

function SelectActivity() {
  return (
    <div className="SelectActivity">
      <h2>Select a Strava Activity to share with your locality</h2>
      <StravaActivity />
      <StravaActivity />
      <StravaActivity />
    </div>
  );
}

export default SelectActivity;
