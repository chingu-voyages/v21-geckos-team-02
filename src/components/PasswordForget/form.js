import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage } from "@hookform/error-message";
import Typography from "../LandingPage/UI/Typography";
import TextField from "@material-ui/core/TextField";
import { withFirebase } from "../Firebase/index";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import SharedNavBar from "../shared/SharedNav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(6),
    background: "lavenderblush",
    width: "500px",
    height: "400px",
    padding: "40px",
  },
  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "4px",
    padding: "10px 5px",
    marginBottom: "10px",
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
    },
  },
  appBar: {
    bottom: "0",
    position: "absolute",
  },
}));

function PasswordForgetFormBase(props) {
  const classes = useStyles();

  useEffect(() => {
    register({ emailRequired: "emailRequired" }, { required: true });
  });

  const [email, setEmail] = useState("");

  const onSubmit = ({ emailRequired }) => {
    props.firebase
      .doPasswordReset(emailRequired)
      .then(() => {
        setEmail({ ...email });
        alert("Your email has been submitted!");
        props.history.push("/home");
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const { register, handleSubmit, setValue, errors } = useForm({
    criteriaMode: "all",
  });

  return (
    <React.Fragment>
      <SharedNavBar />
      <div className={classes.root}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          autoComplete="off"
          noValidate
        >
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Forgot your password?
            </Typography>
            <Typography variant="body2" align="center">
              {"Enter your email address below and we'll " +
                "send you a link to reset your password."}
            </Typography>
          </React.Fragment>

          <TextField
            required
            id="filled-full-width"
            label="Email"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            inputRef={register({
              required: "Email is required.",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Email must be valid.",
              },
            })}
            name="emailRequired"
            onChange={(event) => setValue("emailRequired", event.target.value)}
          />
          <ErrorMessage errors={errors} name="emailRequired" />

          <button className={classes.input} type="submit">
            Send Reset Link
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

const PasswordForgetForm = compose(
  withRouter,
  withFirebase
)(PasswordForgetFormBase);

export { PasswordForgetForm };
