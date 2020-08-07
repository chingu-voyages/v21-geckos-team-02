import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

const styles = (theme) => ({
  snackbar: {
    margin: "-25px",
    background: "#43A047",
    display: "flex",
    padding: "10px 10px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
});

function SuccessMessages(props) {
  const { classes } = props;

  return (
    <div>
      <SnackbarContent
        className={classes.snackbar}
        message={
          <span className={classes.message}>
            <CheckCircleIcon />
            Your profile has been updated! Let's check out your matches via
            following links
            <Link to="/account">
              <MenuItem>My Account</MenuItem>
            </Link>
            <Link to="/dashboard">
              <MenuItem>Dashboard</MenuItem>
            </Link>
          </span>
        }
      />
    </div>
  );
}

SuccessMessages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuccessMessages);
