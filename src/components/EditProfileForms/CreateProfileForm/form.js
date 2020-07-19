import React, { useEffect, useContext } from "react";
import useForm from "../../../hooks/useForm";
import { AuthUserContext } from "../../Firebase/AuthUser/AuthUserContext";
import {
  Button,
  TextField,
  Grid,
  // FormControl,
  // FormControlLabel,
  // RadioGroup,
  // Radio,
} from "@material-ui/core";

export default ({ firebase, user }) => {
  const authUser = useContext(AuthUserContext);

  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    city: "",
    state: "",
    preferredCodingTime: [],
    frontendTechStack: [],
    backendTechStack: [],
    specialty: [],
    preferredTechStack: [],
    bio: "",
    newUser: false,
  };

  const createUser = () => {
    firebase
      .doProfileUpdate(inputs)
      .then((authUser) => {
        console.log("authUser: ", authUser);
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    initialState,
    createUser
  );

  // Reload page after user creates profile
  useEffect(() => {
    firebase.doGetUserProfile(authUser.uid, (user) => {
      if (user.data().newUser === false) {
        window.location.reload(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            fullWidth
            type="text"
            label="First Name"
            value={inputs.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lastName"
            fullWidth
            type="text"
            label="Last Name"
            value={inputs.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="city"
            fullWidth
            type="text"
            label="City"
            value={inputs.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="state"
            fullWidth
            type="text"
            label="State"
            value={inputs.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button variant="contained" fullWidth color="primary" type="submit">
            Create Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

// TODO: figure out image upload/hosting
// hosting: imgbb.com
// compression: https://helloacm.com/images-compressor/
