import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "../LandingPage/components/Navbar/AppBar";
import ToolBar, {
  styles as toolbarStyles,
} from "../LandingPage/components/Navbar/Toolbar";

import AccountMenu from "../shared/AccountMenu";
import ImageUpload from "../../ImageUpload/index";

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
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  contentwrapper: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "940px",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

function AccountPage(props) {
  const { classes, firebase, authUser, displayName } = props;
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
            to="/home"
          >
            {"Co-Coders"}
          </Link>
          <div className={classes.right}>
            <AccountMenu
              firebase={firebase}
              authUser={authUser}
              displayName={displayName}
            />
          </div>
        </ToolBar>
      </AppBar>
      <div className={classes.placeholder} />
      <div className={classes.contentwrapper}>
        <ImageUpload />
      </div>
    </div>
  );
}

AccountPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountPage);
