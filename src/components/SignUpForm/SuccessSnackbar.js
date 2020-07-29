import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const styles = (theme) => ({
  snackbar: {
    margin: theme.spacing(),
    background: "#43A047",
    display: "flex",
    padding: "6px 24px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
});

function SuccessMessage(props) {
  const { classes } = props;

  return (
    <div>
      <SnackbarContent
        className={classes.snackbar}
        message={
          <span className={classes.message}>
            <CheckCircleIcon />
            {"Congrats! Successfully registered.  \
          "}
          </span>
        }
      />
    </div>
  );
}

SuccessMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuccessMessage);
