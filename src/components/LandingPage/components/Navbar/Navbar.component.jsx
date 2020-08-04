import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
// import { Typography } from "@material-ui/core";

import AppBar from "./AppBar";
import ToolBar, { styles as toolbarStyles } from "./Toolbar";
import { Link as RouterLink } from "react-router-dom";

// import { Route, Redirect } from "react-router-dom";

// import ModalComponentWrapper from "../../../ModalComponentWrapper";
// import { LoginModalContext } from "../../../ModalComponentWrapper/ModalsContext/LoginModalContext";
// import LoginForm from "../../../LoginForm";
// import SignUpForm from "../../../SignUpForm";
// import { SignUpModalContext } from "../../../ModalComponentWrapper/ModalsContext/SignUpModalContext";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
import { AuthUserContext } from "../../../Firebase/AuthUser/AuthUserContext";
import { FirebaseContext } from "../../../Firebase";

// import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function NavBar(props) {
  const authUser = useContext(AuthUserContext);
  const firebase = useContext(FirebaseContext);
  const { classes } = props;
  // const [loginModalOpen, setLoginModalOpen] = useContext(LoginModalContext);
  // const [signUpModalOpen, setSignUpModalOpen] = useContext(SignUpModalContext);

  // const handleSignUpOpen = () => {
  //   setSignUpModalOpen(true);
  // };

  // const handleSignUpClose = () => {
  //   setSignUpModalOpen(false);
  // };

  // const handleLoginOpen = () => {
  //   setLoginModalOpen(true);
  // };

  // const handleLoginClose = () => {
  //   setLoginModalOpen(false);
  // };

  // useEffect(() => {
  //   if (
  //     window.location.pathname === "/home/signup" ||
  //     window.location.pathname === "/home/signup/"
  //   ) {
  //     setSignUpModalOpen(true);
  //   } else if (
  //     window.location.pathname === "/home/login" ||
  //     window.location.pathname === "/home/login/"
  //   ) {
  //     setLoginModalOpen(true);
  //   } else {
  //     setSignUpModalOpen(false);
  //     setLoginModalOpen(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <AppBar position="fixed" style={{ background: "#1d3557" }}>
        <ToolBar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            component={RouterLink}
            to="/home"
          >
            {"Co-Coders"}
          </Link>
          <div className={classes.right}>
            {authUser ? (
              <>
                {authUser && (
                  <Link
                    variant="h6"
                    underline="none"
                    color="inherit"
                    className={classes.rightLink}
                    component={RouterLink}
                    to="/edit-forms"
                  >
                    {authUser.displayName && `Welcome ${authUser.displayName}`}
                  </Link>
                )}
                <Link
                  variant="h6"
                  underline="none"
                  color="inherit"
                  className={classes.rightLink}
                  component={RouterLink}
                  to="/dashboard"
                >
                  {"Dashboard"}
                </Link>

                <Link
                  color="primary"
                  underline="none"
                  variant="h6"
                  component={RouterLink}
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  onClick={firebase.doSignOut}
                  size="small"
                  to="/home"
                >
                  Sign Out
                </Link>
                <RouterLink to="/account">
                  <Avatar alt={authUser.displayName} src={authUser.photoURL} />
                </RouterLink>
              </>
            ) : (
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  component={RouterLink}
                  to="/home/login"
                >
                  {"Sign In"}
                </Link>
                {/* <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  component={RouterLink}
                  to="/home/signup"
                >
                  {"Sign Up"}
                </Link> */}
              </>
            )}
          </div>
        </ToolBar>
      </AppBar>
      <div className={classes.placeholder} />
      {/* <Route
        path="/home/login"
        render={() => {
          return (
            <ModalComponentWrapper>
              <Modal
                animation={false}
                aria-labelledby="login-form"
                aria-describedby="login-form-for-co-coders"
                open={loginModalOpen}
                onClose={handleLoginClose}
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                disableBackdropClick
                disableEscapeKeyDown
              >
                <LoginForm />
              </Modal>
            </ModalComponentWrapper>
          );
        }}
      /> */}
      {/* <Route
        path="/home/signup"
        render={() => {
          return (
            <ModalComponentWrapper>
              <Modal
                animation={false}
                aria-labelledby="signup-form"
                aria-describedby="registration-form-for-co-coders"
                open={signUpModalOpen}
                onClose={handleSignUpClose}
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                disableBackdropClick
                disableEscapeKeyDown
              >
                <SignUpForm />
              </Modal>
            </ModalComponentWrapper>
          );
        }}
      /> */}
      {/* <Route
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
      /> */}
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
