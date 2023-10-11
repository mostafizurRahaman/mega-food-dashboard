import { useContext, useState } from "react";
import { ImageUpload, InputText, SubmitButton } from "../../Components";
import { baseURL } from "../../Configs/libs";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const Category = () => {
   const [category, setCategory] = useState({
      name: "",
      path: "",
      logo: "",
   });
   const [errors, setErrors] = useState({
      name: "",
      path: "",
      logo: "",
      general: "",
   });
   const { user } = useContext(AuthContext);

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

   const handleImageUpload = async (e) => {
      // const name = e.target.name;
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      if (!image) {
         setErrors({ ...errors, logo: "Please select an image" });
         setCategory({ ...category, logo: "" });
         return;
      }
      try {
         const res = await fetch(`${baseURL}/image`, {
            method: "POST",
            body: formData,
         });

         const data = await res.json();
         console.log(data);
         if (data.status === "success") {
            setCategory({ ...category, logo: data.data.imageUrl });
            setErrors({ ...errors, logo: "" });
         } else {
            setCategory({ ...category, logo: "" });
            setErrors({ ...errors, logo: data.message });
         }
      } catch (err) {
         setErrors({ ...errors, logo: err.message });
      }
   };

   const handleCategory = async (e) => {
      e.preventDefault();
      setErrors({ ...errors, general: "" });
      try {
         const newData = {
            ...category,
            createdBy: {
               name: user.firstName + " " + user?.lastName,
               id: user?._id,
            },
         };
         const res = await fetch(`${baseURL}/category`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(newData),
         });
         const data = await res.json();
         console.log(data);
      } catch (err) {
         setErrors({ ...errors, general: err.message });
      }
   };
   console.log(category);
   return (
      <div>
         <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold uppercase">Create Category</h1>
         </div>
         <form
            onSubmit={handleCategory}
            className="flex gap-3  flex-col items-start justify-start md:justify-between"
         >
            <div className="flex  flex-col gap-3  md:w-1/2 w-full">
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
            </div>
            <div className="w-1/2">
               <ImageUpload
                  id="logo"
                  image={category.logo}
                  error={errors.logo}
                  onChange={handleImageUpload}
               />
            </div>
            <SubmitButton
               text="create"
               className="text-secondary"
               disabled={!category?.name || !category?.path || !category?.logo}
            />
         </form>
      </div>
   );
};

export default Category;
