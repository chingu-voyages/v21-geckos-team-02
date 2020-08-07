import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const AccountMenuClasses = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div>
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
        >
          <Link to="/account">
            <MenuItem onClick={handleClose}>View My Profile</MenuItem>
          </Link>

          <Link to="/edit-forms">
            <MenuItem onClick={handleClose}>Edit My Profile</MenuItem>
          </Link>

          <Link to="/account/pw-change">
            <MenuItem onClick={handleClose}>Settings</MenuItem>
          </Link>
        </Menu>
      </div>
    </div>
  );
};

export default AccountMenu;
