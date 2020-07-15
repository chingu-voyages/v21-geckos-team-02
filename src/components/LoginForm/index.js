import React, { useContext } from "react";
import LoginForm from "./form";
import { FirebaseContext } from "../../components/Firebase";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { LoginModalContext } from "../ModalComponentWrapper/ModalsContext/LoginModalContext";
import { SignUpModalContext } from "../ModalComponentWrapper/ModalsContext/SignUpModalContext";
import { Paper, Typography, Button, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import "./style.css";
import { Link } from "react-router-dom";

export default () => {
  const authUser = useContext(AuthUserContext);
  const [, setLoginModalOpen] = useContext(LoginModalContext);
  const [, setSignUpModalOpen] = useContext(SignUpModalContext);

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Paper id="login-box">
          {!authUser && (
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <Link to="/home">
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
                  <Link
                    to="signup"
                    onClick={() => {
                      setLoginModalOpen(false);
                      setSignUpModalOpen(true);
                    }}
                  >
                    Need an account? Sign Up!
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link to="/pw-forget">Forgot Password?</Link>
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
