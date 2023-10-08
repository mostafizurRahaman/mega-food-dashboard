/* eslint-disable react/prop-types */
const ImportBtn = ({ text, icon, className }) => {
   return (
      <div className="flex justify-center   text-white">
         <button
            className={` px-3 capitalize py-1  bg-red-600 gap-1  rounded-lg text-sm flex items-center justify-between  ${className}`}
         >
            <span>{icon}</span>
            <p>{text}</p>
         </button>
      </div>
   );
};

export default ImportBtn;
