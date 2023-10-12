import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../Configs/libs";
import { TableCol, TableHeader, TableRow } from "../../Components";
import format from "date-fns/format";
import { BsTrashFill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";

const Product = () => {
   const { data: products } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
         const res = await fetch(`${baseURL}/product?page=1&limit=10`);
         const data = await res.json();
         return data.data.products;
      },
   });
   return (
      <main>
         <h2 className="text-xl font-medium my-5 md:text-2xl capitalize text-starts ml-9 text-secondary ">
            Our Products
         </h2>
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
                     styles={
                        index % 2 === 1
                           ? "bg-secondary bg-opacity-75  font-medium"
                           : "bg-primary text-secondary font-medium"
                     }
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
                     <TableCol styles="">{product.dealerPrice}</TableCol>
                     <TableCol styles="">{product.discount}%</TableCol>
                     <TableCol styles="">{product.quantity}</TableCol>
                     <TableCol styles="">{product.unit}</TableCol>
                     <TableCol styles="">{product.status}</TableCol>
                     <TableCol styles="min-w-[60px]">
                        {format(new Date(product.createdAt), "dd MMM yyyy")}
                     </TableCol>
                     <TableCol styles="min-w-[60px] md:min-w-auto">
                        {format(new Date(product.updatedAt), "dd MMM yyyy")}
                     </TableCol>
                     <div className="flex items-center h-full justify-center ">
                        <BsTrashFill
                           size={16}
                           className="text-red-500 block"
                        ></BsTrashFill>
                        <TiEdit className={index %2 ===1  ? "text-red-500" : "text-red-500  "} size={18}></TiEdit>
                     </div>
                  </TableRow>
               ))}
            </TableHeader>
         </div>
      </main>
   );
};

export default Product;
