import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { auth } from "firebase";

export default (props) => {
    const initialState = {
        email: "",
        password: "",
    };

    const loginUser = () => {
        props.firebase
            .doCreateUserWithEmailAndPassword(inputs.email, inputs.password)
            .then((authUser) => {
                alert("Signed in " + authUser.user.uid)
                console.log(authUser)
            })
            .catch((error) => {
                console.error(error.code, error.message);
            });
    };

    const { handleSubmit, handleInputChange, inputs } = useForm(
        initialState,
        loginUser
    );

    return (

        <form onSubmit={handleSubmit}>
            <div>
                <label type="text">Email</label>
                <input
                    name="email"
                    type="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label type="text">Password</label>
                <input
                    name="password"
                    type="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>

    );
};


