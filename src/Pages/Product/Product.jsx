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

const Product = () => {
   const { user } = useContext(AuthContext);
   const [showModal1, setShowModal1] = useState(false);
   const [product, setProduct] = useState({
      name: "",
      description: "",
      categoryId: "",
      categoryName: "",
      subCategoryName: "",
      subCategoryId: "",
      quantity: "",
      status: "",
      unit: "",
      price: "",
      dealerPrice: "",
      discount: "",
      thumbnail: "",
      images: "",
   });
   const [errors, setErrors] = useState({
      name: "",
      description: "",
      categoryId: "",
      categoryName: "",
      subCategoryName: "",
      subCategoryId: "",
      quantity: "",
      status: "",
      unit: "",
      price: "",
      dealerPrice: "",
      discount: "",
      thumbnail: "",
      images: "",
   });
   const { data: products, refetch } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/product?page=1&limit=10`);
         const data = await res.json();
         return data.data.products;
      },
   });
   const handleInputText = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim().toLowerCase();
      if (!value) {
         setProduct({ ...product, [name]: "" });
         setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
      } else {
         setProduct({ ...product, [name]: value });
         setErrors({ ...errors, [name]: "" });
      }
   };

   const handleNumber = (e) => {
      const name = e.target.name;
      const value = parseFloat(e.target.value);
      if (!e.target.value) {
         setErrors({ ...errors, [name]: `Please provide ${name}` });
         setProduct({ ...product, [name]: "" });
      } else if (!/^[+]?\d*\.?\d+$/.test(value)) {
         setErrors({ ...errors, [name]: `please provide a positive number` });
         setProduct({ ...product, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: `` });
         setProduct({ ...product, [name]: value });
      }
   };

   const handleDiscount = (e) => {
      const name = e.target.name;
      const value = parseFloat(e.target.value);
      if (!e.target.value) {
         setErrors({ ...errors, [name]: `Please provide ${name}` });
         setProduct({ ...product, [name]: "" });
      } else if (!/^(100|\d{1,2}(\.\d+)?)$/.test(value)) {
         setErrors({ ...errors, [name]: `discount should be 0 to 100` });
         setProduct({ ...product, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: `` });
         setProduct({ ...product, [name]: value });
      }
   };

   const handleImageUpload = async (e) => {
      const name = e.target.name;
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      if (!image) {
         setErrors({ ...errors, [name]: "Please select an image" });
         setProduct({ ...product, [name]: "" });
         return;
      }
      try {
         const res = await fetch(`${baseURL}/image`, {
            method: "POST",
            body: formData,
         });

         const data = await res.json();

         if (data.status === "success") {
            setProduct({ ...product, [name]: data.data.imageUrl });
            toast.success("Category Logo Uploaded");
            setErrors({ ...errors, [name]: "" });
         } else {
            setProduct({ ...product, [name]: "" });
            setErrors({ ...errors, [name]: data.message });
         }
      } catch (err) {
         setErrors({ ...errors, [name]: err.message });
      }
   };

   const { data: categories = [] } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/category`);
         const data = await res.json();
         return data.data.categories;
      },
   });

   const { data: subCategories = [] } = useQuery({
      queryKey: ["subCategories", product.categoryId],
      queryFn: async () => {
         const res = await fetch(
            `${baseURL}/sub-category?category.id=${product?.categoryId}`
         );
         const data = await res.json();
         console.log(data.data.subCategories);
         return data.data.subCategories;
      },
   });

   const handleUploadMultipleImage = async (e) => {
      const name = e.target.name;
      const images = e.target.files;
      const formData = new FormData();

      for (let image of images) {
         formData.append("images", image);
      }

      if (!(images.length > 0)) {
         setErrors({ ...errors, [name]: "Please select an image" });
         setProduct({ ...product, [name]: "" });
         return;
      }

      try {
         const res = await fetch(`${baseURL}/image/multiple`, {
            method: "POST",
            body: formData,
         });

         const data = await res.json();
         console.log(data);

         if (data.status === "success") {
            setProduct({ ...product, [name]: data.data });
            toast.success("Category Logo Uploaded");
            setErrors({ ...errors, [name]: "" });
         } else {
            setProduct({ ...product, [name]: "" });
            setErrors({ ...errors, [name]: data.message });
         }
      } catch (err) {
         setErrors({ ...errors, [name]: err.message });
      }
   };

   const handleProduct = async (e) => {
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
      } = product;
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
                  "name",
                  "category",
                  "sub category",
                  "price",
                  "dealer price",
                  "discount",
                  "quantity",
                  "unit",
                  "status",
                  "createdAt",
                  "updatedAt",
                  "Action",
               ]}
            >
               {products?.map((product, index) => (
                  <TableRow
                     // styles={
                     //    index % 2 === 1
                     //       ? "bg-secondary bg-opacity-75  font-medium"
                     //       : "bg-primary text-secondary font-medium"
                     // }
                     key={index}
                  >
                     <TableCol>{index + 1}</TableCol>
                     <TableCol styles="min-w-[100px]">{product.name}</TableCol>
                     <TableCol styles="min-w-[100px]">
                        {product.category?.name}
                     </TableCol>
                     <TableCol styles="min-w-[120px]">
                        {product.subCategory?.name}
                     </TableCol>
                     <TableCol styles="w-[40px]">{product.price}</TableCol>
                     <TableCol styles="min-w-[80px]">
                        {product.dealerPrice}
                     </TableCol>
                     <TableCol styles="">{product.discount}%</TableCol>
                     <TableCol styles="">{product.quantity}</TableCol>
                     <TableCol styles="">{product.unit}</TableCol>
                     <TableCol styles="">{product.status}</TableCol>
                     <TableCol styles="min-w-[80px]">
                        {format(new Date(product.createdAt), "dd MMM yyyy")}
                     </TableCol>
                     <TableCol styles="min-w-[80px] md:min-w-auto">
                        {format(new Date(product.updatedAt), "dd MMM yyyy")}
                     </TableCol>
                     <TableCol>
                        <div className="flex items-end h-full justify-center ">
                           <BsTrashFill
                              onClick={() => handleDelete(product._id)}
                              size={18}
                              className="text-red-500 block"
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
                  onSubmit={handleProduct}
                  className="flex gap-3  flex-col items-start justify-center md:justify-between bg-secondary p-7 rounded-md "
               >
                  <div className="gap-3 grid grid-cols-1 md:grid-cols-3 w-full">
                     <h1 className="text-xl font-bold uppercase  md:col-span-3">
                        Create Subcategory
                     </h1>
                     <InputText
                        type="text"
                        name="name"
                        placeholder="product name"
                        label="product name"
                        error={errors.name}
                        onChange={handleInputText}
                     />
                     <InputSelectionObj
                        label="select Category"
                        data={product}
                        setData={setProduct}
                        selectedId="categoryId"
                        selectedName="categoryName"
                        options={categories}
                        selectOp="select category"
                     />
                     <InputSelectionObj
                        label="select sub category"
                        data={product}
                        setData={setProduct}
                        selectedId="subCategoryId"
                        selectedName="subCategoryName"
                        options={subCategories}
                        selectOp="select sub category"
                     />
                     <InputSelection
                        label="unit"
                        data={product}
                        setData={setProduct}
                        field="unit"
                        options={["kg", "ltr", "gm", "ml", "each", "pcs"]}
                        selectOp="select unit"
                     />
                     <InputSelection
                        label="status"
                        data={product}
                        setData={setProduct}
                        field="status"
                        options={["in-stock", "out-of-stock"]}
                        selectOp="select status"
                     />
                     <InputText
                        type="number"
                        name="quantity"
                        placeholder="product quantity"
                        label="product quantity"
                        error={errors.quantity}
                        onChange={handleNumber}
                     />
                     <InputText
                        type="number"
                        name="price"
                        placeholder="product price"
                        label="product price"
                        error={errors.price}
                        onChange={handleNumber}
                     />
                     <InputText
                        type="number"
                        name="dealerPrice"
                        placeholder="dealer price "
                        label="dealer price"
                        error={errors.dealerPrice}
                        onChange={handleNumber}
                     />
                     <InputText
                        type="number"
                        name="discount"
                        placeholder="product discount"
                        label="product discount"
                        error={errors.discount}
                        onChange={handleDiscount}
                     />
                     <div className="md:col-span-3 flex md:flex-row flex-col items-center gap-5 w-full">
                        <div className=" w-full  md:w-1/2">
                           <div className="w-full flex flex-col gap-1 ">
                              <label
                                 htmlFor="thumbnail"
                                 className=" font-semibold text-sm capitalize"
                              >
                                 Upload Thumbnail
                              </label>
                              <ImageUpload
                                 id="thumbnail"
                                 image={product.thumbnail}
                                 error={errors.thumbnail}
                                 onChange={handleImageUpload}
                                 isMultiple={false}
                              />
                           </div>
                        </div>
                        <div className=" w-full  md:w-1/2">
                           <div className="w-full flex flex-col gap-1 ">
                              <label
                                 htmlFor="images"
                                 className=" font-semibold text-sm capitalize"
                              >
                                 Upload Images
                              </label>
                              <ImageUpload
                                 id="images"
                                 isMultiple={true}
                                 image={product.images}
                                 error={errors.images}
                                 onChange={handleUploadMultipleImage}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="md:col-span-3">
                        <InputTextBox
                           label="product description"
                           rows={7}
                           cols={10}
                           name="description"
                           placeholder="write product description"
                           onChange={handleInputText}
                           error={errors.description}
                           styles="w-full"
                        ></InputTextBox>
                     </div>
                  </div>

                  <SubmitButton
                     text="create"
                     className="text-secondary w-[150px] mx-auto my-3 tracking-widest py-[6px] text-lg capitalize"
                     disabled={
                        !product?.name ||
                        !product?.description ||
                        !product?.categoryId ||
                        !product?.categoryName ||
                        !product?.subCategoryId ||
                        !product?.subCategoryName ||
                        !product?.quantity ||
                        !product?.unit ||
                        !product?.status ||
                        !product?.images?.length ||
                        !product.thumbnail ||
                        !product?.dealerPrice ||
                        !product?.discount ||
                        !product?.price
                     }
                  />
               </form>
            </CommonModal>
         )}
      </main>
   );
};

export default Product;
