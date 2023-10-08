/* eslint-disable react/prop-types */

import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

const SummeryDetails = ({ groupName, children, icon }) => {
   const [open, setOpen] = useState(false);

   return (
      <details className={`border-t border-white  text-white text-sm py-2 `}>
         <summary
            className="text-sm flex justify-between items-center"
            onClick={() => setOpen(!open)}
         >
            <div className="flex items-center gap-2">
               <span className="text-sm w-4  h-4">{icon}</span>
               <span className="text-[13px]">{groupName}</span>
            </div>
            <BiSolidDownArrow
               className={`${
                  !open ? " rotate-90  " : "rotate-0 text-green-600"
               } duration-1000 transition-transform text-xs`}
            ></BiSolidDownArrow>
         </summary>

         <ul className={`flex pl-1 flex-col gap-1 text-white py-1`}>
            {children}
         </ul>
      </details>
   );
};

export default SummeryDetails;
