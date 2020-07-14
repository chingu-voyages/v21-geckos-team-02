import React, { useContext } from "react";
import SignUpForm from "./form";
import { FirebaseContext } from "../../components/Firebase";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import "./style.css";

export default () => {
  const authUser = useContext(AuthUserContext);

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
                  <Link to="login">Already have an account? Log In!</Link>
                </Typography>
              </Grid>
            </Grid>
          )}
          {authUser && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Welcome</Typography>
              </Grid>
              <Grid item xs={12}>
                <Alert
                  severity="info"
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
