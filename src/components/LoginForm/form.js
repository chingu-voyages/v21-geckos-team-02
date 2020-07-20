import React from "react";
import useForm from "../../hooks/useForm";
import { Button, TextField, Grid } from "@material-ui/core";
// import { auth } from "firebase";

export default (props) => {
  const initialState = {
    email: "",
    password: "",
  };

  const loginUser = () => {
    props.firebase
      .doSignInWithEmailAndPassword(inputs.email, inputs.password)
      .then((authUser) => {
        console.log(authUser);
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
        <Grid item xs={12}>
          <TextField
            name="password"
            fullWidth
            type="password"
            label="Password"
            value={inputs.password}
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
