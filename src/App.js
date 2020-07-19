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

function App() {
  return (
    <div className="App">
      <div className="content-wrap">
        <AuthUserProvider>
          <Router>
            <Switch>
              <Route path="/home">
                <LandingComponent />
              </Route>
              <Route path="/edit-forms">
                <EditProfileForms />
              </Route>
              <Route path="/pw-forget" component={PasswordForgetForm} />
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
