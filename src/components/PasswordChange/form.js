import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage } from "@hookform/error-message";
import Typography from "../LandingPage/UI/Typography";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import AccountPage from "../Account/AccountPage";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ErrorMessages from "../shared/ErrorSnackBar";
import { withFirebase } from "../Firebase/index";
import SuccessMessage from "./SuccessSnackbar";

const eye = <FontAwesomeIcon icon={faEye} />;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  form: {
    marginTop: theme.spacing(1),
    background: "lavenderblush",
    padding: "30px",
  },
  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "4px",
    padding: "10px 5px",
    marginBottom: "30px",
    marginTop: "30px",
    fontSize: "14px",
    background: "#ec5990",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    "&:hover": {
      background: "#bf1650",
    },
    "&:active": {
      transition: "0.3s all",
      transform: "translateY(3px)",
      border: "1px solid transparent",
      opacity: "0.8",
    },
    "&:disable": {
      opacity: "0.4",
      background: "grey",
    },
  },
  appBar: {
    bottom: "0",
    position: "absolute",
  },
  wrapper: {
    position: "relative",
    display: "flex",
  },
  i1: {
    position: "absolute",
    right: "20px",
    top: "20px",
  },
}));

const PasswordChangeBase = (props) => {
  const classes = useStyles();

  const handlePasswordChange = useCallback(
    async (newPass) => {
      const newPassword = newPass.newPass;
      try {
        await props.firebase.doPasswordUpdate(newPassword);
        setPasswordHasBeenChanged(true);
      } catch (error) {
        setError(error.message);
      }
    },
    [props]
  );

  const { register, handleSubmit, errors, control, getValues } = useForm({
    criteriaMode: "all",
    defaultValues: {
      currentPass: "",
      newPass: "",
      confirmNewPass: "",
    },
  });

  const [error, setError] = useState(null);
  const [passwordHasBeenChanged, setPasswordHasBeenChanged] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmShown(passwordConfirmShown ? false : true);
  };

  return (
    <React.Fragment>
      <AccountPage />
      <div className={classes.root}>
        <form
          onSubmit={handleSubmit(handlePasswordChange)}
          className={classes.form}
          autoComplete="off"
          noValidate
          action=""
        >
          <React.Fragment>
            <Typography
              variant="h4"
              gutterBottom
              marked="center"
              align="center"
            >
              Change password?
            </Typography>
          </React.Fragment>
          <TextField
            required
            label="Current Password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            inputRef={register({
              required: "Current Password is required.",
            })}
            name="currentPass"
            type="password"
            helperText={<ErrorMessage errors={errors} name="currentPass" />}
          />

          <div className={classes.wrapper}>
            <Controller
              name="newPass"
              control={control}
              rules={{
                required: "New Password is required.",
                minLength: {
                  value: 8,
                  message: "New Password must have at least 8 characters.",
                },
              }}
              as={
                <TextField
                  required
                  name="newPass"
                  label="New Password"
                  fullWidth
                  type={passwordShown ? "text" : "password"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  helperText={<ErrorMessage errors={errors} name="newPass" />}
                />
              }
            />
            <i onClick={togglePasswordVisibility} className={classes.i1}>
              {eye}
            </i>
          </div>

          <div className={classes.wrapper}>
            <Controller
              name="confirmNewPass"
              control={control}
              rules={{
                required: "Confirm New Password is required",
                validate: (value) => {
                  if (value === getValues()["newPass"]) {
                    return true;
                  } else {
                    return "The passwords do not match";
                  }
                },
              }}
              as={
                <TextField
                  required
                  name="confirmNewPass"
                  type={passwordConfirmShown ? "text" : "password"}
                  fullWidth
                  label="Confirm New Password"
                  margin="normal"
                  m={2}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  helperText={
                    <ErrorMessage errors={errors} name="confirmNewPass" />
                  }
                />
              }
            />
            <i onClick={togglePasswordConfirmVisibility} className={classes.i2}>
              {eye}
            </i>
          </div>

          <button className={classes.input} type="submit">
            Change
          </button>
          {passwordHasBeenChanged && <SuccessMessage />}
          {error !== null && <ErrorMessages error={error} />}
          <hr />
          <Typography variant="body2" align="center">
            Have you forgotten your password?You can {"  "}
            <Link to="/account/pw-forget">reset it</Link> by sending a link to
            your email address.
          </Typography>
        </form>
      </div>
    </React.Fragment>
  );
};

const PasswordChange = withFirebase(PasswordChangeBase);

export default withRouter(PasswordChange);
