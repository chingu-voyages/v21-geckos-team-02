import React, { Fragment } from "react";
// import UpdateProfileForm from "./form";
// import { FirebaseContext } from "../Firebase";
// import { Paper, Typography, Grid, Button } from "@material-ui/core";
// import { Alert } from "@material-ui/lab";
// import { Link } from "react-router-dom";
// import "./style.css";

// TODO: Create form container below
const EditProfileDisplay = (props) => {
  return (
    <Fragment />
    // <FirebaseContext.Consumer>
    //   {(firebase) => (
    //     <Paper id="edit-profile-box">
    //       {!props.authUser && (
    //         <Grid container spacing={3}>
    //           <Grid item xs={12}>
    //             <Typography variant="h5">Register</Typography>
    //           </Grid>
    //           <Grid item xs={12}>
    //             <SignUpForm firebase={firebase} />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <Typography>
    //               <Link to="/login">Already have an account? Log In!</Link>
    //             </Typography>
    //           </Grid>
    //         </Grid>
    //       )}
    //       {props.authUser && (
    //         <Grid container spacing={3}>
    //           <Grid item xs={12}>
    //             <Typography variant="h5">Welcome</Typography>
    //           </Grid>
    //           <Grid item xs={12}>
    //             <Alert
    //               severity="info"
    //               action={
    //                 <Button
    //                   color="primary"
    //                   variant="contained"
    //                   onClick={firebase.doSignOut}
    //                   size="small"
    //                 >
    //                   Sign Out
    //                 </Button>
    //               }
    //             >
    //               Signed in as {props.authUser.email}
    //             </Alert>
    //           </Grid>
    //         </Grid>
    //       )}
    //     </Paper>
    //   )}
    // </FirebaseContext.Consumer>
  );
};

export default EditProfileDisplay;
