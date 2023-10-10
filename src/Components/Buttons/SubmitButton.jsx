/* eslint-disable react/prop-types */
const SubmitButton = ({ text, className, disabled }) => {
   return (
      <button
         className={` px-3 rounded-full text-base py-1 bg-primary  ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
         } ${className}`}
         disabled={disabled}
      >
         {text}
      </button>
   );
};

export default SubmitButton;
