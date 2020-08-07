import React, { useEffect, useContext, useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import LandingComponent from "./components/LandingPage/Landing.component";
// import { AuthUserProvider } from "./components/Firebase/AuthUser/AuthUserContext";
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
import { FirebaseContext } from "./components/Firebase/index";
import { AuthUserContext } from "./components/Firebase/AuthUser/AuthUserContext";

function App() {
  const authUser = useContext(AuthUserContext);
  const fb = useContext(FirebaseContext);
  const [doc, setDoc] = useState();
  const [didMount, setDidMount] = useState(false);

  useEffect(
    () => {
      if (authUser !== null && authUser !== undefined) {
        fb.doGetUserProfile(authUser.uid, (user) => {
          setDoc(user.data());
        });
      }
      setDidMount(true);
      return () => setDidMount(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authUser]
  );

  if (!didMount) {
    return null;
  }

  return (
    <div className="App">
      <div className="content-wrap">
        {/* <AuthUserProvider> */}
        <Router>
          <NavBar user={doc} />
          <Switch>
            <Route exact path="/home">
              <LandingComponent />
            </Route>
            <Route path="/edit-forms">
              <EditProfileForms />
            </Route>
            <Route path="/home/signup">
              <SignUpForm />
            </Route>
            <Route path="/home/login">
              <LoginForm />
            </Route>
            <Route path="/account/pw-forget" component={PasswordForgetForm} />
            <Route path="/dashboard" component={Dashboard} />

            <Route path="/account/pw-change" component={PasswordChange} />
            <Route exact path="/account" component={AccountPage} />
            <Route path="*" render={() => <Redirect to="/home" />} />
          </Switch>
        </Router>
        {/* </AuthUserProvider> */}
      </div>
      <Footer />
    </div>
  );
}

export default withAuthentication(App);
