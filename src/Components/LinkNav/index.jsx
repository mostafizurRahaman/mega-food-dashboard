/* eslint-disable react/prop-types */
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const LinkNav = ({ path, title, icon, style }) => {
   return (
      <NavLink
         to={path}
         className={`${({ isActive }) =>
            isActive
               ? "text-green-400 flex items-center  justify-start  rounded-md"
               : " flex items-center  space-x-3 rounded-md text-accent "}  `}
      >
         {icon ? icon : <TbArrowBadgeRightFilled />}
         <span className={`${style ? style : "text-xs"}`}>{title}</span>
      </NavLink>
   );
};

export default LinkNav;
