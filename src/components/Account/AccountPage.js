import React, { useEffect, useContext, useState } from "react";
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
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { FirebaseContext } from "../Firebase/index";

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
  const fb = useContext(FirebaseContext);
  const classes = useStyles();
  const authUser = useContext(AuthUserContext);
  const [doc, setDoc] = useState();
  const [didMount, setDidMount] = useState(false);

  useEffect(
    () => {
      if (authUser !== null && authUser !== undefined) {
        fb.doGetUserProfile(authUser.uid, (user) => {
          setDoc(user.data());
        });
      }
      setDidMount(true);
      return () => setDidMount(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
  );

  if (!didMount) {
    return null;
  }
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div>
          {!authUser && (
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
              </ToolBar>
            </AppBar>
          )}

          {authUser && doc !== undefined && !doc.newUser && (
            <div>
              <div className={classes.right}>
                <AccountMenu firebase={firebase} user={doc} />
              </div>

              <div className={classes.center}>
                <div className={classes.contentwrapper}>
                  <ImageUpload user={doc} firebase={firebase} />
                  <ProfileSummary firebase={firebase} user={doc} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </FirebaseContext.Consumer>
  );
}

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
