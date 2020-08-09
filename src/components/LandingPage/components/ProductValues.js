import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../UI/Typography";
import searchEngine from "../../../assets/images/searchEngine.png";
import experience from "../../../assets/images/experience.png";
import filters from "../../../assets/images/filters.jpg";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(22),
    display: "flex",
    position: "relative",
    backgroundColor: "lavenderBlush",
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
  image: {
    height: 55,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                src={searchEngine}
                alt="search engine"
                className={classes.image}
              />
              <Typography variant="h6" className={classes.title}>
                Free, Easy, Optimized
              </Typography>
              <Typography variant="h5">
                Quickly find other coders with similar tech-stacks, experience,
                and personal interests. Whether in the same neighborhood or
                across the world, you can connect and make things happen!
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                src={filters}
                alt="various filters"
                className={classes.image}
              />
              <Typography variant="h6" className={classes.title}>
                Specific or broad criteria
              </Typography>
              <Typography variant="h5">
                Easily search by location, spoken language, expertise, preferred
                tech-stack, or time budget... or even with the goal of learning
                a new tech-stack and upgrading your skillset.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                src={experience}
                alt="exciting experience"
                className={classes.image}
              />
              <Typography variant="h6" className={classes.title}>
                New experiences
              </Typography>
              <Typography variant="h5">
                Pair-program or work in a team, learn new tech and best
                practices, and make new friends!
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
