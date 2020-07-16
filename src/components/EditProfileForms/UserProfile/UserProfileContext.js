import React, { useState } from "react";

const UserProfileContext = React.createContext();

const UserProfileProvider = ({ children }) => {
  const [userProfileParams, setUserProfileParams] = useState({});

  return (
    <UserProfileContext.Provider value={userProfileParams}>
      {children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
