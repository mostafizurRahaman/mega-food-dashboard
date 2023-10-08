/* eslint-disable react/prop-types */
const TableHeader = ({ fields, children }) => {
   return (
      <table  className="border text-center font-normal border-black text-black mx-auto w-full text-xs md:text-sm capitalize ">
         <thead >
            <tr className="border bg-gray-500 text-white border-black">
               {fields?.map((i, idx) => (
                  <th className="border border-black px-1 min-w-[40px]" key={idx}>
                     {i}
                  </th>
               ))}
            </tr>
         </thead>
         {children}
      </table>
   );
};

export default TableHeader;
