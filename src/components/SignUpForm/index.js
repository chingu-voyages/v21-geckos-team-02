import React from "react";
import SignUpForm from "./form";
import { FirebaseContext } from '../../components/Firebase'
import { Paper, Typography } from '@material-ui/core'

import './style.css'

export default (props) => {

    return (
        <Paper id="signup-box">
            <Typography variant="h5">Register</Typography>
            {!props.authUser &&
                <FirebaseContext.Consumer>
                    {firebase => <SignUpForm firebase={firebase} />}
                </FirebaseContext.Consumer>}
            {props.authUser && <div>Already signed in {props.authUser.email}</div>}
        </Paper>
    );
};

