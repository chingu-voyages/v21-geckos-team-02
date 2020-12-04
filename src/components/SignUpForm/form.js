import React, { useState, useCallback, useEffect, useContext } from "react";
import useFormHook from "../../hooks/useForm";
import { Button, TextField, Grid } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ErrorMessages from "../shared/ErrorSnackBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { Redirect } from 'react-router-dom';

const eye = <FontAwesomeIcon icon={faEye} />;

const SignUpForm = ({ firebase }) => {
  const authUser = useContext(AuthUserContext);
  const initialState = {
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    newUser: true,
    photoURL: "",
  };

  const loginUser = () => {
    firebase
      .doCreateUserWithEmailAndPassword(inputs)
      .then((authUser) => {
        console.log("authUser: ", authUser);
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setError(error.message);
      });
  };

  const handleSignUp = useCallback(
    async (data) => {
      try {
        await firebase.doCreateUserWithEmailAndPassword({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
          newUser: true,
          photoURL: "",
        });
        
        await firebase.doSendEmailVerification();
        return <Redirect to="/dashboard" />
      } catch (error) {
        setError(error.message);
      }
    },
    [firebase]
  );

  const { inputs } = useFormHook(initialState, loginUser);

  useEffect(
    () => {
      if (authUser !== null && authUser !== undefined) {
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
  );

  //React-Hook-Form
  const { register, handleSubmit, errors, control, getValues } = useForm({
    criteriaMode: "all",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      newUser: true,
      photoURL: "",
    },
  });
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passConfirmShown, setPasswordConfirmShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmShown(passConfirmShown ? false : true);
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            helperText={<ErrorMessage errors={errors} name="firstName" />}
            name="firstName"
            fullWidth
            type="text"
            label="First Name"
            inputRef={register({
              required: "First name is required.",
              maxLength: {
                value: 20,
                message: "Maximum length is 20 characters.",
              },
            })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            helperText={<ErrorMessage errors={errors} name="lastName" />}
            name="lastName"
            fullWidth
            type="text"
            label="Last Name"
            inputRef={register({
              required: "Last name is required.",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "No special character allowed.",
              },
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            helperText={<ErrorMessage errors={errors} name="email" />}
            name="email"
            fullWidth
            type="email"
            label="Email"
            inputRef={register({
              required: "Email is required.",
              pattern: {
                //eslint-disable-next-line
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Email must be valid.",
              },
            })}
          />
        </Grid>
        <div className="pass-wrapper-register">
          {/* <Grid item xs={6}> */}
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
                helperText={<ErrorMessage errors={errors} name="password" />}
                name="password"
                fullWidth
                type={passwordShown ? "text" : "password"}
                label="Password"
              />
            }
          />
          <i onClick={togglePasswordVisibility}>{eye}</i>
          {/* </Grid> */}
        </div>

        <div className="pass-wrapper-register">
          {/* <Grid item xs={6}> */}
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
                helperText={
                  <ErrorMessage errors={errors} name="passwordConfirm" />
                }
                name="passwordConfirm"
                fullWidth
                label="Re-enter Password"
                type={passConfirmShown ? "text" : "password"}
              />
            }
            fullWidth
            label="Re-enter Password"
          />
          <i onClick={togglePasswordConfirmVisibility}>{eye}</i>
          {/* </Grid> */}
        </div>

        <Grid item xs={12}>
          <Button variant="contained" fullWidth color="primary" type="submit">
            Submit
          </Button>
        </Grid>
        {error !== null && <ErrorMessages error={error} />}
      </Grid>
    </form>
  );
};

export default SignUpForm;
