import React from "react";

import StravaActivity from "../components/StravaActivity";

function SelectActivity({ activitiesArray }) {
  if (activitiesArray) {
    console.log("select activity received", activitiesArray);
    return (
      <div className="SelectActivity">
        <h2>Select a Strava activity to share with your locality</h2>
        {/* Data.map(element, iterator) is a function that acts like an enhanced for loop. It parses through each element in the iterable type */}
        {/* For every object in addData, generate Post */}
        {activitiesArray.map((activityData, i) => (
          <StravaActivity key={i} data={activityData} />
        ))}
      </div>
    );
  } else {
    return <div className="Home">Loading...</div>;
  }
}

export default SelectActivity;
