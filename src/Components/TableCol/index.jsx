/* eslint-disable react/prop-types */
const TableCol = ({ children, styles }) => {
   return (
      <td
         className={`${styles}  border-r border-l border-r-white border-l-white px-1 py-1 md:py-[10px] text-[11px]`}
      >
         {children}
      </td>
   );
};

export default TableCol;
