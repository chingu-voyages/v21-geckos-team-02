import React, { useContext } from "react";
import UpdateProfileForm from "./UpdateProfileForm/form";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { Paper, Typography, Grid } from "@material-ui/core";
import "./style.css";

const EditProfileDisplay = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Paper id="update-profile-box">
          {/* {!authUser && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Create Your Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <CreateProfileForm firebase={firebase} />
              </Grid>
            </Grid>
          )} */}
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
