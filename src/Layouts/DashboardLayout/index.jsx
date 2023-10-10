import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../../Components";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const DashboardLayout = () => {
   const { isOpen } = useContext(AuthContext);
   return (
      <div className="">
         <div className={` flex items-start  relative  `}>
            <div
               className={`min-w-[230px] duration-300 transition-all  overflow-y-scroll bg-secondary shadow-[5px_5px_5px_#ddd]  z-[99]  p-3 min-h-screen  max-h-screen top-20  fixed  left-0   ${
                  !isOpen ? "md:absolute top-20    left-[-999px]" : "md:fixed "
               } `}
            >
               <SideBar></SideBar>
            </div>
            {isOpen && (
               <div className="hidden md:block  md:min-w-[230px]"></div>
            )}
            <div className="w-full  py-24 px-5 ">
               <div className="h-screen ">
                  <Outlet></Outlet>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;
