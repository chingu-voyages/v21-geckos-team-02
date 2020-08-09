import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import LandingComponent from "./components/LandingPage/Landing.component";
import EditProfileForms from "./components/EditProfileForms";
import { PasswordForgetForm } from "./components/PasswordForget/form";
import Footer from "./components/LandingPage/components/Footer";
import "./styles/scss/App.css";
import AccountPage from "./components/Account/AccountPage";
import PasswordChange from "./components/PasswordChange/form";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/LandingPage/components/Navbar/Navbar.component";
import { withAuthentication } from "./components/Session/index";

function App() {
  return (
    <div className="App">
      <div className="content-wrap">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <LandingComponent />
            </Route>
            <Route path="/edit-forms">
              <EditProfileForms />
            </Route>
            <Route path="/signup">
              <SignUpForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/account/pw-forget" component={PasswordForgetForm} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/account/pw-change" component={PasswordChange} />
            <Route exact path="/account" component={AccountPage} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default withAuthentication(App);
