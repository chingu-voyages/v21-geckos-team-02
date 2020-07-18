import React, { useState, useContext } from "react";
import UpdateProfileForm from "./UpdateProfileForm/form";
import CreateProfileForm from "./CreateProfileForm/form";
import { FirebaseContext } from "../Firebase";
import { Paper, Typography, Grid } from "@material-ui/core";
import "./style.css";

// TODO: Create form container below
const EditProfileDisplay = ({ authUser }) => {
  const fb = useContext(FirebaseContext);
  // const [docs, setDocs] = useState([]);

  if (fb.auth.currentUser) {
    fb.doGetUserProfile(fb.auth.currentUser.uid, (doc) => {
      console.log("profile:", doc.data());
    });
  }

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
                <Typography variant="h5">Update Your Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <UpdateProfileForm firebase={firebase} />
              </Grid>
            </Grid>
          )}
        </Paper>
      )}
    </FirebaseContext.Consumer>
  );
};

export default EditProfileDisplay;
