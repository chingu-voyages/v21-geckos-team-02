import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import LandingComponent from "./components/LandingPage/Landing.component";
// import MockData from "./components/MockData";
import { AuthUserProvider } from "./components/Firebase/AuthUser/AuthUserContext";
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
              {/* <Route path="/mockdata">
              <MockData />
            </Route> */}
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
