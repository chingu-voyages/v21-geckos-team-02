import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
            &nbsp; Your profile has been updated!
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
