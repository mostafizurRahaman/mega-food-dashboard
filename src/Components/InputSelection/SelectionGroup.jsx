import { useState } from "react";

const SelectionGroup = () => {
   const [selectedFruit, setSelectedFruit] = useState("");

   const handleFruitChange = (event) => {
      setSelectedFruit(event.target.value);
   };

   const BusGroup = [
      {
         groupLabel: "Bonosreee",
         options: [
            { value: "Asim", label: "Asim" },
            { value: "Romjan", label: "Romjan" },
            { value: "Alif", label: "Alif" },
         ],
      },
      {
         groupLabel: "Aftab nagar",
         options: [
            { value: "Alif", label: "Alif" },
            { value: "econo", label: "econo" },
            { value: "jonaki", label: "jonaki" },
         ],
      },
      {
         groupLabel: "Mohakhali",
         options: [
            { value: "Sadhin", label: "sadhin" },
            { value: "himacol", label: "himacol" },
         ],
      },
   ];

   return (
      <div>
         <label
            className=" font-semibold text-sm capitalize"
            htmlFor="fruitSelect"
         >
            Select a Fruit:
         </label>
         <select
            id="busgroup"
            value={selectedFruit}
            onChange={handleFruitChange}
            className="w-full rounded-md border  border-black  -mb-1 p-2  text-black placeholder:text-black font-normal text-sm"
         >
            {BusGroup.map((group, index) => (
               <optgroup label={group.groupLabel} key={index}>
                  {group.options.map((option) => (
                     <option value={option.value} key={option.value}>
                        {option.label}
                     </option>
                  ))}
               </optgroup>
            ))}
         </select>
      </div>
   );
};

export default SelectionGroup;
