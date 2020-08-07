import React, { useState } from "react";
import useForm from "../../../hooks/useForm";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
// import { auth } from "firebase";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import statesInUsaData from "../data/statesInUsaData";
import SuccessMessages from "./SuccessMessages";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const EditProfileForms = ({ firebase, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [saveChange, setSaveChange] = useState(false);
  const initialState = {
    // Fill these fields with existing user data
    firstName: user.firstName,
    lastName: user.lastName,
    city: user.city,
    state: user.state,
    preferredCodingTime: user.preferredCodingTime,
    frontendTechStack: user.frontendTechStack,
    backendTechStack: user.backendTechStack,
    specialty: user.specialty,
    preferredTechStack: user.preferredTechStack,
    status: user.status,
    newUser: false,
    photoURL: user.photoURL,
  };

  const updateUser = () => {
    firebase
      .doProfileUpdate({ ...inputs, photoURL: user.photoURL })
      .then(() => {
        setSaveChange(true);
        setTimeout(() => {
          setSaveChange(false);
          history.push("/account");
        }, 3000);
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    initialState,
    updateUser
  );

  return (
    <form onSubmit={handleSubmit} style={{ background: "lavenderblush" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Update Your Profile</Typography>
        </Grid>
        <Grid item xs={12}>
          {saveChange && <SuccessMessages />}
        </Grid>
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
          <FormControl required className={classes.formControl}>
            <InputLabel id="state-selector-label">State</InputLabel>
            <Select
              labelId="state-selector-label"
              id="state-selector"
              name="state"
              value={inputs.state}
              onChange={handleInputChange}
            >
              {statesInUsaData.map((location) => (
                <MenuItem
                  value={location.abbreviation}
                  key={location.abbreviation}
                >
                  {location.abbreviation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl required component="fieldset">
            <FormLabel component="legend">Specialty</FormLabel>
            <RadioGroup
              aria-label="tech-specialty"
              name="tech-specialty1"
              value={inputs.specialty}
              onChange={handleInputChange}
            >
              <FormControlLabel
                name="specialty"
                value="Front-End"
                label="Front-End"
                control={<Radio />}
              />
              <FormControlLabel
                name="specialty"
                value="Back-End"
                label="Back-End"
                control={<Radio />}
              />
              <FormControlLabel
                name="specialty"
                label="Full-Stack"
                value="Full-Stack"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl required component="fieldset">
            <FormLabel component="legend">Fav. Coding Time</FormLabel>
            <RadioGroup
              aria-label="preferred-time"
              name="preferred-time1"
              value={inputs.preferredCodingTime}
              onChange={handleInputChange}
            >
              <FormControlLabel
                name="preferredCodingTime"
                value="morning"
                label="Morning"
                control={<Radio />}
              />
              <FormControlLabel
                name="preferredCodingTime"
                value="afternoon"
                label="Afternoon"
                control={<Radio />}
              />
              <FormControlLabel
                name="preferredCodingTime"
                value="evening"
                label="Evening"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="frontendTechStack"
            required
            fullWidth
            type="text"
            label="Front-End Tech Stack"
            value={inputs.frontendTechStack}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="backendTechStack"
            required
            fullWidth
            type="text"
            label="Back-End Tech Stack"
            value={inputs.backendTechStack}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="preferredTechStack"
            required
            fullWidth
            type="text"
            label="Preferred Tech Stack"
            value={inputs.preferredTechStack}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="status"
            fullWidth
            multiline
            type="text"
            label="Set Status"
            placeholder="Introduce yourself to your fellow Co-Coders!"
            value={inputs.status}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button variant="contained" fullWidth color="primary" type="submit">
            Update Profile
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </form>
  );
};

export default EditProfileForms;

// TODO: figure out image upload/hosting
// hosting: imgbb.com
// compression: https://helloacm.com/images-compressor/
