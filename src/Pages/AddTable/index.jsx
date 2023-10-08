import { useState } from "react";

import SubmitButton from "../../Components/Buttons/SubmitButton";
import TableHeader from "../../Components/TableHeader";
import TableRow from "../../Components/TableRow";
import InputText from "../../Components/Inputs/InputText";
import { AiFillDelete } from "react-icons/ai";
import TableCol from "../../Components/TableCol";
import { baseURL } from "../../Configs/libs";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const AddTable = () => {
   // const [tableData, setTableData] = useState([]);
   const [error, setError] = useState("");
   const [table, setTable] = useState({ name: "" });

   const {
      isLoading,
      data: tableData = [],
      refetch,
   } = useQuery({
      queryKey: ["tableData"],
      queryFn: () =>
         fetch(`${baseURL}/table`)
            .then((res) => res.json())
            .then(data =>data.data),
   });

   const createTable = async (e) => {
      e.preventDefault();
      if (!table.name) {
         return;
      }
      try {
         console.log(`${baseURL}/table`);
         const res = await fetch(`${baseURL}/table`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify({ name: table.name }),
         });
         const data = await res.json();
         console.log(data);
         if (data.status === "success") {
            toast.success(`${table.name}`);
            setTable({ name: "" });
            refetch();
         }
      } catch {
         console.log(`data not fetchd successfully`);
      }
   };

   const handleTable = (e) => {
      const value = e.target.value;
      if (value.length <= 0) {
         setError("Table name is not emtpy");
         setTable({ name: "" });
      } else {
         setError("");
         setTable({ name: value });
      }
   };

   const handleDelete = async (id) => {
      console.log(id);
      try {
         if (id) {
            const res = await fetch(`${baseURL}/table/${id}`, {
               method: "delete",
               headers: {
                  "content-type": "application/json",
               },
            });
            const data = await res.json();
            console.log(data);
            if (data?.data?.deletedCount> 0) {
               toast.success("Table deleted");
               refetch();
            }
         }
      } catch (err) {
         console.log(err);
      }
   };

   if (isLoading) {
      return <h1 className="text-red-500">Loading........</h1>;
   }

   return (
      <div>
         <h1 className="text-center justify-center text-red-500 text-xl font-medium border-b  ">
            Add New Table
         </h1>
         <form
            onSubmit={createTable}
            className="px-5 flex  items-center mt-5 justify-center gap-3 mx-auto w-full md:w-3/5 lg:w-2/5"
         >
            <InputText
               type="text"
               name="tableName"
               placeholder="Your table name"
               error={error}
               onChange={handleTable}
               initialValue={table.name}
            ></InputText>

            <SubmitButton
               disabled={!table.name}
               className="bg-blue-500 text-sm text-white font-semibold"
            >
               Add
            </SubmitButton>
         </form>
         <div className="my-10 md:px-5">
         <TableHeader fields={["S.I", "name", "action"]}>
               {tableData?.map((i, idx) => (
                  <TableRow key={idx} idx={idx} data={i}>
                     <TableCol>{idx + 1}</TableCol>
                     <TableCol>{i.name}</TableCol>
                     <TableCol styles=" border border-black py-1 w-20 ">
                        <AiFillDelete
                           onClick={() => handleDelete(i._id)}
                           className="text-xl font-bold inline-block hover:text-red-500"
                        ></AiFillDelete>
                     </TableCol>
                  </TableRow>
               ))}
            </TableHeader>
         </div>
      </div>
   );
};

export default AddTable;
