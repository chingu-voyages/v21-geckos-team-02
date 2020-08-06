import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session/index";

const Dashboard = () => {
  return <div>This is the dashboard</div>;
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Dashboard);
