import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../Firebase";
import { Grid } from "@material-ui/core";
import MatchedUserCard from "./cards";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
  },
}));

// Note: CardGrid component must be wrapped in a Grid container in order to function properly
const CardGrid = () => {
  const fb = useContext(FirebaseContext);
  const [docs, setDocs] = useState([]);
  const classes = useStyles();

  // Pass a callback to handle the data.  Don't forget the empty array as second parameter of useEffect.
  useEffect(
    () =>
      fb.doGetAllUsers((snapShot) => {
        const tempDocs = [];
        snapShot.forEach((doc) => {
          tempDocs.push(doc.data());
        });
        setDocs([...tempDocs]);
      }),
    [fb]
  );

  return (
    <Grid item xs={9} className={classes.root}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        {docs.map((user, i) => (
          <MatchedUserCard
            key={`${i}-${user.name}`}
            index={i}
            picUrl={user.picUrl}
            firstName={user.firstName}
            lastName={user.lastName}
            city={user.city}
            state={user.state}
            specialty={user.specialty}
            frontEnd={user.frontendTechStack}
            backEnd={user.backendTechStack}
            preferredTech={user.preferredTechStack}
            codingTimes={user.preferredCodingTime}
            bio={user.bio}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default CardGrid;
