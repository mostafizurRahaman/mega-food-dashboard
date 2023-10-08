/* eslint-disable react/prop-types */
import { useState } from "react";

const InputSelection = ({ label, data, setData, field, options, selectOp }) => {
   const [selected, setSelected] = useState("");

   const handleSelecdtion = (e) => {
      const items = e.target.value;
      const name = e.target.name;
      if (!items === "") {
         return;
      }

      setSelected(items);
      setData({ ...data, [name]: items.trim().toLowerCase() });
      return;
   };

   return (
      <div className="flex flex-col gap-1 w-full">
         <label className="text-sm capitalize font-semibold text-black">
            {label}
         </label>
         <select
            className="w-full rounded-md border  border-black  -mb-1 p-2  text-black placeholder:text-black font-normal text-sm"
            onChange={handleSelecdtion}
            name={field}
         >
            <option className="text-xs capitalize" value="" selected>
               {selectOp}
            </option>
            {options?.map((option, idx) => (
               <option
                  className="text-xs capitalize"
                  selected={selected === option}
                  key={idx}
                  value={option}
               >
                  {option}
               </option>
            ))}
         </select>
      </div>
   );
};

export default InputSelection;
