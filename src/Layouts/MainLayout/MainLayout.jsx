import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const MainLayout = () => {
   const { setIsOpen } = useContext(AuthContext);
   return (
      <div className="">
         <Navbar setIsOpen={setIsOpen}></Navbar>
         <div className="">
            <Outlet></Outlet>
         </div>
      </div>
   );
};

export default MainLayout;
