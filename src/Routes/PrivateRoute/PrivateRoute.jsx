/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
   const { user, loading } = useContext(AuthContext);
   const location = useLocation();

   if (loading) {
      return (
         <div>
            <h1>Loading........</h1>
         </div>
      );
   }
   if (user?.email && user?.status === "active" && user?.role === "admin") {
      return children;
   }
   return (
      <Navigate to="/" state={{ from: location.pathname }} replace></Navigate>
   );
};

export default PrivateRoute;
