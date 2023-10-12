import { useContext, useState } from "react";
import format from "date-fns/format";
import {
   ImageUpload,
   InputText,
   SubmitButton,
   TableCol,
   TableHeader,
   TableRow,
} from "../../Components";
import { baseURL } from "../../Configs/libs";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

   const {
      data: categories = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/category`);
         const data = await res.json();
         console.log(data.data.categories);
         return data.data.categories;
      },
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

         if (data.status === "success") {
            setCategory({ ...category, logo: data.data.imageUrl });
            toast.success("Category Logo Uploaded");
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
         if (data.status === "success") {
            toast.success("Category Logo Uploaded");
            refetch();
         } else {
            toast.error(data.message);
         }
      } catch (err) {
         setErrors({ ...errors, general: err.message });
      }
   };

   return (
      <div>
         <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold uppercase">Create Category</h1>
         </div>
         <form
            onSubmit={handleCategory}
            className="flex gap-3  flex-col items-start justify-center md:justify-between"
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
               className="text-secondary w-1/2 py-1 text-lg capitalize"
               disabled={!category?.name || !category?.path || !category?.logo}
            />
         </form>
         <div>
            <TableHeader
               fields={[
                  "S.I",
                  "name",
                  "path",
                  "logo",
                  "createdBy",
                  "updatedBy",
                  "createdAt",
                  "updatedAt",
                  "Action",
               ]}
               containerStyles="my-10"
            >
               {categories?.map((item, idx) => (
                  <TableRow key={idx + 1}>
                     <TableCol>{idx}</TableCol>
                     <TableCol>{item?.name}</TableCol>
                     <TableCol styles="lowercase">/{item.path}</TableCol>
                     <TableCol styles="">
                        <img
                           src={item.logo}
                           className="w-1/4 mx-auto"
                           alt={item.name}
                        />
                     </TableCol>
                     <TableCol>{item?.createdBy?.name}</TableCol>
                     <TableCol>{item?.updatedBy?.name}</TableCol>
                     <TableCol>
                        {format(new Date(item.createdAt), "dd MMM yyyy")}
                     </TableCol>
                     <TableCol>
                        {format(new Date(item?.updatedAt), "dd MMM yyyy")}
                     </TableCol>
                  </TableRow>
               ))}
            </TableHeader>
         </div>
      </div>
   );
};

export default Category;
