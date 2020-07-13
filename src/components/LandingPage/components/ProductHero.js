import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ModalComponentWrapper from "../../ModalComponentWrapper";
import SignUpForm from "../../SignUpForm";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import { withStyles } from "@material-ui/core/styles";
import Button from "../UI/Button";
import Typography from "../UI/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import heroImage from "../../../assets/images/heroImage.jpg";
import { Route, Link, Redirect } from "react-router-dom";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${heroImage})`,
    backgroundColor: "#c49c48",
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

const ProductHero = ({ authUser, ...props }) => {
  const { classes } = props;
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleSignUpOpen = () => {
    setOpenSignUp(true);
  };

  const handleSignUpClose = () => {
    setOpenSignUp(false);
  };

  useEffect(() => {
    if (
      window.location.pathname === "/home/signup" ||
      window.location.pathname === "/home/signup/"
    ) {
      setOpenSignUp(true);
    } else {
      setOpenSignUp(false);
    }
  }, []);

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <img
        style={{ display: "none" }}
        src={heroImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Expand Your Coding Network!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Find the perfect local or remote developer for the job.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className="classes.button"
        component={Link}
        to="/home/signup"
        onClick={handleSignUpOpen}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Enjoy a seamless matchmaking experience
      </Typography>
      <Route
        path="/home/signup"
        render={() => {
          return (
            <ModalComponentWrapper>
              <Modal
                aria-labelledby="signup-form"
                aria-describedby="registration-form-for-co-coders"
                open={openSignUp}
                onClose={handleSignUpClose}
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                disableBackdropClick
                disableEscapeKeyDown
              >
                <SignUpForm authUser={authUser} />
              </Modal>
            </ModalComponentWrapper>
          );
        }}
      />
      <Route
        render={() =>
          window.location.pathname.includes("/signup/") ||
          window.location.pathname === "/home/signup" ||
          window.location.pathname === "/home/signup/" ? (
            <Redirect to="/home/signup" />
          ) : window.location.pathname.includes("/login/") ||
            window.location.pathname === "/home/login" ||
            window.location.pathname === "/home/login/" ? (
            <Redirect to="/home/login" />
          ) : (
            <Redirect to="/home" />
          )
        }
      />
    </ProductHeroLayout>
  );
};

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
