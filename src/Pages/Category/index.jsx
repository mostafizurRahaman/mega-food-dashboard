import { useState } from "react";
import { InputBox, InputText, SubmitButton } from "../../Components";

const Category = () => {
   const [category, setCategory] = useState({
      name: "",
      path: "",
   });
   const [errors, setErrors] = useState({
      name: "",
      path: "",
   });
   const handleInputText = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim().toLowerCase();
      if (!value) {
         setCategory({ ...category, [name]: "" });
         setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      } else {
         setCategory({ ...category, [name]: value });
         setErrors({ ...errors, [name]: "" });
      }
   };
   return (
      <div>
         <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold uppercase">Create Category</h1>
         </div>
         <form className="flex gap-3  flex-col md:flex-row items-start justify-start md:justify-between">
            <InputText
               type="text"
               name="name"
               placeholder="category name"
               label="category name"
               error={errors.name}
               onChange={handleInputText}
            />
            <InputText
               type="text"
               name="path"
               placeholder="category path"
               label="category pathname"
               error={errors.path}
               onChange={handleInputText}
            />
            <SubmitButton
               text="create"
               className=""
               disabled={!category?.name || !category?.path}
            />
         </form>
       
      </div>
   );
};

export default Category;
