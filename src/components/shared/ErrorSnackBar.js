import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";

const styles = (theme) => ({
  snackbar: {
    margin: theme.spacing(),
    background: "#D32F2F",
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

function ErrorMessages(props) {
  const { classes, error } = props;

  return (
    <div>
      <SnackbarContent
        className={classes.snackbar}
        message={
          <span className={classes.message}>
            <ErrorIcon />
            {error}
          </span>
        }
      />
    </div>
  );
}

ErrorMessages.propType = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
};

export default withStyles(styles)(ErrorMessages);
