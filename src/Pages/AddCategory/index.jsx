import { useState } from "react";

import SubmitButton from "../../Components/Buttons/SubmitButton";
import TableHeader from "../../Components/TableHeader";
import TableRow from "../../Components/TableRow";
import InputText from "../../Components/Inputs/InputText";
import TableCol from "../../Components/TableCol";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiShow } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../Configs/libs";
import toast from "react-hot-toast";
import InputSelectionObj from "../../Components/InputSelection/InputSelectionObj";

const AddCategory = () => {
   // const [tables, setTables] = useState([]);
   // const [tables ,setTables] = useState([]);

   const [items, setItems] = useState({
      tableId: "",
      tableName: "",
      name: "",
      description: "",
      businessId: parseInt(Math.random() * 1000000 + 1),
      code: parseInt(Math.random() * 1000000 + 1),
      latitude: "",
      logitude: "",
      createdBy: "",
      createdTime:
         new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
      updatedTime:
         new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
      status: true,
   });
   const [error, setError] = useState({
      categoryName: "",
   });

   const { isLoading, data: tables } = useQuery({
      queryKey: ["tables"],
      queryFn: () =>
         fetch(`${baseURL}/table`)
            .then((res) => res.json())
            .then((data) => data.data),
   });
   const {
      isLoading: isLoading1,
      data: categories,
      refetch,
   } = useQuery({
      queryKey: ["categories", items.tableId],
      queryFn: () =>
         fetch(`${baseURL}/table/${items.tableId}`)
            .then((res) => res.json())
            .then((data) => data.data.categories),
   });

   console.log(categories, "categories");

   const handleInpuText = (e) => {
      const value = e.target.value.toLowerCase().trim();
      const name = e.target.name;

      if (value.length <= 0) {
         setError({ ...error, [name]: `${name} shouldn't be empty` });
         setItems({ ...items, [name]: "" });
      } else {
         setError({ ...error, [name]: "" });
         setItems({ ...items, [name]: value });
      }
   };

   const handleForm = async (e) => {
      console.log("hanldeForm");
      e.preventDefault();

      if (!items?.name || !items.tableName) {
         return;
      }
      const newCategory = {
         name: items.name,
         table: {
            name: items.tableName,
            id: items.tableId,
         },
         description: items?.description && items?.description,
         createdBy: "Mostafiz",
         updatedBy: "Mostafiz",
         status: "active",
      };
      try {
         const res = await fetch(`${baseURL}/category`, {
            method: "post",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify(newCategory),
         });

         const data = await res.json();
         console.log(data);
         if (data.status === "success") {
            toast.success("Category is included");
            setItems({
               ...items,
               name: "",
               description: "",
            });
            refetch();
         }
      } catch (err) {
         console.log(err);
      }

      e.target.reset();
   };

   //  delete Category Items:
   const handleDelete = async (id) => {
      try {
         const res = await fetch(`${baseURL}/category/${id}`, {
            method: "delete",
            headers: {
               "content-type": "application/json",
            },
         });
         const data = await res.json();
         if (data?.data?.deletedCount) {
            toast.success(data?.message);
            refetch();
         }
      } catch (err) {
         toast.error(err.status);
      }
   };
   if (isLoading) {
      
      return <h1>Loading........</h1>;
   }

   return (
      <div>
         <h1 className="text-center justify-center text-red-500 text-xl font-medium border-b  ">
            Add Category
         </h1>
         <form
            onSubmit={handleForm}
            className="px-5 flex md:items-start items-center  flex-col  md:flex-row  justify-center gap-3 mx-auto w-full "
         >
            <InputSelectionObj
               label="Select table Name"
               data={items}
               setData={setItems}
               options={tables}
               selectedName="tableName"
               selectedId="tableId"
               selectOp="Select Table Name"
            ></InputSelectionObj>
            <InputText
               type="text"
               label="Category Name"
               name="name"
               placeholder="Your Category name"
               error={error.name}
               onChange={handleInpuText}
            ></InputText>
            {items?.tableName !== "section" && (
               <InputText
                  type="text"
                  label="Descrition"
                  name="description"
                  placeholder="Description "
                  error={error.description}
                  onChange={handleInpuText}
               ></InputText>
            )}
            {items?.tableName === "section" ? (
               <SubmitButton
                  disabled={!items.name || !items.tableName}
                  className="bg-blue-500 mt-5 text-sm text-white font-semibold"
               >
                  Add
               </SubmitButton>
            ) : (
               <SubmitButton
                  disabled={
                     !items.name || !items.tableName || !items.description
                  }
                  className="bg-blue-500 mt-5 text-sm text-white font-semibold"
               >
                  Add
               </SubmitButton>
            )}
         </form>
         <div className="my-10 mx-auto px-5  w-[95%] md:w-full overflow-hidden overflow-x-auto">
            <TableHeader
               fields={[
                  "ID",
                  "Business ID",
                  "Name",
                  "description",
                  "latitude",
                  "logitude",
                  "code",
                  "created by",
                  "status",
                  "current time",
                  "update time",
                  "Action",
               ]}
            >
               {categories?.map((i, idx) => (
                  <TableRow key={i._id}>
                     <TableCol>{idx + 1}</TableCol>
                     <TableCol>{i._id.slice(0, 5)}</TableCol>
                     <TableCol>{i.name}</TableCol>
                     <TableCol>{i.description}</TableCol>
                     <TableCol> -</TableCol>
                     <TableCol> -</TableCol>
                     <TableCol>{i._id.slice(3, 9)}</TableCol>
                     <TableCol>{i.createdBy}</TableCol>
                     <TableCol>{i.status}</TableCol>
                     <TableCol>{i.createdAt}</TableCol>
                     <TableCol>{i.updatedAt}</TableCol>
                     <TableCol>
                        {
                           <span className=" flex iems-center flex-row-reverse justify-center  text-base">
                              <RiDeleteBin5Line
                                 onClick={() => handleDelete(i._id)}
                              ></RiDeleteBin5Line>
                              <BiShow></BiShow>
                           </span>
                        }
                     </TableCol>
                  </TableRow>
               ))}
            </TableHeader>
         </div>
      </div>
   );
};

export default AddCategory;
