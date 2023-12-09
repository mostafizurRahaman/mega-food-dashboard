/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { baseURL } from "../../Configs/libs";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [isOpen, setIsOpen] = useState(false);
   const accessToken = localStorage.getItem("accessToken");
   

   //  user status observer:
   useEffect(() => {
      setLoading(true);
      fetch(`${baseURL}/user/me`, {
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${accessToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.status === "success") {
               setUser(data.data);
               setLoading(false);
            }
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
         })
         .finally(() => {
            setLoading(false);
         });
   }, [accessToken]);

   const logOut = () => {
      localStorage.removeItem("accessToken");
      setUser(null);
   };

   const authInfo = { isOpen, setIsOpen, loading, user, setUser, logOut };
   return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
   );
};

export default AuthProvider;
