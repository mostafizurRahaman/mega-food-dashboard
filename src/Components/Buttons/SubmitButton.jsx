/* eslint-disable react/prop-types */
const SubmitButton = ({children, className, disabled}) => {
   return (
      <div className="flex justify-center ">
         <button className={` px-7 capitalize inline-block py-2 rounded-full ${className} ${disabled  ? 'bg-red-500': ""}`} disabled={disabled}>{children}</button>
      </div>
   );
};

export default SubmitButton;
