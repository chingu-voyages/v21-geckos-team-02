import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../";

const AuthUserContext = React.createContext(null);

const AuthUserProvider = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useState(null);

  // Listen for Firebase (authorization)/authentication changes
  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("The user is logged in");
        setAuthUser(authUser);
      } else {
        console.log("The user is not logged in");
        setAuthUser(null);
      }
      // setAuthUser(authUser);
    });
  }, [firebase.auth]);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
};

export { AuthUserContext, AuthUserProvider };
