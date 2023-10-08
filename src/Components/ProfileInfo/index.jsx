const ProfileInfo = () => {
   return (
      <div className="flex items-center p-2 mt-1 space-x-4 justify-self-end">
         <img
            src="https://lh3.googleusercontent.com/p/AF1QipNJL1s4lEWeDrtrRFGGNf0Ce3qxAVQTQeRwzgc4=s1360-w1360-h1020"
            alt=""
            className="w-12 h-12 rounded-lg dark:bg-gray-500"
         />
         <div>
            <h2 className="text-lg font-semibold text-white">Rahaman</h2>
            <span className="flex items-center space-x-1">
               <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
               >
                  View profile
               </a>
            </span>
         </div>
      </div>
   );
};

export default ProfileInfo;
