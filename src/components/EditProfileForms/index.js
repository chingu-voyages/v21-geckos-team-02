import React from "react";
import UpdateProfileForm from "./UpdateProfileForm/form";
import CreateProfileForm from "./CreateProfileForm/form";
import { FirebaseContext } from "../Firebase";
import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import "./style.css";

// TODO: Create form container below
const EditProfileDisplay = ({ authUser }) => {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Paper id="update-profile-box">
          {!authUser && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Create Your Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <CreateProfileForm firebase={firebase} />
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

export default EditProfileDisplay;
