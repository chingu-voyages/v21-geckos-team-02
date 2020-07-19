import React, { useState, useContext, useEffect } from "react";
import UpdateProfileForm from "./UpdateProfileForm/form";
import CreateProfileForm from "./CreateProfileForm/form";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { Paper, Typography, Grid } from "@material-ui/core";
import "./style.css";

// TODO: Create form container below
const EditProfileDisplay = () => {
  const authUser = useContext(AuthUserContext);
  const fb = useContext(FirebaseContext);
  const [doc, setDoc] = useState();

  // Pass a callback to handle the data.  Don't forget the empty array as second parameter of useEffect.
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
