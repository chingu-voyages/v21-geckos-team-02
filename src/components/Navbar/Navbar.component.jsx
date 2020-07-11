import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../AppBar";
import ToolBar, {
  styles as toolbarStyles,
} from "../../styles/components/Toolbar";
import { Link as RouterLink } from "react-router-dom";

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function NavBar(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="fixed" style={{ background: "#1d3557" }}>
        <ToolBar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            component={RouterLink}
            to="/"
          >
            {"Co-Coders"}
          </Link>
          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              component={RouterLink}
              to="/login"
            >
              {"Sign In"}
            </Link>

            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/signup"
            >
              {"Sign Up"}
            </Link>
          </div>
        </ToolBar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
