import React from "react";
import { compose } from "recompose";
import { Grid } from "@material-ui/core";
import { withAuthorization, withEmailVerification } from "../Session/index";
import MatchedUserCards from "../UserCards/MatchedUsersCards/index";

const Dashboard = () => {
  return (
    <Grid container>
      <MatchedUserCards />
    </Grid>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Dashboard);
