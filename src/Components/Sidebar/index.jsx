import LinkNav from "../LinkNav";

import { BiCategory } from "react-icons/bi";
const SideBar = () => {
   return (
      <div className=" w-full   ">
         <div className="px-2 my-5 mb-20 capitalize  ">
            <LinkNav
               title="Create  Category"
               path="create-category"
               icon={<BiCategory size={17} />}
               style="text-base "
            />
            <LinkNav
               title="create sub category"
               path="create-subcategory"
               icon={<BiCategory size={17} />}
               style="text-base"
            />
         </div>
      </div>
   );
};

export default SideBar;
