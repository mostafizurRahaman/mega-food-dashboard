import toast from "react-hot-toast";
import {
   ImageUpload,
   InputSelectionObj,
   InputText,
   SubmitButton,
} from "../../Components";
import { baseURL } from "../../Configs/libs";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { FiFacebook } from "react-icons/fi";

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

   const {
      data: categories = [],
      isLoading: isCategoryLoading,
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
         setErrors({ ...errors, [name]: `enter a valid pathname` });
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

   const handleCategory = async (e) => {
      e.preventDefault();
      setErrors({ ...errors, general: "" });
      try {
         const newData = {
            ...subCategory,
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

   console.log(subCategory);
   return (
      <div>
         <div className="flex items-center justify-center"></div>
         <form
            onSubmit={handleCategory}
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
         {/* <div>
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
         </div> */}
      </div>
   );
};

export default SubCategory;
