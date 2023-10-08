import LinkNav from "../LinkNav";
import SummeryDetails from "../SummeryDetails/SummeryDetails";
import ProfileInfo from "../ProfileInfo";
import { FiSettings } from "react-icons/fi";

const Siderbar = () => {
   return (
      <div className=" w-full pb-3  ">
         <ProfileInfo></ProfileInfo>
         <div className="px-2 mt-5 capitalize ">
            <SummeryDetails
               groupName="Settings"
               className="h-0"
               icon={<FiSettings></FiSettings>}
            >
               <LinkNav
                  path="/dashboard/category"
                  title="Add Category"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/sub-category"
                  title="Add Sub Category"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/add-products"
                  title="Add products"
               ></LinkNav>
            </SummeryDetails>
         </div>
      </div>
   );
};

export default Siderbar;
