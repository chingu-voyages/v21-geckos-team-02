import React from "react";
import LoginForm from "./form";
import { FirebaseContext } from '../../components/Firebase'
import { Paper, Typography, Button, Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import './style.css'
import { Link } from "react-router-dom";

export default (props) => {

    return (
        <FirebaseContext.Consumer>
            {firebase =>
                <Paper id="login-box">

                    {!props.authUser && <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Log In</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <LoginForm firebase={firebase} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography><Link to="/signup">Need an account? Sign Up!</Link></Typography>
                        </Grid>
                    </Grid>}
                    {props.authUser && <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Welcome</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Alert
                                severity="info"
                                action={<Button color="primary" variant="contained" onClick={firebase.doSignOut} size="small">Sign Out</Button>}>
                                Signed in as  {props.authUser.email}
                            </Alert>
                        </Grid>
                    </Grid>}

                </Paper>}
        </FirebaseContext.Consumer>
    );
};

