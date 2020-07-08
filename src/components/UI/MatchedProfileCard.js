import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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

const colorPalette = [
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
    maxWidth: 300,
  },
  expandClosed: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor:
      // Assign a random avatar color to users that do not have a profile picture
      colorPalette[
        `${Math.floor(Math.random() * (colorPalette.length + 1))}`
      ][500],
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const MatchedProfileCard = () => {
  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              variant="square"
              alt="Matched User Name Goes Here"
              aria-label="profile-picture"
              className={classes.avatar}
            />
          }
        />
      </Card>
    </div>
  );
};

export default MatchedProfileCard;
