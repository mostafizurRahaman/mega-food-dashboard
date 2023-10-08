import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar2 from "../../Components/Navbar";

import Siderbar from "../../Components/Sidebar";
const DashboardLayout = () => {
   const [isOpen, setIsOpen] = useState(true);
   return (
      <div className="">
         <Navbar2 setIsOpen={setIsOpen}></Navbar2>
         <div className={` flex items-start  relative  `}>
            <div
               className={`min-w-[230px] duration-300 overflow-y-scroll bg-[#0C2556] p-3 min-h-screen  top-16  absolute  left-0  ${
                  !isOpen
                     ? "md:absolute top-20   transition-all left-[-999px]"
                     : "md:fixed "
               } `}
            >
               <Siderbar></Siderbar>
            </div>
            {isOpen && <div className="hidden lg:block lg:min-w-[230px]"></div>}
            <div className="w-full h-screen py-5 mt-10 ">
               <Outlet></Outlet>
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;
