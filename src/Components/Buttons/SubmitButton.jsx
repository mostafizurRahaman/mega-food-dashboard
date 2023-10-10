/* eslint-disable react/prop-types */
const SubmitButton = ({ text, className, disabled }) => {
   return (
      <button
         className={`px-5 rounded-full md:w-auto w-full text-base py-2 bg-primary md:mt-5 text-secondary block ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
         } ${className}`}
         disabled={disabled}
      >
         {text}
      </button>
   );
};

export default SubmitButton;
