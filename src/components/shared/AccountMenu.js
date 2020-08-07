import React, { useRef, useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FirebaseContext } from "../Firebase/index";

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: 500,
    textTransform: "capitalize",
    borderColor: "lavenderblush",
    borderStyle: "solid",
    borderWidth: "1px",
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

const AccountMenu = React.forwardRef((props, ref) => {
  const firebase = useContext(FirebaseContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const AccountMenuClasses = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonRef = useRef();

  return (
    <div>
      <div ref={buttonRef}>
        <Button
          className={AccountMenuClasses.button}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <ExpandMoreIcon
            className={
              anchorEl ? AccountMenuClasses.downIcon : AccountMenuClasses.upIcon
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
          ref={ref}
        >
          <Link to="/dashboard">
            <MenuItem onClick={handleClose}>Visit Dashboard</MenuItem>
          </Link>

          <Link to="/account">
            <MenuItem onClick={handleClose}>View My Profile</MenuItem>
          </Link>

          <Link to="/edit-forms">
            <MenuItem onClick={handleClose}>Edit My Profile</MenuItem>
          </Link>

          <Link to="/account/pw-change">
            <MenuItem onClick={handleClose}>Settings</MenuItem>
          </Link>

          <Link to="/home">
            <MenuItem onClick={firebase.doSignOut}>Sign Out</MenuItem>
          </Link>
        </Menu>
      </div>
    </div>
  );
});

export default AccountMenu;
