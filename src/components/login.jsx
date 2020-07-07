import React from "react";

export default class Login extends React.Component {
  initialstate = { username: "", password: "" };
  state = { ...this.initialstate };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form>
          <div>
            <label type="text" value={this.state.username}>
              User Name
            </label>
            <input type="text" />
          </div>
          <div>
            <label type="text">Password</label>
            <input type="password" />
          </div>
        </form>
      </div>
    );
  }
}
