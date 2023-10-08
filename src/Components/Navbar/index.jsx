/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineCloseCircle } from "react-icons/ai";
const Navbar2 = ({ setIsOpen }) => {
   const [user, setUser] = useState({
      _id: 1,
      name: "mostafiz",
   });
   const [show, setShow] = useState(false);

   return (
      <nav
         className={`flex items-center bg-[#0C2556] justify-between h-16 px-10  fixed w-full  top-0 z-[999]  shadow-2xl `}
      >
         <div className="text-white  font-bold uppercase text-2xl flex gap-3 items-center justify-center ">
            <h2>Mega Food</h2>
            <FaBarsStaggered
               onClick={() => setIsOpen((prev) => !prev)}
               className={`text-2xl left-[200px] font-bold text-red-500  absolute top-5 
            `}
            ></FaBarsStaggered>
         </div>
         <div
            className={` w-[250px] lg:w-auto bg-[#0c2556]  lg:bg-transparent rounded-b-lg lg:rounded-none absolute lg:static z-50 ${
               show
                  ? "top-16 left-0 px-10 transition-all duration-300 "
                  : "left-[-999px] "
            } `}
         >
            <ul className="flex flex-col lg:flex-row  items-start lg:items-center  text-base text-white ">
               <li className="btn btn-ghost">
                  <Link to="/dashboard">Dashboard</Link>
               </li>
               <li className="btn btn-ghost">
                  <Link to="/todaysfollowup">TodaysFollowup</Link>
               </li>
               {user?._id ? (
                  <li className="btn btn-ghost">
                     <BiLogOut className="text-red-600 rotate-180 text-xl"></BiLogOut>
                  </li>
               ) : (
                  <li className="btn btn-ghost">
                     <Link to="/login">Login</Link>
                  </li>
               )}
            </ul>
         </div>
         <div
            className="block lg:hidden text-red-500"
            onClick={() => setShow((perv) => !perv)}
         >
            {show ? (
               <AiOutlineCloseCircle className="text-2xl"></AiOutlineCloseCircle>
            ) : (
               <FaBarsStaggered className="text-2xl"></FaBarsStaggered>
            )}
         </div>
      </nav>
   );
};

export default Navbar2;
