import React, { Fragment, useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

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
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: () => {
    return {
      width: theme.spacing(7),
      height: theme.spacing(7),
      backgroundColor:
        colors[`${Math.round(Math.random() * (colors.length - 1))}`][500],
    };
  },
}));

const MatchCard = (user) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={3}>
      <Card>
        <CardHeader
          avatar={
            // Can change these ternary operators to reflect
            // when a user profile image is found (or not found) on the server
            user.picUrl !== null && user.picUrl !== undefined ? (
              <Avatar
                variant="rounded"
                alt={`Matched User ${user.index}`}
                aria-label="matched-user-profile-picture"
                className={classes.avatar}
                src={`${user.picUrl}`}
              />
            ) : (
              <Avatar
                variant="rounded"
                alt={`Matched User ${user.index}`}
                aria-label="matched-user-profile-picture"
                className={classes.avatar}
              >
                {user.name.substring(0, 1)}
              </Avatar>
            )
          }
          title={
            <Typography variant="body1" color="textPrimary" component="h1">
              {`${user.name}`}
            </Typography>
          }
          subheader={
            // React.Fragment acts as a container without rendering a div to the HTML document
            <Fragment>
              <Typography variant="body2" color="textSecondary" component="h2">
                {`${user.city}, ${user.state}`}
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
            : {user.specialty}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Front-End Stack</b>
            </u>
            :{" "}
            {user.frontEnd.map((tech, i) => {
              return i !== user.frontEnd.length - 1 ? `${tech}, ` : `${tech}`;
            })}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Back-End Stack</b>
            </u>
            :{" "}
            {user.backEnd.map((tech, i) => {
              return i !== user.backEnd.length - 1 ? `${tech}, ` : `${tech}`;
            })}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Favorite Tech:</b>
            </u>
            :{" "}
            {user.preferredTech.map((tech, i) => {
              return i !== user.preferredTech.length - 1
                ? `${tech}, `
                : `${tech}`;
            })}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            <u>
              <b>Prefers coding in the</b>
            </u>
            ...{" "}
            {user.codingTimes.map((codingTime, i) => {
              return user.codingTimes.length > 2 &&
                i !== user.codingTimes.length - 1 &&
                i !== user.codingTimes.length - 2
                ? `${codingTime}, `
                : i !== user.codingTimes.length - 1
                ? `${codingTime} & `
                : `${codingTime}.`;
            })}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            className={classes.expand}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Typography variant="body1" color="textPrimary" component="p">
              <b>Bio</b>
            </Typography>
            <ExpandMoreIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
            />
          </IconButton>
        </CardActions>
        <Collapse in={expanded}>
          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
              {user.bio}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default MatchCard;
