import { useQuery } from "@tanstack/react-query";
import { AccessToken, baseURL } from "../../Configs/libs";
import {
   ActionButton,
   CommonModal,
   ImageUpload,
   InputSelection,
   InputSelectionObj,
   InputText,
   InputTextBox,
   SubmitButton,
   TableCol,
   TableHeader,
   TableRow,
} from "../../Components";
import format from "date-fns/format";
import { BsTrashFill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const Banner = () => {
   const { user } = useContext(AuthContext);
   const [showModal1, setShowModal1] = useState(false);
   const [banner, setBanner] = useState({
      title: "",
      description: "",
      offerPath: "",
      ButtonText: "",
      imageURL: "",
   });
   const [errors, setErrors] = useState({
      title: "",
      description: "",
      offerPath: "",
      ButtonText: "",
      imageURL: "",
   });
   const { data: banners, refetch } = useQuery({
      queryKey: ["banners"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/banner?page=1&limit=10`);
         const data = await res.json();
         return data.data.banners;
      },
   });
   const handleInputText = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim().toLowerCase();
      if (!value) {
         setBanner({ ...banner, [name]: "" });
         setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      } else {
         setBanner({ ...banner, [name]: value });
         setErrors({ ...errors, [name]: "" });
      }
   };

   // const handleNumber = (e) => {
   //    const name = e.target.name;
   //    const value = parseFloat(e.target.value);
   //    if (!e.target.value) {
   //       setErrors({ ...errors, [name]: `Please provide ${name}` });
   //       setBanner({ ...banner, [name]: "" });
   //    } else if (!/^[+]?\d*\.?\d+$/.test(value)) {
   //       setErrors({ ...errors, [name]: `please provide a positive number` });
   //       setBanner({ ...banner, [name]: "" });
   //    } else {
   //       setErrors({ ...errors, [name]: `` });
   //       setBanner({ ...banner, [name]: value });
   //    }
   // };

   // const handleDiscount = (e) => {
   //    const name = e.target.name;
   //    const value = parseFloat(e.target.value);
   //    if (!e.target.value) {
   //       setErrors({ ...errors, [name]: `Please provide ${name}` });
   //       setBanner({ ...banner, [name]: "" });
   //    } else if (!/^(100|\d{1,2}(\.\d+)?)$/.test(value)) {
   //       setErrors({ ...errors, [name]: `discount should be 0 to 100` });
   //       setBanner({ ...banner, [name]: "" });
   //    } else {
   //       setErrors({ ...errors, [name]: `` });
   //       setBanner({ ...banner, [name]: value });
   //    }
   // };

   const handleImageUpload = async (e) => {
      const name = e.target.name;
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      if (!image) {
         setErrors({ ...errors, [name]: "Please select an image" });
         setBanner({ ...banner, [name]: "" });
         return;
      }
      try {
         const res = await fetch(`${baseURL}/image`, {
            method: "POST",
            body: formData,
         });

         const data = await res.json();

         if (data.status === "success") {
            setBanner({ ...banner, [name]: data.data.imageUrl });
            toast.success("Category Logo Uploaded");
            setErrors({ ...errors, [name]: "" });
         } else {
            setBanner({ ...banner, [name]: "" });
            setErrors({ ...errors, [name]: data.message });
         }
      } catch (err) {
         setErrors({ ...errors, [name]: err.message });
      }
   };

   const handleBanner = async (e) => {
      e.preventDefault();
      const {
         name,
         description,
         thumbnail,
         images,
         categoryName,
         categoryId,
         subCategoryName,
         subCategoryId,
         quantity,
         price,
         dealerPrice,
         discount,
         unit,
         status,
      } = banner;
      const newProduct = {
         name,
         description,
         thumbnail,
         images,
         category: {
            name: categoryName,
            id: categoryId,
         },
         subCategory: {
            name: subCategoryName,
            id: subCategoryId,
         },
         unit,
         status,
         quantity,
         price,
         dealerPrice,
         discount,
         postedBy: {
            name: user?.firstName + user?.lastName,
            id: user._id,
         },
      };

      console.log(newProduct);
      try {
         const res = await fetch(`${baseURL}/product`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(newProduct),
         });

         const data = await res.json();
         if (data?.status === "success") {
            console.log(data);
            toast.success(data.message);
            setShowModal1(false);
            refetch();
         }
      } catch (err) {
         toast.error(err.message);
      }
   };

   const handleDelete = async (_id) => {
      try {
         const res = await fetch(`${baseURL}/product/${_id}`, {
            method: "delete",
            headers: {
               "content-type": "application/json",
               authorization: `Bearer ${AccessToken}`,
            },
         });

         const data = await res.json();
         if (data.status === "success") {
            toast.success(data.message);
            refetch();
         } else {
            toast.error(data.message);
         }
      } catch (err) {
         toast.error(err.message);
      }
   };

   return (
      <main>
         <div className="flex items-center justify-between ">
            <h2 className="text-xl font-medium my-5 md:text-2xl capitalize text-starts ml-9 text-secondary ">
               Our Products
            </h2>
            <ActionButton
               text="create new"
               containerStyles=" text-sm hover:text-secondary text-black bg-secondary rounded-3xl hover tracking-widest py-2 capitalize font-semibold hover:bg-primary "
               handleAction={() => setShowModal1(true)}
            ></ActionButton>
         </div>
         <div className="w-full overflow-x-auto rounded-md px-5">
            <TableHeader
               containerStyles="bg-secondary "
               fields={[
                  "S.I",
                  "title",
                  "description",
                  "banner",
                  "offerPath",
                  "status",
                  "createdBy",
                  "Action",
               ]}
            >
               {banners?.map((banner, index) => (
                  <TableRow
                     // styles={
                     //    index % 2 === 1
                     //       ? "bg-secondary bg-opacity-75  font-medium"
                     //       : "bg-primary text-secondary font-medium"
                     // }
                     key={index}
                  >
                     <TableCol>{index + 1}</TableCol>
                     <TableCol styles="min-w-[75px] text-[10px]">
                        {banner.title}
                     </TableCol>
                     <TableCol styles="min-w-[200px] text-[10px]">
                        {banner?.description}
                     </TableCol>
                     <TableCol styles="w-[100px]">
                        <img
                           src={banner.imageURL}
                           alt={banner.title}
                           className="w-full h-5 object-fit"
                        />
                     </TableCol>
                     <TableCol styles="max-w-[200px]">
                        {banner.offerPath}
                     </TableCol>
                     <TableCol
                        styles={
                           banner.status === "active"
                              ? "text-primary text-[10px]"
                              : "text-red-500 text-[10px]"
                        }
                     >
                        {banner.status}
                     </TableCol>
                     <TableCol styles="min-w-[80px] text-[10px]">
                        {format(new Date(banner.createdAt), "dd MMM yyyy")}
                     </TableCol>
                     <TableCol styles="min-w-[80px] text-[10px]">
                        {format(new Date(banner.updatedAt), "dd MMM yyyy")}
                     </TableCol>
                     <TableCol>
                        <div className="flex items-end h-full justify-center text-[10px]">
                           <BsTrashFill
                              onClick={() => handleDelete(banner._id)}
                              size={18}
                              className="text-red-500 block "
                           ></BsTrashFill>
                           <TiEdit
                              size={20}
                              className={
                                 index % 2 === 1
                                    ? "text-red-500 block"
                                    : "text-red-500 block "
                              }
                           ></TiEdit>
                        </div>
                     </TableCol>
                  </TableRow>
               ))}
            </TableHeader>
         </div>

         {showModal1 && (
            <CommonModal
               setShow={setShowModal1}
               className="max:h-[80vh] overflow-y-auto"
            >
               <form
                  onSubmit={handleBanner}
                  className="flex gap-3  flex-col items-start justify-center md:justify-between bg-secondary p-7 rounded-md "
               >
                  <div className="gap-3 grid grid-cols-1 md:grid-cols-2 w-full">
                     <h1 className="text-xl font-bold uppercase  md:col-span-2">
                        Post Banner
                     </h1>
                     <InputText
                        type="text"
                        name="title"
                        placeholder="Banner title"
                        label="banner title"
                        error={errors.title}
                        onChange={handleInputText}
                     />

                     <InputSelection
                        label="status"
                        data={banner}
                        setData={setBanner}
                        field="status"
                        options={["active", "in-active"]}
                        selectOp="select status"
                     />

                     <div className="w-full flex flex-col gap-1 ">
                        <label
                           htmlFor="Banner Upload"
                           className=" font-semibold text-sm capitalize"
                        >
                           Upload Banner Upload
                        </label>
                        <ImageUpload
                           id="imageURL"
                           image={banner.imageURL}
                           error={errors.imageURL}
                           onChange={handleImageUpload}
                           isMultiple={false}
                        />
                     </div>

                     <InputTextBox
                        label="product description"
                        rows={8}
                        cols={10}
                        name="description"
                        placeholder="write product description"
                        onChange={handleInputText}
                        error={errors.description}
                        styles="w-full"
                     ></InputTextBox>
                  </div>

                  <SubmitButton
                     text="create"
                     className="text-secondary w-[150px] mx-auto my-3 tracking-widest py-[6px] text-lg capitalize"
                     disabled={
                        !banner?.title ||
                        !banner?.description ||
                        !banner?.imageURL ||
                        !banner?.status ||
                        !banner?.offerPath
                     }
                  />
               </form>
            </CommonModal>
         )}
      </main>
   );
};

export default Banner;
