import React, { useState } from "react";
import useFormHook from "../../hooks/useForm";
import { Button, TextField, Grid } from "@material-ui/core";
// import { auth } from "firebase";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default ({ firebase }) => {
  const initialState = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    newUser: true,
  };

  const loginUser = () => {
    firebase
      .doCreateUserWithEmailAndPassword(inputs)
      .then((authUser) => {
        console.log("authUser: ", authUser);
      })
      .catch((error) => {
        console.error(error.code, error.message);
        // setError(error.message);
      });
  };

  const {
    handleSubmit: handleSubmitHook,
    handleInputChange,
    inputs,
  } = useFormHook(initialState, loginUser);

  //React-Hook-Form
  const { register, handleSubmit, errors, control, getValues } = useForm({});
  const [error, setError] = useState(null);

  const signUpUser = async (email, password, firstName, lastName) => {
    try {
      const newUser = await firebase.doCreateUserWithEmailAndPassword(
        email,
        password
      );

      // await firebase
      //   .database()
      //   .ref(`/userProfile/${newUser.uid}`)
      //   .set({ email: email, firstName: firstName, lastName: lastName });
      // return newUser;

      await firebase.doProfileUpdate({
        email: email,
        firstName: firstName,
        lastName: lastName,
      });
      return newUser;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitHook)}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            fullWidth
            type="text"
            label="First Name"
            value={inputs.firstName}
            onChange={handleInputChange}
            inputRef={register({
              required: "First name is required.",
              maxLength: {
                value: 20,
                message: "Maximum length is 20 characters.",
              },
            })}
          />
          <ErrorMessage errors={errors} name="firstName" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lastName"
            fullWidth
            type="text"
            label="Last Name"
            value={inputs.lastName}
            onChange={handleInputChange}
            inputRef={register({
              required: "Last name is required.",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "No special character allowed.",
              },
            })}
          />
          <ErrorMessage errors={errors} name="lastName" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            fullWidth
            type="email"
            label="Email"
            value={inputs.email}
            onChange={handleInputChange}
            inputRef={register({
              required: "Email is required.",
              pattern: {
                //eslint-disable-next-line
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Email must be valid.",
              },
            })}
          />
          <ErrorMessage errors={errors} name="email" />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters.",
              },
            }}
            as={
              <TextField
                name="password"
                fullWidth
                type="password"
                label="Password"
                value={inputs.password}
                onChange={handleInputChange}
              />
            }
          />
          {errors.password && <p>{errors.password.message}</p>}
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="passwordConfirm"
            control={control}
            rules={{
              required: "Password is required.",
              validate: (value) => {
                if (value === getValues()["password"]) {
                  return true;
                } else {
                  return "The passwords do not match";
                }
              },
            }}
            as={
              <TextField
                name="passwordConfirm"
                fullWidth
                type="password"
                label="Re-enter Password"
                value={inputs.passwordConfirm}
                onChange={handleInputChange}
              />
            }
            fullWidth
            type="password"
            label="Re-enter Password"
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            onClick={() => signUpUser()}
          >
            Submit
          </Button>
        </Grid>
        {error !== null && <div>{error}</div>}
      </Grid>
    </form>
  );
};
