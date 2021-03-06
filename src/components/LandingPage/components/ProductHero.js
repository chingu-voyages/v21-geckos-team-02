import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "../UI/Button";
import Typography from "../UI/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import heroImage from "../../../assets/images/heroImage.jpg";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${heroImage})`,
    backgroundColor: "#c49c48",
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

const ProductHero = (props) => {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <img
        style={{ display: "none" }}
        src={heroImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Expand Your Coding Network!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Find the perfect local or remote developer for the job.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className="classes.button"
        component={Link}
        to="/signup"
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Enjoy a seamless matchmaking experience
      </Typography>
    </ProductHeroLayout>
  );
};

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
