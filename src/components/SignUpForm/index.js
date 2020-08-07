import React, { useState, useEffect, useContext } from "react";
import SignUpForm from "./form";
import CreateProfileForm from "../EditProfileForms/CreateProfileForm/form";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
// import { LoginModalContext } from "../ModalComponentWrapper/ModalsContext/LoginModalContext";
// import { SignUpModalContext } from "../ModalComponentWrapper/ModalsContext/SignUpModalContext";
import { Typography, Grid, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import "./style.css";

export default () => {
  const fb = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const [doc, setDoc] = useState();
  // const [, setSignUpModalOpen] = useContext(SignUpModalContext);
  // const [, setLoginModalOpen] = useContext(LoginModalContext);
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
        <div id="signup-box">
          {!authUser && (
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <Link to="/home">
                  <CloseRoundedIcon color="primary" />
                </Link>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">Register</Typography>
              </Grid>
              <Grid item xs={12}>
                <SignUpForm firebase={firebase} />
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <Link
                    to="/home/login"
                    // onClick={() => {
                    //   setSignUpModalOpen(false);
                    //   setLoginModalOpen(true);
                    // }}
                  >
                    Already have an account? Log In!
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          )}

          {authUser && doc !== undefined && doc.newUser && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CreateProfileForm
                  firebase={firebase}
                  user={doc}
                  key={doc.uid}
                />
              </Grid>
            </Grid>
          )}
          {authUser && doc !== undefined && !doc.newUser && (
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <Link to="/home">
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
                  Thank you <strong>{doc.firstName}</strong> for being a
                  Co-Coder! Your email to sign in:{" "}
                  <strong>{authUser.email}</strong>
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
