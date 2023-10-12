import toast from "react-hot-toast";
import {
   ImageUpload,
   InputSelectionObj,
   InputText,
   SubmitButton,
   TableCol,
   TableHeader,
   TableRow,
} from "../../Components";
import { baseURL } from "../../Configs/libs";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { BsTrashFill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { format } from "date-fns";

const SubCategory = () => {
   const [subCategory, setSubCategory] = useState({
      name: "",
      path: "",
      banner: "",
      categoryName: "",
      categoryId: "",
   });
   const [errors, setErrors] = useState({
      name: "",
      path: "",
      banner: "",
      categoryName: "",
      categoryId: "",
      general: "",
   });
   const { user } = useContext(AuthContext);

   const { data: categories = [] } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/category`);
         const data = await res.json();
         console.log(data.data.categories);
         return data.data.categories;
      },
   });

   const {
      data: subCategories = [],
      // isLoading,
      refetch,
   } = useQuery({
      queryKey: ["subCategories"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/sub-category`);
         const data = await res.json();
         console.log(data.data.subCategories);
         return data.data.subCategories;
      },
   });

   const handleInputText = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim().toLowerCase();
      if (!value) {
         setSubCategory({ ...subCategory, [name]: "" });
         setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      } else {
         setSubCategory({ ...subCategory, [name]: value });
         setErrors({ ...errors, [name]: "" });
      }
   };

   const handlePathName = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim().toLowerCase();
      if (!value.length) {
         setSubCategory({ ...subCategory, [name]: "" });
         setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      } else if (!value.startsWith("/")) {
         setSubCategory({ ...subCategory, [name]: "" });
         setErrors({ ...errors, [name]: `${name} must starts with /` });
      } else if (!/^\/(?:[\w.-]+\/)*[\w.-]+$/.test(value)) {
         setSubCategory({ ...subCategory, [name]: "" });
         setErrors({ ...errors, [name]: `replace space with ( _ or -)` });
      } else {
         setSubCategory({ ...subCategory, [name]: value });
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
         setSubCategory({ ...subCategory, [name]: "" });
         return;
      }
      try {
         const res = await fetch(`${baseURL}/image`, {
            method: "POST",
            body: formData,
         });

         const data = await res.json();

         if (data.status === "success") {
            setSubCategory({ ...subCategory, [name]: data.data.imageUrl });
            toast.success("Category [name] Uploaded");
            setErrors({ ...errors, [name]: "" });
         } else {
            setSubCategory({ ...subCategory, [name]: "" });
            setErrors({ ...errors, [name]: data.message });
         }
      } catch (err) {
         setErrors({ ...errors, [name]: err.message });
      }
   };

   const handleSubCategory = async (e) => {
      e.preventDefault();
      setErrors({ ...errors, general: "" });
      try {
         const newData = {
            name: subCategory.name,
            path: subCategory.path,
            banner: subCategory.banner,
            category: {
               name: subCategory.categoryName,
               id: subCategory.categoryId,
            },
            createdBy: {
               name: user.firstName + " " + user?.lastName,
               id: user?._id,
            },
         };
         const res = await fetch(`${baseURL}/sub-category`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(newData),
         });
         const data = await res.json();
         if (data.status === "success") {
            toast.success(data.message);
            refetch();
            e.target.reset();
            setSubCategory({});
         } else {
            toast.error(data.message);
         }
      } catch (err) {
         setErrors({ ...errors, general: err.message });
      }
   };

   console.log(subCategory);
   return (
      <div>
         <div className="flex items-center justify-center"></div>
         <form
            onSubmit={handleSubCategory}
            className="flex gap-3  flex-col items-start justify-center md:justify-between"
         >
            <div className="gap-3 grid grid-cols-1 md:grid-cols-3 w-full">
               <h1 className="text-xl font-bold uppercase  md:col-span-3">
                  Create Subcategory
               </h1>
               <InputText
                  type="text"
                  name="name"
                  placeholder="sub category name"
                  label="Sub category name"
                  error={errors.name}
                  onChange={handleInputText}
               />
               <InputText
                  type="text"
                  name="path"
                  placeholder="sub category path"
                  label=" sub category pathname"
                  error={errors.path}
                  onChange={handlePathName}
               />
               <InputSelectionObj
                  label="select Category"
                  data={subCategory}
                  setData={setSubCategory}
                  selectedId="categoryId"
                  selectedName="categoryName"
                  options={categories}
                  selectOp="select category"
               />
            </div>
            <div className="w-full flex flex-col gap-1 col-span-3">
               <label
                  htmlFor="banner"
                  className=" font-semibold text-sm capitalize"
               >
                  Upload Banner
               </label>
               <ImageUpload
                  id="banner"
                  image={subCategory.banner}
                  error={errors.banner}
                  onChange={handleImageUpload}
               />
            </div>
            <SubmitButton
               text="create"
               className="text-secondary w-[150px] mx-auto my-3 tracking-widest py-[6px] text-lg capitalize"
               disabled={
                  !subCategory?.name ||
                  !subCategory?.path ||
                  !subCategory?.banner ||
                  !subCategory?.categoryId ||
                  !subCategory?.categoryName
               }
            />
         </form>
         <div>
            <TableHeader
               fields={[
                  "S.I",
                  "name",
                  "path",
                  "banner",
                  "category",
                  "createdBy",
                  "updatedBy",
                  "createdAt",
                  "updatedAt",
                  "Action",
               ]}
               containerStyles="my-10"
            >
               {subCategories?.map((item, idx) => (
                  <TableRow key={idx + 1}>
                     <TableCol>{idx}</TableCol>
                     <TableCol>{item?.name}</TableCol>
                     <TableCol styles="lowercase">{item.path}</TableCol>
                     <TableCol styles="">
                        <img
                           src={item.banner}
                           className="w-20 mx-auto"
                           alt={item.name}
                        />
                     </TableCol>
                     <TableCol>{item?.category?.name}</TableCol>
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
      </div>
   );
};

export default SubCategory;
