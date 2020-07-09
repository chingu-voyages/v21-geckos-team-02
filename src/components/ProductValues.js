import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import wood from "../../src/assets/images/wood.jpg";
import searchEngine from "../../src/assets/images/searchEngine.png";
import experience from "../../src/assets/images/experience.png";
import filters from "../../src/assets/images/filters.jpg";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img src={wood} className={classes.item} alt="wood" />
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <img src={searchEngine} alt="search engine" />
            <Typography variant="h6" className={classes.title}>
              Free, Easy, Optimal Search Engine
            </Typography>
            <Typography variant="h5">
              {
                "Easily search for co-coders from the same neighborhoods, city, country"
              }
              {", results are instantly returned for free."}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <img src={filters} alt="various filters" />
            <Typography variant="h6" className={classes.title}>
              Various filters criteria
            </Typography>
            <Typography variant="h5">
              {"Find buddies specialized in the same tech-stack as you are"}
              {", or interested to learn a new tech-stack from anywhere."}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <img src={experience} alt="exciting experience" />
            <Typography variant="h6" className={classes.title}>
              New and exciting experience
            </Typography>
            <Typography variant="h5">
              {"Make new friends, experience working in a team"}
              {", learn new things and good practice from your team-members."}
            </Typography>
          </div>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
