/* eslint-disable react/prop-types */
const ActionButton = ({ containerStyles, text, handleAction }) => {
   return (
      <button
         onClick={handleAction}
         className={`px-5 py-1 hover:scale-90 duration-300 rounded-lg ${containerStyles} `}
      >
         {text}
      </button>
   );
};

export default ActionButton;
