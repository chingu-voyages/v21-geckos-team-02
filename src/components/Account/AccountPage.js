import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "../LandingPage/components/Navbar/AppBar";
import ToolBar, {
  styles as toolbarStyles,
} from "../LandingPage/components/Navbar/Toolbar";
import AccountMenu from "../shared/AccountMenu";
import ImageUpload from "../../ImageUpload/index";
import ProfileSummary from "./ProfileSummary";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session/index";

const useStyles = makeStyles((theme) => ({
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
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentwrapper: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "940px",
    padding: "50px",
  },
}));

function AccountPage(props) {
  const classes = useStyles();
  const { firebase, authUser, displayName } = props;
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
      <div className={classes.center}>
        <div className={classes.contentwrapper}>
          <ImageUpload authUser={authUser} />
          <ProfileSummary
            firebase={firebase}
            authUser={authUser}
            displayName={displayName}
          />
        </div>
      </div>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
