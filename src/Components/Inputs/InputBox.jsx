/* eslint-disable react/prop-types */

import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const InputBox = ({ type, name, onChange, placeholder, icon, error }) => {
   const [isFocus, setFocus] = useState(false); 

   return (
      <div className="w-full">
         <div className="group flex items-center justify-start w-full border border-gray-500 py-2 pl-1 gap-2  rounded-md ">
            <span className={` text-[26px] ${isFocus && "text-blue-500"}`}>{icon}</span>
            <input
               type={type}
               name={name}
               placeholder={placeholder}
               onChange={onChange}
               className="text-lg border-0 outline-none w-full h-full placeholder:capitalize "
               onFocus={()=> setFocus(true)}
               onBlur={()=> setFocus(false)}
            />
         </div>
         {error && <ErrorMessage message={error}></ErrorMessage>}
      </div>
   );
};

export default InputBox;
