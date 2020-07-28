import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 705,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  container: {
    width: "100%",
    position: "relative",
    dipslay: "flex",
  },
  pencil: {
    cursor: "pointer",
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProfileSummary() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <Link to="/edit-forms">
          <EditIcon className={classes.pencil} />
        </Link>
      </div>

      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          About me
        </Typography>
        <Typography variant="body2" component="h2">
          {bull}First Name:
        </Typography>
        <br />
        <Typography variant="body2" component="h2">
          {bull}Last Name:
        </Typography>
        <br />
        <Typography variant="body2" component="h2">
          {bull}Specialty:
        </Typography>
        <br />
        <Typography variant="body2" component="h2">
          {bull}Favorite Coding Time:
        </Typography>
        <br />
        <Typography variant="body2" component="h2">
          {bull}Front End Tech Stack:
        </Typography>
        <br />
        <Typography variant="body2" component="h2">
          {bull}Back End Tech Stack:
        </Typography>
        <br />
        <Typography variant="body2" component="h2">
          {bull}Preferred Tech:
        </Typography>
        <br />
        <Typography variant="body2" component="h2">
          {bull}Introduce yourself:
        </Typography>
      </CardContent>
    </Card>
  );
}
