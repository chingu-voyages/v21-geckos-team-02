import React from "react";
import SignUpForm from "./form";
import { FirebaseContext } from '../../components/Firebase'
import { Paper, Typography, Grid, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import './style.css'

export default (props) => {

    return (
        <FirebaseContext.Consumer>
            {firebase =>
                <Paper id="signup-box">

                    {!props.authUser && <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography variant="h5">Register</Typography>
                        </Grid>
                        <Grid item>
                            <SignUpForm firebase={firebase} />
                        </Grid>
                        <Grid item xs>
                            <Button fullWidth color="secondary">Already have an account? Log In!</Button>
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

