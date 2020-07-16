import React, { useState } from "react";

const UserProfileContext = React.createContext([
  {
    firstName: "",
    lastName: "",
    displayName: "",
    city: "",
    state: "",
    preferredCodingTime: [],
    frontendTechStack: [],
    backendTechStack: [],
    specialty: [],
    preferredTechStack: [],
    bio: "",
  },
  () => {},
]);

const UserProfileProvider = ({ children }) => {
  const [userProfileParams, setUserProfileParams] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    city: "",
    state: "",
    preferredCodingTime: [],
    frontendTechStack: [],
    backendTechStack: [],
    specialty: [],
    preferredTechStack: [],
    bio: "",
  });

  return (
    <UserProfileContext.Provider
      value={[userProfileParams, setUserProfileParams]}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
