import React from "react";
import useForm from "../../../hooks/useForm";
import { Button, TextField, Grid } from "@material-ui/core";
// import { auth } from "firebase";

export default (props) => {
  const initialState = {
    // TODO: if coming from SignUpForm, then pass these 3 initalStates
    // as props to this component. if coming from user dashboard,
    // pass all initialState as props from database
    firstName: "",
    lastName: "",
    displayName: "",
    //============//
    // TODO: figure out image upload/hosting
    // hosting: imgbb.com
    // compression: https://helloacm.com/images-compressor/
    //===========//
    city: "",
    state: "",
    preferredCodingTime: [],
    frontendTechStack: [],
    backendTechStack: [],
    specialty: [],
    preferredTechStack: [],
    bio: "",
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(initialState);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* TODO: Create form UI and functionality */}
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
        <Grid item xs={12}>
          <TextField
            name="displayName"
            fullWidth
            type="text"
            label="Display Name"
            value={inputs.displayName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            fullWidth
            type="email"
            label="Email"
            value={inputs.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="password"
            fullWidth
            type="password"
            label="Password"
            value={inputs.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="passwordConfirm"
            fullWidth
            type="password"
            label="Re-enter Password"
            value={inputs.passwordCOnfirm}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" fullWidth color="primary" type="submit">
            Confirm Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
