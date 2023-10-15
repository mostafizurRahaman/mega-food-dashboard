/* eslint-disable react/prop-types */
import { FiUpload } from "react-icons/fi";
import styles from "./ImageUpload.module.css";

const ImageUpload = ({
   id,
   onChange,
   image,
   error,
   imageStyles,
   isMultiple,
}) => {
   return (
      <div className="w-full">
         <div className="flex items-center md:flex-row flex-col  gap-3">
            <div className="w-full md:w-1/2">
               <label
                  htmlFor={id}
                  className={`px-5 relative  h-28 md:h-44  border-dashed border-2 border-black flex justify-center items-center flex-col gap-1  rounded-xl `}
               >
                  <FiUpload className="text-5xl text-black order-2  "></FiUpload>
                  <p className="text-base   text-black order-3 ">Choose File</p>
                  <input
                     id={id}
                     name={id}
                     className={`text-xl absolute top-0 left-0  order-1 text-center m-auto invisible text-white ${styles}`}
                     onChange={onChange}
                     type="file"
                     accept="image/*"
                     multiple={isMultiple}
                  />
               </label>
            </div>
            <div className="px-5py-2 border-dashed border-2 border-black flex justify-center items-center h-28 md:h-44 flex-col gap-1 text-base  text-accent  rounded-xl w-full md:w-1/2 ">
               {image ? (
                  Array.isArray(image) ? (
                     <p className="flex items-center flex-col gap-1">
                        {" "}
                        <span className="text-4xl text-red-500">
                           {image.length}
                        </span>{" "}
                        images uploaded
                     </p>
                  ) : (
                     <img
                        src={image}
                        alt=""
                        className={`${imageStyles} object-contain p-3`}
                     />
                  )
               ) : (
                  <p>Preview </p>
               )}
               
            </div>
         </div>
         {error && (
            <p className="text-secondary text-xl ps-5 capitalize">
               {error && error}
            </p>
         )}
      </div>
   );
};

export default ImageUpload;
