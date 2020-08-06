import React, { useEffect, useContext, useState } from "react";
import useForm from "../../../hooks/useForm";
import { makeStyles } from "@material-ui/core/styles";
import { AuthUserContext } from "../../Firebase/AuthUser/AuthUserContext";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import statesInUsaData from "../data/statesInUsaData";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../../Session/index";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  photo: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
    alignItems: "center",
    height: "240px",
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttoncenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
  },
}));

const CreateProfileForm = ({ firebase, user }) => {
  const classes = useStyles();
  const authUser = useContext(AuthUserContext);
  const allInputs = {
    imgUrl: "",
  };
  const [url, setUrl] = useState(allInputs);
  const [progressbar, setProgressBar] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      handleUpload(image);
    }
  };

  const handleUpload = (imageAsFile) => {
    const uploadTask = firebase
      .getStorage()
      .ref(`images/${imageAsFile.name}`)
      .put(imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressBar((bar) => progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .getStorage()
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            setUrl((prevObject) => ({ ...prevObject, imgUrl: firebaseUrl }));

            firebase.getFirestore().collection("users").doc(`${user.uid}`).set(
              {
                photoURL: firebaseUrl,
              },
              { merge: true }
            );
          });
      }
    );
  };

  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    city: "",
    state: "",
    preferredCodingTime: "",
    frontendTechStack: "",
    backendTechStack: "",
    specialty: "",
    preferredTechStack: "",
    status: "",
    newUser: false,
    photoURL: "",
  };

  const createUser = () => {
    firebase
      .doProfileUpdate({ ...inputs, photoURL: url.imgUrl })
      .then((authUser) => {
        console.log("authUser: ", authUser);
      })
      .catch((error) => {
        console.error(error.code, error.message);
      });
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    initialState,
    createUser
  );

  //Reload page after user creates profile
  useEffect(() => {
    if (user !== initialState) {
      firebase.doGetUserProfile(authUser.uid, (user) => {
        if (user.data().newUser === false) {
          window.location.reload(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Create Your Profile</Typography>
        </Grid>
        <Grid item xs={12} className={classes.photo}>
          <Avatar
            src={url.imgUrl}
            className={classes.large}
            alt={user.firstName}
          />
        </Grid>
        <Grid item xs={12} className={classes.buttoncenter}>
          <label htmlFor="photoURL">
            <input
              type="file"
              style={{ display: "none" }}
              id="photoURL"
              name="photoURL"
              onChange={handleChange}
              value={inputs.photoURL}
            />
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={progressbar} />
              </Box>
              <Box minWidth={35}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${Math.round(progressbar)}%`}</Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload Profile Picture
            </Button>
          </label>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            required
            fullWidth
            type="text"
            label="First Name"
            value={inputs.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lastName"
            required
            fullWidth
            type="text"
            label="Last Name"
            value={inputs.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="city"
            required
            fullWidth
            type="text"
            label="City"
            value={inputs.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="state-selector-label">State</InputLabel>
            <Select
              labelId="state-selector-label"
              id="state-selector"
              name="state"
              value={inputs.state}
              onChange={handleInputChange}
            >
              {statesInUsaData.map((location) => (
                <MenuItem value={location.abbreviation}>
                  {location.abbreviation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl required component="fieldset">
            <FormLabel component="legend">Specialty</FormLabel>
            <RadioGroup
              aria-label="tech-specialty"
              name="tech-specialty1"
              value={inputs.specialty}
              onChange={handleInputChange}
            >
              <FormControlLabel
                name="specialty"
                value="Front-End"
                label="Front-End"
                control={<Radio />}
              />
              <FormControlLabel
                name="specialty"
                value="Back-End"
                label="Back-End"
                control={<Radio />}
              />
              <FormControlLabel
                name="specialty"
                label="Full-Stack"
                value="Full-Stack"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl required component="fieldset">
            <FormLabel component="legend">Fav. Coding Time</FormLabel>
            <RadioGroup
              aria-label="preferred-time"
              name="preferred-time1"
              value={inputs.preferredCodingTime}
              onChange={handleInputChange}
            >
              <FormControlLabel
                name="preferredCodingTime"
                value="morning"
                label="Morning"
                control={<Radio />}
              />
              <FormControlLabel
                name="preferredCodingTime"
                value="afternoon"
                label="Afternoon"
                control={<Radio />}
              />
              <FormControlLabel
                name="preferredCodingTime"
                value="evening"
                label="Evening"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="frontendTechStack"
            required
            fullWidth
            type="text"
            label="Front-End Tech Stack"
            value={inputs.frontendTechStack}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="backendTechStack"
            required
            fullWidth
            type="text"
            label="Back-End Tech Stack"
            value={inputs.backendTechStack}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="preferredTechStack"
            required
            fullWidth
            type="text"
            label="Preferred Tech Stack"
            value={inputs.preferredTechStack}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="status"
            fullWidth
            multiline
            type="text"
            label="Set Status"
            placeholder="Introduce yourself to your fellow Co-Coders!"
            value={inputs.status}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button variant="contained" fullWidth color="primary" type="submit">
            Create Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(CreateProfileForm);

// TODO: figure out image upload/hosting
// hosting: imgbb.com
// compression: https://helloacm.com/images-compressor/
