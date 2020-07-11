import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "../UI/Typography";
import bestSearch from "../../../assets/images/bestSearch.png";
const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: "flex",
    position: "relative",
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  image: {
    width: "100%",
  },
});

const ProductExamplar = (props) => {
  const { classes } = props;
  return (
    <Container className={classes.root}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        The Best Tech-Stack Search Engine Around
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Exclusively built for developers, by developers, Co-Coders aims to
        connect software engineers with similar skills to one another.
      </Typography>
      <img
        src={bestSearch}
        alt="best Search Engine"
        className={classes.image}
      />
    </Container>
  );
};

ProductExamplar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductExamplar);
