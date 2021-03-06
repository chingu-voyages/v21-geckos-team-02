import React, { useContext, useEffect, useState } from "react";
import LoginForm from "./form";
import { FirebaseContext } from "../../components/Firebase";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { Typography, Button, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import { Link } from "react-router-dom";

export default () => {
  const authUser = useContext(AuthUserContext);
  const fb = useContext(FirebaseContext);
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
        //Replaces Paper with div to avoid browser warning
        <div id="login-box">
          {!authUser && (
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <Link to="/">
                  <CloseRoundedIcon color="primary" />
                </Link>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">Log In</Typography>
              </Grid>
              <Grid item xs={12}>
                <LoginForm firebase={firebase} />
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <Link to="/signup">Need an account? Sign Up!</Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link to="/account/pw-forget">Forgot Password?</Link>
              </Grid>
            </Grid>
          )}

          {authUser && doc !== undefined && !doc.newUser && (
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <Link to="/">
                  <CloseRoundedIcon color="primary" />
                </Link>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">Welcome</Typography>
              </Grid>
              <Grid item xs={12}>
                <Alert
                  transition={null}
                  severity="success"
                  action={
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={firebase.doSignOut}
                      size="small"
                    >
                      Sign Out
                    </Button>
                  }
                >
                  Signed in as {authUser.email}
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <Alert
                  transition={null}
                  severity="info"
                  action={
                    <Button
                      color="primary"
                      variant="contained"
                      component={RouterLink}
                      to="/account"
                      size="small"
                    >
                      &raquo;Account
                    </Button>
                  }
                >
                  Hey <strong>{doc.firstName}</strong>! Check out your account!
                  <RouterLink to="/account">
                    <Avatar alt="profile" src={doc.photoURL} />
                  </RouterLink>
                </Alert>
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </FirebaseContext.Consumer>
  );
};
