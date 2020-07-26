import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import LandingComponent from "./components/LandingPage/Landing.component";
import { AuthUserProvider } from "./components/Firebase/AuthUser/AuthUserContext";
import EditProfileForms from "./components/EditProfileForms";
import { PasswordForgetForm } from "./components/PasswordForget/form";
import Footer from "./components/LandingPage/components/Footer";
import "./styles/scss/App.css";
import AccountPage from "./components/Account/AccountPage";
import PasswordChange from "./components/PasswordChange/form";
// import Dashboard from "./components/Dashboard";
// import NavBar from "./components/LandingPage/components/Navbar/Navbar.component";

function App() {
  return (
    <div className="App">
      <div className="content-wrap">
        <AuthUserProvider>
          <Router>
            {/* <NavBar /> */}
            <Switch>
              <Route path="/home">
                <LandingComponent />
              </Route>
              <Route path="/edit-forms">
                <EditProfileForms />
              </Route>
              <Route path="/account/pw-forget" component={PasswordForgetForm} />
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              <Route path="/account/pw-change" component={PasswordChange} />
              <Route path="/account" component={AccountPage} />
              <Route render={() => <Redirect to="/home" />} />
            </Switch>
          </Router>
        </AuthUserProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
