import React, { useContext, useEffect, useState } from "react";
import UpdateProfileForm from "./UpdateProfileForm/form";
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { Typography, Grid } from "@material-ui/core";
import "./style.css";

const EditProfileDisplay = () => {
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
        <div id="update-profile-box">
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
          {authUser && doc !== undefined && !doc.newUser && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">Update Your Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <UpdateProfileForm
                  firebase={firebase}
                  user={doc}
                  key={doc.uid}
                />
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </FirebaseContext.Consumer>
  );
};

export default EditProfileDisplay;
