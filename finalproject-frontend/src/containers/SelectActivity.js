import StravaActivity from "../components/StravaActivity";

function SelectActivity({ activitiesArray }) {
  if (activitiesArray) {
    return (
      <div className="SelectActivity">
        <h2>Select a Strava activity to share with your locality</h2>
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
