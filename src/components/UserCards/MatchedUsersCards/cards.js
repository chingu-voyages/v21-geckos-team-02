import React, { Fragment } from "react";
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  pink,
  red,
  blue,
  blueGrey,
  green,
  teal,
  orange,
  deepOrange,
  purple,
  deepPurple,
  indigo,
} from "@material-ui/core/colors";

const colors = [
  pink,
  red,
  blue,
  blueGrey,
  green,
  teal,
  orange,
  deepOrange,
  purple,
  deepPurple,
  indigo,
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "auto",
    minHeight: 300,
    maxHeight: 400,
    minWidth: 300,
    maxWidth: 400,
    background: "lavenderblush",
  },
  avatar: () => {
    return {
      borderRadius: "50%",
      width: theme.spacing(8),
      height: theme.spacing(8),
      backgroundColor:
        colors[`${Math.round(Math.random() * (colors.length - 1))}`][500],
    };
  },
  typography: {
    padding: theme.spacing(2),
  },
  card: {
    height: "340px",
  },
}));

const MatchedUserCard = ({
  index,
  photoURL,
  firstName,
  lastName,
  city,
  state,
  specialty,
  frontEnd,
  backEnd,
  preferredTech,
  codingTimes,
  status,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={3} className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            photoURL !== null && photoURL !== undefined ? (
              <Avatar
                variant="rounded"
                alt={`Matched User ${index}`}
                aria-label="matched-user-profile-picture"
                className={classes.avatar}
                src={`${photoURL}`}
              />
            ) : (
              <Avatar
                variant="rounded"
                alt={`Matched User ${index}`}
                aria-label="matched-user-profile-picture"
                className={classes.avatar}
              >
                {firstName.substring(0, 1)}
              </Avatar>
            )
          }
          title={
            <Typography variant="body1" color="textPrimary" component="h1">
              {`${firstName} ${lastName}`}
            </Typography>
          }
          subheader={
            // React.Fragment acts as a container without rendering a div to the HTML document
            <Fragment>
              <Typography variant="body2" color="textSecondary" component="h2">
                {`${city}, ${state}`}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h2"
              ></Typography>
            </Fragment>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Specialty</b>
            </u>
            : {specialty}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Front-End</b>
            </u>
            : {frontEnd}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Back-End</b>
            </u>
            : {backEnd}
          </Typography>

          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Preferred Tech</b>
            </u>
            : {preferredTech}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Favorite Coding Time: </b>
            </u>{" "}
            <strong>{codingTimes}</strong>
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            About me: {status}
          </Typography>
          <br />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MatchedUserCard;
