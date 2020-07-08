import React, { useState, useEffect, useContext } from "react";
import Landing from "./components/Landing/Landing.component";
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
      <Landing />
      {/* <h1>Hello World</h1>
      <SignUpForm authUser={authUser} /> */}
    </div>
  );
}

export default App;
