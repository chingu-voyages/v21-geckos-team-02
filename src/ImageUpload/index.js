import React, { useState } from "react";
import { withFirebase } from "../components/Firebase/index";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
  input: {
    display: "none",
  },
  buttoncenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function ImageUpload(props) {
  const classes = useStyles();
  const allInputs = {
    imgUrl: "",
  };
  const [imageAsFile, setImage] = useState("");
  const [url, setUrl] = useState(allInputs);
  const [progressbar, setProgressBar] = useState(0);
  const [error, setError] = useState(null);
  const [saveChange, setSaveChange] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage((imageFile) => image);
    }
  };

  const handleUpload = () => {
    console.log("start of upload");
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
        setError(error.message);
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
      <form onSubmit={handleUpload}>
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

          <CardContent>
            <input type="file" onChange={handleChange} />
          </CardContent>

          <div className={classes.buttoncenter}>
            <Button
              variant="contained"
              color="secondary"
              component="span"
              onClick={handleUpload}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </div>

          <CardContent>{error !== null && <p>{error.message}</p>}</CardContent>
          <CardContent>{saveChange && <p>Saved Change</p>}</CardContent>
        </Card>
      </form>
    </div>
  );
}

export default withFirebase(ImageUpload);
