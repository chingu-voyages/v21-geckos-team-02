import React, { useState } from "react";
import { withFirebase } from "../components/Firebase/index";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SuccessMessage from "./SuccessSnackbar";
import SuccessSnackbar from "./SuccessSnackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    background: "lavenderblush",
  },

  large: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
    alignItems: "center",
    height: "256px",
  },
  buttoncenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
  },
}));

function ImageUpload(props) {
  const classes = useStyles();
  const allInputs = {
    imgUrl: "",
  };

  const [url, setUrl] = useState(allInputs);
  const [progressbar, setProgressBar] = useState(0);
  const [saveChange, setSaveChange] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      handleUpload(image);
    }
  };

  const handleUpload = (imageAsFile) => {
    const uploadTask = props.firebase
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
        props.firebase
          .getStorage()
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            setUrl((prevObject) => ({ ...prevObject, imgUrl: firebaseUrl }));
            setSaveChange(true);
          });
      }
    );
  };

  return (
    <div>
      <form>
        <Card className={classes.root}>
          <CardHeader title="Co-Coder Member" subheader="Since 2020" />

          <div className={classes.photo}>
            <Avatar
              src={
                url.imgUrl ||
                "https://via.placeholder.com/256x256?text=My+Profile+Image"
              }
              className={classes.large}
            />
          </div>

          <CardContent>
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
          </CardContent>

          <div className={classes.buttoncenter}>
            <label htmlFor="upload-photo">
              <input
                type="file"
                onChange={handleChange}
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
              />

              <Button
                variant="contained"
                color="secondary"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </div>

          <CardContent>{saveChange && <SuccessSnackbar />}</CardContent>
        </Card>
      </form>
    </div>
  );
}

export default withFirebase(ImageUpload);
