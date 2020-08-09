import React, { useContext } from "react";
import Link from "@material-ui/core/Link";
import AppBar from "./AppBar";
import ToolBar, { styles as toolbarStyles } from "./Toolbar";
import { Link as RouterLink } from "react-router-dom";
import { AuthUserContext } from "../../../Firebase/AuthUser/AuthUserContext";
import { makeStyles } from "@material-ui/core/styles";
import AccountMenu from "../../../shared/AccountMenu";

const useStyles = makeStyles((theme) => ({
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
    fontSize: 14,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
}));

function NavBar() {
  const authUser = useContext(AuthUserContext);
  const classes = useStyles();

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
            to="/"
          >
            {"Co-Coders"}
          </Link>
          <div className={classes.right}>
            {authUser ? (
              <>
                <AccountMenu />
              </>
            ) : (
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={classes.rightLink}
                  component={RouterLink}
                  to="/login"
                >
                  {"Sign In"}
                </Link>
              </>
            )}
          </div>
        </ToolBar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

export default NavBar;
