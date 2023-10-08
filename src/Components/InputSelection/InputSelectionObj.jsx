/* eslint-disable react/prop-types */
import { useState } from "react";

const InputSelectionObj = ({
   label,
   data,
   setData,
   selectedId,
   selectedName,
   options,
   selectOp,
}) => {
   const [selected, setSelected] = useState("");

   const handleSelecdtion = (e) => {
      const id = e.target.value;
      if (!id === "") {
         return;
      }
      const op = options.find((i) => i._id === id);
      setSelected(id);
      setData({ ...data, [selectedName]: op.name.toLowerCase().trim(), [selectedId]: id });
   };

   return (
      <div className="flex flex-col gap-1 w-full">
         <label className="text-sm capitalize font-semibold text-black">
            {label}
         </label>
         <select
            className="w-full rounded-md border  border-black  -mb-1 p-2  text-black placeholder:text-black font-normal text-sm"
            onChange={handleSelecdtion}
         >
            <option className="text-xs capitalize" value="" selected>
               {selectOp}
            </option>
            {options?.map((option, idx) => (
               <option
                  className="text-xs capitalize"
                  selected={selected === option._id}
                  key={idx}
                  value={option._id}
                  name={option.name}
               >
                  {option.name}
               </option>
            ))}
         </select>
      </div>
   );
};

export default InputSelectionObj;
