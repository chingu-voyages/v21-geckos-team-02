import React from "react";
import SignUpForm from "./form";
import { FirebaseContext } from '../../components/Firebase'
import './style.css'

export default (props) => {

    return (
        <div className="signup-box">
            <h2>Sign Up</h2>
            <FirebaseContext.Consumer>
                {firebase => <SignUpForm firebase={firebase} />}
            </FirebaseContext.Consumer>
        </div>
    );
};

