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
import EditProfileForms from "./components/EditProfileForms";

function App() {
  return (
    <div className="App">
      <AuthUserProvider>
        <Router>
          <Switch>
            <Route path="/home">
              <LandingComponent />
            </Route>
            <Route path="/home">
              <LandingComponent />
            </Route>
            <Route path="/edit-forms">
              <EditProfileForms />
            </Route>
            {/* <Route path="/mockdata">
              <MockData />
            </Route> */}
            <Route render={() => <Redirect to="/home" />} />
          </Switch>
        </Router>
      </AuthUserProvider>
    </div>
  );
}

export default App;
