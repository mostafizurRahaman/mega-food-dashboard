/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = ({ setIsOpen }) => {
   const [user, setUser] = useState("");

   return (
      <nav
         className={`flex  flex-wrap items-center bg-primary justify-center md:justify-between h-24 md:h-20 px-5 md:px-10   fixed  w-full  top-0 z-[999]  shadow-2xl `}
      >
         <div className="w-1/2  md:w-auto md:order-1">
            <div className="text-white font-bold uppercase text-2xl flex gap-3 items-center justify-starts ">
               <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={`  p-[5px] rounded-sm hover:bg-secondary text-secondary hover:text-primary  duration-500 cursor-pointer   font-bold
                `}
               >
                  <FaBarsStaggered size={24}></FaBarsStaggered>
               </div>
               <Link to="/dashboard">
                  <h2>Mega Food</h2>
               </Link>
            </div>
         </div>
         <div className=" w-1/2 md:w-auto md:order-2 flex items-center justify-end gap-5 text-secondary font-bold">
            <Link to="/dashboard">Dashboard</Link>

            <Link
               to="/"
               className="px-3 py-1 rounded-lg bg-secondary text-primary"
            >
               Login
            </Link>
         </div>
      </nav>
   );
};

export default Navbar;
