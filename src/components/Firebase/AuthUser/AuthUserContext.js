import React from "react";

const AuthUserContext = React.createContext(null);

export const AuthUserProvider = AuthUserContext.Provider;
export const AuthUserConsumer = AuthUserContext.Consumer;

export default AuthUserContext;
