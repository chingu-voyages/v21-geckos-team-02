import React from "react";
import { FirebaseContext } from "./Firebase";
import useForm from "../hooks/useForm";

const Login = () => {
  const initialState = {
    userName: "",
    password: "",
  };

  const loginUser = () => {};
  const { handleSubmit, handleInputChange, inputs } = useForm(
    initialState,
    loginUser
  );
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label type="text">User Name</label>
          <input
            type="text"
            value={inputs.userName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label type="text">Password</label>
          <input
            type="password"
            value={inputs.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
