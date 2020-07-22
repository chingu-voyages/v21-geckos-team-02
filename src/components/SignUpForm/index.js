import React, { useState, useEffect, useContext } from "react";
import SignUpForm from "./form";
import CreateProfileForm from "../EditProfileForms/CreateProfileForm/form";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { LoginModalContext } from "../ModalComponentWrapper/ModalsContext/LoginModalContext";
import { SignUpModalContext } from "../ModalComponentWrapper/ModalsContext/SignUpModalContext";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import "./style.css";

export default () => {
  const fb = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const [doc, setDoc] = useState();
  const [, setSignUpModalOpen] = useContext(SignUpModalContext);
  const [, setLoginModalOpen] = useContext(LoginModalContext);

  useEffect(
    () => {
      if (authUser !== null && authUser !== undefined) {
        fb.doGetUserProfile(authUser.uid, (user) => {
          setDoc(user.data());
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
  );

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Paper id="signup-box">
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
                    to="login"
                    onClick={() => {
                      setSignUpModalOpen(false);
                      setLoginModalOpen(true);
                    }}
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
                <Typography variant="h5">Create Your Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <CreateProfileForm firebase={firebase} user={doc} key={doc} />
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
            </Grid>
          )}
        </Paper>
      )}
    </FirebaseContext.Consumer>
  );
};
