// Liam
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../Firebase";
import { Grid } from "@material-ui/core";
import MatchedUserCard from "./cards";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
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
        // console.log(tempDocs);
        setDocs([...tempDocs]);
        console.log(docs);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fb]
  );

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {docs.map((user, i) => (
          <MatchedUserCard
            key={`${i}-${user.name}`}
            index={i}
            photoURL={user.photoURL}
            firstName={user.firstName}
            lastName={user.lastName}
            city={user.city}
            state={user.state}
            specialty={user.specialty}
            frontEnd={user.frontendTechStack}
            backEnd={user.backendTechStack}
            preferredTech={user.preferredTechStack}
            codingTimes={user.preferredCodingTime}
            status={user.status}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default CardGrid;
