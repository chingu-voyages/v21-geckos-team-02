import React from "react";
import SignUpForm from "./form";
import { FirebaseContext } from '../../components/Firebase'
import { Paper, Typography, Snackbar, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import './style.css'

export default (props) => {

    return (
        <FirebaseContext.Consumer>
            {firebase =>
                <Paper id="signup-box">

                    {!props.authUser && <>
                        <Typography variant="h5">Register</Typography>
                        <SignUpForm firebase={firebase} /></>}
                    {props.authUser && <>
                        <Typography variant="h5">Welcome</Typography>
                        <Alert
                            severity="info"
                            action={<Button color="primary" variant="contained" onClick={firebase.doSignOut} size="small">Sign Out</Button>}>
                            Signed in as  {props.authUser.email}
                        </Alert></>
                    }

                </Paper>}
        </FirebaseContext.Consumer>
    );
};

