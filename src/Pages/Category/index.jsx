import { useContext, useState } from "react";
import format from "date-fns/format";
import {
   ActionButton,
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
import { BsTrashFill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
const Category = () => {
   const [category, setCategory] = useState({
      name: "",
      path: "",
      logo: "",
      banner: "",
   });
   const [errors, setErrors] = useState({
      name: "",
      path: "",
      logo: "",
      banner: "",
      general: "",
   });
   const { user } = useContext(AuthContext);

   const {
      data: categories = [],
      // isLoading: isCategoryLoading,
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

   const handlePathName = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim().toLowerCase();
      if (!value.length) {
         setCategory({ ...category, [name]: "" });
         setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      } else if (!value.startsWith("/")) {
         setCategory({ ...category, [name]: "" });
         setErrors({ ...errors, [name]: `${name} must starts with /` });
      } else if (!/^\/(?:[\w.-]+\/)*[\w.-]+$/.test(value)) {
         setCategory({ ...category, [name]: "" });
         setErrors({
            ...errors,
            [name]: `enter a valid pathname use ( _ or -)`,
         });
      } else {
         setCategory({ ...category, [name]: value });
         setErrors({ ...errors, [name]: "" });
      }
   };

   const handleImageUpload = async (e) => {
      const name = e.target.name;
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      if (!image) {
         setErrors({ ...errors, [name]: "Please select an image" });
         setCategory({ ...category, [name]: "" });
         return;
      }
      try {
         const res = await fetch(`${baseURL}/image`, {
            method: "POST",
            body: formData,
         });

         const data = await res.json();

         if (data.status === "success") {
            setCategory({ ...category, [name]: data.data.imageUrl });
            toast.success("Category Logo Uploaded");
            setErrors({ ...errors, [name]: "" });
         } else {
            setCategory({ ...category, [name]: "" });
            setErrors({ ...errors, [name]: data.message });
         }
      } catch (err) {
         setErrors({ ...errors, [name]: err.message });
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
            setCategory({});
            e.target.reset();
         } else {
            toast.error(data.message);
         }
      } catch (err) {
         setErrors({ ...errors, general: err.message });
      }
   };

   console.log(category);
   // const handleDelete = (_id) => {};

   // const handleUpdate = (_id) => {};

   return (
      <div>
         <div className="flex items-center justify-between">
            <h1 className="text-xl text-secondary   text-start font-semibold uppercase mb-5">
               Product Category
            </h1>
            <ActionButton
               text="create new"
               containerStyles=" text-sm hover:text-secondary text-black bg-secondary rounded-3xl hover tracking-widest py-2 capitalize font-semibold hover:bg-primary "
            ></ActionButton>
         </div>
         <div>
            <TableHeader
               fields={[
                  "S.I",
                  "name",
                  "path",
                  "logo",
                  "banner",
                  "createdBy",
                  "updatedBy",
                  "createdAt",
                  "updatedAt",
                  "Action",
               ]}
               containerStyles="bg-secondary table "
            >
               {categories?.map((item, idx) => (
                  <TableRow key={idx + 1}>
                     <TableCol>{idx}</TableCol>
                     <TableCol>{item?.name}</TableCol>
                     <TableCol styles="lowercase">{item.path}</TableCol>
                     <TableCol styles="">
                        <img
                           src={item.logo}
                           className="w-1/4 mx-auto"
                           alt={item.name}
                        />
                     </TableCol>
                     <TableCol styles="">
                        <img
                           src={item?.banner}
                           className="w-20 h-5 mx-auto"
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
                     <TableCol>
                        <div className="flex items-center justify-center ">
                           <BsTrashFill
                              size={16}
                              className="text-red-500 "
                           ></BsTrashFill>
                           <TiEdit className="text-primary" size={18}></TiEdit>
                        </div>
                     </TableCol>
                  </TableRow>
               ))}
            </TableHeader>
         </div>
         <form
            onSubmit={handleCategory}
            className="flex gap-3  flex-col items-start justify-center md:justify-between bg-secondary p-7 rounded-md mt-5"
         >
            <div className=" grid grid-cols-2 gap-3  w-full">
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
                  onChange={handlePathName}
               />

               <div className="w-full flex flex-col gap-1 ">
                  <label
                     htmlFor="banner"
                     className=" font-semibold text-sm capitalize"
                  >
                     Upload logo
                  </label>
                  <ImageUpload
                     id="logo"
                     image={category.logo}
                     error={errors.logo}
                     onChange={handleImageUpload}
                  />
               </div>
               <div className="w-full flex flex-col gap-1 ">
                  <label
                     htmlFor="banner"
                     className=" font-semibold text-sm capitalize"
                  >
                     Upload Banner
                  </label>
                  <ImageUpload
                     id="banner"
                     image={category.banner}
                     error={errors.banner}
                     onChange={handleImageUpload}
                  />
               </div>
            </div>

            <SubmitButton
               text="create"
               className="text-secondary w-[150px] my-5 mx-auto py-1 text-lg capitalize"
               disabled={
                  !category?.name ||
                  !category?.path ||
                  !category?.logo ||
                  !category?.banner
               }
            />
         </form>
      </div>
   );
};

export default Category;
