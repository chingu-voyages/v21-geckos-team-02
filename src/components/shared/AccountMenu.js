import React, { useState, useEffect, useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FirebaseContext } from "../Firebase/index";
import { AuthUserContext } from "../Firebase/AuthUser/AuthUserContext";

const useStyles = makeStyles((theme) => ({
  button: {
    // background: "white",
    fontWeight: 500,
    textTransform: "capitalize",
    borderColor: "lavenderblush",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: 4,
    paddingTop: 8,
    paddingBottom: 8,
    "& > span": {
      fontSize: "0.9em",
    },
  },
  downIcon: {
    color: "white",
    userSelect: "none",
    pointerEvents: "none",
  },
  upIcon: {
    color: "white",
    userSelect: "none",
    pointerEvents: "none",
    transform: "rotate(180deg)",
  },
  paper: {
    borderRadius: 4,
    marginTop: 8,
  },
}));

const AccountMenu = () => {
  const fb = useContext(FirebaseContext.Consumer);
  const authUser = useContext(AuthUserContext);
  const [doc, setDoc] = useState();

  useEffect(
    () => {
      if (authUser !== null && authUser !== undefined) {
        fb.doGetUserProfile(authUser.uid, (user) => {
          setDoc(user.data());
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const AccountMenuClasses = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <div>
          {authUser && doc !== undefined && !doc.newUser && (
            <div>
              <Button
                className={AccountMenuClasses.button}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <span style={{ color: "#ff3366" }}>
                  Hello {authUser.displayName}
                </span>
                <ExpandMoreIcon
                  className={
                    anchorEl
                      ? AccountMenuClasses.downIcon
                      : AccountMenuClasses.upIcon
                  }
                />
              </Button>
              <Menu
                id="simple-menu"
                classes={{ paper: AccountMenuClasses.paper }}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/edit-forms"
                >
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <Link to="/home">
                  <MenuItem onClick={firebase.doSignOut}>Log Out</MenuItem>
                </Link>
              </Menu>
            </div>
          )}
        </div>
      )}
    </FirebaseContext.Consumer>
  );
};

export default withRouter(AccountMenu);
