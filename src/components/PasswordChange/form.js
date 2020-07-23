import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage } from "@hookform/error-message";
import Typography from "../LandingPage/UI/Typography";
import TextField from "@material-ui/core/TextField";
import { withFirebase } from "../Firebase/index";
import AccountPage from "../Account/AccountPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  form: {
    marginTop: theme.spacing(6),
    background: "lavenderblush",
    padding: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "4px",
    padding: "10px 5px",
    marginBottom: "50px",
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
}));

const PasswordChange = () => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  return (
    <React.Fragment>
      <AccountPage />
      <div className={classes.root}>
        <form
          //   onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          autoComplete="off"
          noValidate
          action=""
        >
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Wanna change your password?
            </Typography>
            <Typography variant="body2" align="center">
              {"Enter your current password and new password below " +
                ", we will send you an email to confirm your change."}
            </Typography>
          </React.Fragment>
          <TextField
            required
            id="filled-full-width"
            label="Current Password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            inputRef={register({
              required: "Current Password is required.",
            })}
            name="currentPass"
            // onChange={onChangeHandler}
          />
          <ErrorMessage errors={errors} name="currentPass" />

          <TextField
            required
            id="filled-full-width"
            label="New Password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            inputRef={register({
              required: "New Password is required.",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters.",
              },
            })}
            name="newPass"
            // onChange={onChangeHandler}
          />

          <ErrorMessage errors={errors} name="newPass" />

          <TextField
            required
            id="filled-full-width"
            label="Confirm New Password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            inputRef={register({
              required: "Confirm New Password is required.",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters.",
              },
            })}
            name="currentPass"
            // onChange={onChangeHandler}
          />
          <ErrorMessage errors={errors} name="currentPass" />

          <button className={classes.input} type="submit">
            Change
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PasswordChange;
