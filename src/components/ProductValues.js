import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
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
    marginBottom: theme.spacing(25),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
    backgroundColor: "lavenderBlush",
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    zIndex: 1000,
  },
  image: {
    height: 55,
    zIndex: 1000,
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
                Free, Easy, Optimal
              </Typography>
              <Typography variant="h5">
                {
                  "Make connections to other coders within your neighborhoods, city, state and country "
                }
                {
                  ", who speak the same language and have quite similar time budget for coding."
                }
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
                Various criteria
              </Typography>
              <Typography variant="h5">
                {
                  "Easily search by location, spoken language, expertise, preferred tech-stack and time budget "
                }
                {
                  ", or by goal of learning a new tech-stack and upgrading your skillsets."
                }
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
                New experience
              </Typography>
              <Typography variant="h5">
                {
                  "Make new friends, experience pair-programming or working in a team "
                }
                {", learn new things and good practice from your team-members."}
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
