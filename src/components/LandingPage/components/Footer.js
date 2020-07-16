import React from "react";
import { AppBar } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

export function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link
        color="inherit"
        href="https://github.com/chingu-voyages/v21-geckos-team-02"
      >
        Co-Coders, Inc.
      </Link>{" "}
      {new Date().getFullYear()}. &nbsp;
      <span>All rights reserved.</span>
    </React.Fragment>
  );
}

export default function Footer() {
  const styles = {
    dislay: "flex",
    justifyContent: "center",
  };

  return (
    <div style={styles}>
      <AppBar position="static" style={{ background: "#1d3557" }}>
        <Container maxWidth="md">
          <Toolbar style={styles}>
            <Typography variant="body1" align="center">
              <Copyright />
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
