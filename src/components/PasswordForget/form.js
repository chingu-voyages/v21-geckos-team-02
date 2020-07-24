import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage } from "@hookform/error-message";
import Typography from "../LandingPage/UI/Typography";
import TextField from "@material-ui/core/TextField";
import { withFirebase } from "../Firebase/index";
import SharedNavBar from "../shared/SharedNav";
import SuccessMessage from "../shared/SuccessSnackbars";
import ErrorMessages from "../shared/ErrorSnackBar";

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

function PasswordForgetFormBase(props) {
  const classes = useStyles();
  const [email, setEmail] = useState([]);
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "emailRequired") {
      setEmail(value);
    }
  };

  const sendResetEmail = () => {
    props.firebase
      .doPasswordReset(email.toString())
      .then(() => {
        props.firebase.doSendEmailVerification(email.toString());
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
          setError(null);
        }, 6000);
      })
      .catch((error) => {
        setTimeout(() => {
          setError(null);
        }, 5000);
        setError(error.message);
      });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const { register, handleSubmit, errors } = useForm({
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
          action=""
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
                //eslint-disable-next-line
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Email must be valid.",
              },
            })}
            name="emailRequired"
            onChange={onChangeHandler}
          />
          <ErrorMessage errors={errors} name="emailRequired" />

          <button
            className={classes.input}
            type="submit"
            onClick={() => {
              sendResetEmail();
            }}
          >
            Send Reset Link
          </button>
          {emailHasBeenSent && <SuccessMessage />}
          {error !== null && <ErrorMessages error={error} />}
        </form>
      </div>
    </React.Fragment>
  );
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm };
