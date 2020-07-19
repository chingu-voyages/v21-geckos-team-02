import React, { useEffect, useContext } from "react";
import useForm from "../../../hooks/useForm";
import { AuthUserContext } from "../../Firebase/AuthUser/AuthUserContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import statesInUsaData from "../data/statesInUsaData";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default ({ firebase, user }) => {
  const classes = useStyles();
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
    if (user !== initialState) {
      firebase.doGetUserProfile(authUser.uid, (user) => {
        if (user.data().newUser === false) {
          window.location.reload(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            required
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
            required
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
            required
            fullWidth
            type="text"
            label="City"
            value={inputs.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="state-selector-label">State</InputLabel>
            <Select
              labelId="state-selector-label"
              id="state-selector"
              value={inputs.state}
              onChange={handleInputChange}
            >
              {statesInUsaData.map((location) => (
                <MenuItem value={location.abbreviation}>
                  {location.abbreviation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <TextField
            name="state"
            required
            fullWidth
            type="text"
            label="State"
            value={inputs.state}
            onChange={handleInputChange}
          /> */}
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
