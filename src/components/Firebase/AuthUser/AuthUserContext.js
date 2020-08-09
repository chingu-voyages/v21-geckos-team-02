import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../";

const AuthUserContext = React.createContext();

const AuthUserProvider = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useState(null);

  // Listen for Firebase (authorization)/authentication changes
  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      setAuthUser(authUser);
    });
  }, [firebase.auth]);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
};

export { AuthUserContext, AuthUserProvider };
