import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { AuthUserProvider } from "./components/Firebase/AuthUser/AuthUserContext";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <AuthUserProvider>
        <App />
      </AuthUserProvider>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
