import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "./components/SignUpForm/";
import LandingComponent from "./components/Landing/Landing.component";
import LoginForm from "./components/LoginForm/";
import { FirebaseContext } from "./components/Firebase";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  // Listen for Firebase authorization changes
  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      setAuthUser(authUser);
    });
  }, [firebase.auth]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUpForm authUser={authUser} />
          </Route>
          <Route path="/login">
            <LoginForm authUser={authUser} />
          </Route>
          <Route path="/">
            <LandingComponent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
