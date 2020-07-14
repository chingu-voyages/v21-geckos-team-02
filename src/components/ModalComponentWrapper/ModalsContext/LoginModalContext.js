import React, { useState } from "react";

const LoginModalContext = React.createContext([{}, () => {}]);

const LoginModalProvider = ({ children }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <LoginModalContext.Provider value={[loginModalOpen, setLoginModalOpen]}>
      {children}
    </LoginModalContext.Provider>
  );
};

export { LoginModalContext, LoginModalProvider };
