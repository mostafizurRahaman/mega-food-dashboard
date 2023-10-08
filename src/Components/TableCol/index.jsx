/* eslint-disable react/prop-types */
const TableCol = ({ children, styles }) => {
   return <td className={`${styles} border border-gray-600 px-1 text-xs`}>{children}</td>;
};

export default TableCol;
