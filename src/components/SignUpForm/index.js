import React from "react";
import SignUpForm from "./form";
import { FirebaseContext } from '../../components/Firebase'
import { Paper, Typography } from '@material-ui/core'

import './style.css'

export default (props) => {

    return (
        <Paper id="signup-box">
            <Typography center variant="h5">Register</Typography>
            <FirebaseContext.Consumer>
                {firebase => <SignUpForm firebase={firebase} />}
            </FirebaseContext.Consumer>
        </Paper>
    );
};

