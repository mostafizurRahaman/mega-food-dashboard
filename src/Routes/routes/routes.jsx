import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Dashboard from "../../Pages/Dashboard";
import Login from "../../Pages/Login";
import Category from "../../Pages/Category";
import SubCategory from "../../Pages/SubCategory";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
         {
            path: "/",
            element: <Login></Login>,
         },
         {
            path: "/dashboard",
            element: (
               <PrivateRoute>
                  <DashboardLayout></DashboardLayout>
               </PrivateRoute>
            ),
            children: [
               {
                  path: "/dashboard",
                  element: <Dashboard />,
               },
               {
                  path: "/dashboard/create-category",
                  element: <Category />,
               },
               {
                  path: "/dashboard/create-subcategory",
                  element: <SubCategory />,
               },
            ],
         },
      ],
   },
]);
