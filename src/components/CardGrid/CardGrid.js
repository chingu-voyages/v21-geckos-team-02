import React from "react";
import { Grid } from "@material-ui/core";
import ProfileCard from "./ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import mockData from "../../data/mockData";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
  },
}));

const CardGrid = () => {
  const classes = useStyles();

  return (
    <Grid item xs={9} className={classes.root}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        {mockData.map((user, i) => (
          <ProfileCard
            key={`${i}-${user.name}`}
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
    </Grid>
  );
};

export default CardGrid;
