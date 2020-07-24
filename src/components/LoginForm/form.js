import React, { useState, useCallback, useEffect, useContext } from "react";
import useFormHook from "../../hooks/useForm";
import { Button, TextField, Grid } from "@material-ui/core";
// import { auth } from "firebase";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { withRouter } from "react-router-dom";
import ErrorMessages from "../shared/ErrorSnackBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";

const eye = <FontAwesomeIcon icon={faEye} />;

const LogInForm = ({ firebase }) => {
  const initialState = {
    email: "",
    password: "",
  };

  const authUser = useContext(AuthUserContext);

  const loginUser = () => {
    firebase
      .doSignInWithEmailAndPassword(inputs.email, inputs.password)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const handleSignIn = useCallback(
    async (data) => {
      console.log(data);
      try {
        await firebase.doSignInWithEmailAndPassword(data.email, data.password);
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

  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
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
          <ErrorMessage errors={errors} name="email" />
        </Grid>
        <div className="pass-wrapper">
          <Grid item xs={12}>
            <TextField
              name="password"
              fullWidth
              type={passwordShown ? "text" : "password"}
              label="Password"
              inputRef={register({
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters.",
                },
              })}
            />
            <i onClick={togglePasswordVisibility}>{eye}</i>
            <ErrorMessage errors={errors} name="password" />
          </Grid>
        </div>

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            disabled={!formState.isValid}
          >
            Submit
          </Button>
          {error !== null && <ErrorMessages error={error} />}
        </Grid>
      </Grid>
    </form>
  );
};

export default withRouter(LogInForm);
