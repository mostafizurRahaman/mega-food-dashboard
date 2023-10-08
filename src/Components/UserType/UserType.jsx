// eslint-disable-next-line react/prop-types
const UserType = ({ text, icon, type, setUser, user }) => {
   console.log(text, type);
   return (
      <div
         onClick={() => setUser({ ...user, userType: text })}
         className={`flex  items-center justify-center flex-col w-[90px] h-[90px] rounded-full ${
            type === text ? "bg-blue-500 text-white" : "text-gray-600"
         }  tduration-1000 transition-all border border-gray-500`}
      >
         <span className="text-3xl block ">{icon}</span>
         <p className="text-base capitalize">{text}</p>
      </div>
   );
};

export default UserType;
