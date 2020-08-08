// Liam
import React, { Fragment, useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Button,
  Popover,
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
    maxHeight: 300,
  },
  avatar: () => {
    return {
      width: theme.spacing(8),
      height: theme.spacing(8),
      backgroundColor:
        colors[`${Math.round(Math.random() * (colors.length - 1))}`][500],
    };
  },
  typography: {
    padding: theme.spacing(2),
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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid item xs={4} className={classes.root}>
      <Card>
        <CardHeader
          avatar={
            // Can change these ternary operators to reflect
            // when a user profile image is found (or not found) on the server
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
            :{" "}
            {frontEnd.map((tech, i) => {
              return i !== frontEnd.length - 1 ? `${tech}, ` : `${tech}`;
            })}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Back-End</b>
            </u>
            :{" "}
            {backEnd.map((tech, i) => {
              return i !== backEnd.length - 1 ? `${tech}, ` : `${tech}`;
            })}
          </Typography>
          <br />
          {/* Grid container is used for contact/social media link icons (email, twitter, instagram, etc.) that will go along with Bio button */}
          <Grid container>
            <Grid item xs={2}>
              <Button
                aria-describedby={id}
                variant="contained"
                color="default"
                fullWidth
                onClick={handleClick}
              >
                Bio
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.typography}>
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      {status}
                    </Typography>
                    <br />
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      <u>
                        <b>Favorite Tech</b>
                      </u>
                      :{" "}
                      {preferredTech.map((tech, i) => {
                        return i !== preferredTech.length - 1
                          ? `${tech}, `
                          : `${tech}`;
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      <u>
                        <b>Prefers coding in the...</b>
                      </u>{" "}
                      {codingTimes.map((codingTime, i) => {
                        return codingTimes.length > 2 &&
                          i !== codingTimes.length - 1 &&
                          i !== codingTimes.length - 2
                          ? `${codingTime}, `
                          : i !== codingTimes.length - 1
                          ? `${codingTime} & `
                          : `${codingTime}.`;
                      })}
                    </Typography>
                  </CardContent>
                </Typography>
              </Popover>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MatchedUserCard;
