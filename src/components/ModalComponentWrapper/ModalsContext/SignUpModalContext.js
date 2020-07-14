import React, { useState } from "react";

const SignUpModalContext = React.createContext([{}, () => {}]);

const SignUpModalProvider = ({ children }) => {
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  return (
    <SignUpModalContext.Provider value={[signUpModalOpen, setSignUpModalOpen]}>
      {children}
    </SignUpModalContext.Provider>
  );
};

export { SignUpModalContext, SignUpModalProvider };
