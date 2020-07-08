import React from "react";
import Grid from "@material-ui/core/Grid";
import MatchCard from "./components/UI/MatchCard";
import mockData from "./data/mockData";

function App() {
  return (
    <div className="App">
      <Grid container direction="row" justify="center" alignItems="center">
        {mockData.map((user, i) => (
          <MatchCard
            index={i}
            picUrl={user.picUrl}
            name={user.name}
            city={user.city}
            state={user.state}
            specialty={user.specialty}
            frontEnd={user["Front-End Tech-Stack"]}
            backEnd={user["Back-End Tech-Stack"]}
            preferredTech={user["Preferred Tech-Stack"]}
            codingTimes={user["Preferred Coding Time"]}
            bio={user.bio}
          />
        ))}
      </Grid>
    </div>
  );
}

export default App;
