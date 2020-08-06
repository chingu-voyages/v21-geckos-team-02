import React from "react";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";
import { withFirebase } from "../Firebase/index";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Card from "@material-ui/core/Card";

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
              <Card>
                {this.state.isSent ? (
                  <SnackbarContent
                    style={{ background: "#43A047" }}
                    message=" E-Mail confirmation sent: Check your E-Mails (Spam folder
                    included) for a confirmation E-Mail. Refresh this page once
                    you confirmed your E-Mail."
                  />
                ) : (
                  <SnackbarContent
                    style={{ background: "#43A047" }}
                    message="Email not verified! 
                    Step 1: Please verify your email address, click continue. 
                    Step 2: Click Register to create your profile.
                    "
                  />
                )}
                <span>
                  In case you don't see your email verification link:{" "}
                </span>
                <br />
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
              </Card>
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
