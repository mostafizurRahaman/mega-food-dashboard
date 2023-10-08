import { createBrowserRouter } from "react-router-dom";
import Login from "../../Pages/Login";
import Dashboard from "../../Pages/Dashboard";
import AddTable from "../../Pages/AddTable";
import AddCategory from "../../Pages/AddCategory";
import DashboardLayout from "../../Layouts/DashboardLayout";
import StudentInformation from "../../Pages/StudentInformation/";

export const routes = createBrowserRouter([
   {
      path: "/",
      element: <DashboardLayout />,
      children: [
         {
            path: "/dashboard",
            element: <Dashboard />,
         },
         {
            path: "/dashboard/addtable",
            element: <AddTable></AddTable>,
         },
         {
            path: "/dashboard/addcategory",
            element: <AddCategory></AddCategory>,
         },
         {
            path: "/dashboard/student-admission",
            element: <StudentInformation></StudentInformation>,
         },
      ],
   },
   {
      path: "/login",
      element: <Login></Login>,
   },
]);
