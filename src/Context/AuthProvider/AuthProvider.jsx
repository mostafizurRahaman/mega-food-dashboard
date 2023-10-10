/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false);

   const authInfo = { isOpen, setIsOpen };
   return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
   );
};

export default AuthProvider;
