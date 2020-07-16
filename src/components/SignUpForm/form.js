import React from "react";
import useForm from "../../hooks/useForm";
import { Button, TextField, Grid } from "@material-ui/core";
// import { auth } from "firebase";

export default (props) => {
  const initialState = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
  };

  const loginUser = () => {
    props.firebase
      .doCreateUserWithEmailAndPassword(inputs)
      .then((authUser) => {
        console.log("authUser: ", authUser);
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    initialState,
    loginUser
  );

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
            value={inputs.passwordConfirm}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
