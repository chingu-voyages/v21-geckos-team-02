import React from "react";

import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";

import { withFirebase } from "../Firebase/index";

import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from "@material-ui/core/Button";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

//Checks if the authenticated user has a verified email
// and an email password sign in on associated with it

const needsEmailVerification = (authUser) =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map((provider) => provider.providerId)
    .includes("password");

const withEmailVerification = (Component) => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <SnackbarContent
                    message=" E-Mail confirmation sent: Check your E-Mails (Spam folder
                    included) for a confirmation E-Mail. Refresh this page once
                    you confirmed your E-Mail."
                  />
                ) : (
                  <SnackbarContent
                    style={{ background: "#43A047" }}
                    message="Email not verified. Please verify your Email now. Only click the button when you don't see the confirmation email."
                  />
                )}
                <span>To send verification</span>
                <Link
                  variant="h6"
                  underline="none"
                  color="inherit"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                  component={RouterLink}
                >
                  Click Here
                </Link>
                {/* <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<AlternateEmailIcon />}
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </Button> */}
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
