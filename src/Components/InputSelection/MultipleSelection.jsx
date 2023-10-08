import { useState } from "react";

const MultipleSelection = () => {
   const [selectedOptions, setSelectedOptions] = useState([]);

   const handleMonths = (e) => {
      const value = e.target.name.toLowerCase().trim();
      const checked = e.target.checked;
      if (checked) {
         setSelectedOptions([...selectedOptions, value]);
      } else {
         const restItems = selectedOptions.filter((i) => i !== value);
         setSelectedOptions(restItems);
      }
   };
   console.log(selectedOptions);
   const options = [
      { id: "january", label: "January" },
      { id: "february", label: "February" },
      { id: "march", label: "March" },
      { id: "april", label: "April" },
      { id: "may", label: "May" },
      { id: "june", label: "June" },
      { id: "july", label: "July" },
      { id: "august", label: "August" },
      { id: "september", label: "September" },
      { id: "october", label: "October" },
      { id: "november", label: "November" },
      { id: "december", label: "December" },
   ];

   return (
      <div className=" group flex flex-col relative  ">
         <label htmlFor="">Fees Month</label>
         <input
            type="text"
            disabled
            placeholder={`${
               selectedOptions?.length > 0
                  ? selectedOptions?.length > 5
                     ? `${selectedOptions.length} months`
                     : `${selectedOptions.join()}`
                  : "select option"
            }`}
            className="border text-black border-black px-3 py-1 rounded-lg placeholder:text-black"
         />
         <div className="hidden group-hover:block  rounded-lg opacity-100 absolute top-[58px] p-2 left-0 bg-white shadow-[10px_10px_10px_10px_#ddd] w-full z-10  ">
            <ul className="flex  flex-col h-48 overflow-y-auto ">
               {options.map((i) => (
                  <label
                     onChange={handleMonths}
                     className="flex items-center rounded-lg gap-2 px-2 py-1 duration-500 hover:bg-blue-400"
                     key={i.id}
                  >
                     <input
                        type="checkbox"
                        checked={selectedOptions.includes(
                           i.id.toLowerCase().trim()
                        )}
                        name={i.id}
                     />
                     <span>{i.label}</span>
                  </label>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default MultipleSelection;
