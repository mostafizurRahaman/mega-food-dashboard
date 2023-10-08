import { Link } from "react-router-dom";
import logo from "../../assets/eskooly.png";
import { GoQuestion } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import { FaUsersGear, FaUserTie } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import UserType from "../../Components/UserType/UserType";
import { useState } from "react";

import InputBox from "../../Components/Inputs/InputBox";
import SubmitButton from "../../Components/Buttons/SubmitButton";
const Login = () => {
   const [FormData, setFormData] = useState({
      username: "",
      email: "",
      userType: "admin",
   });
   const [errors, setErrors] = useState({
      username: "",
      email: "",
      general: "",
   });
   const handleEvent = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      return { name, value };
   };
   const handleUserName = (e) => {
      const { name, value } = handleEvent(e);
      if (value.length <= 0) {
         setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
         setFormData({ ...FormData, [name]: "" });
      } else if (!/^(?!.*[_.]{2,})[a-zA-Z0-9._-]+$/.test(value)) {
         setErrors({ ...errors, [name]: `enter a valid ${name}` });
         setFormData({ ...FormData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: "" });
         setFormData({ ...FormData, [name]: value });
      }
   };

   const handlePassword = (e) => {
      const { name, value } = handleEvent(e);
      if (value.length <= 0) {
         setErrors({ ...errors, [name]: "password shouldn'b be empty  " });
         setFormData({ ...FormData, [name]: "" });
      } else if (!/[A-Z]/.test(value)) {
         setErrors({ ...errors, [name]: "must have a  capital letter " });
         setFormData({ ...FormData, [name]: "" });
      } else if (!/[a-z]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a small letter " });
         setFormData({ ...FormData, [name]: "" });
      } else if (!/[0-9]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a digit" });
         setFormData({ ...FormData, [name]: "" });
      } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a special character" });
         setFormData({ ...FormData, [name]: "" });
      } else if (value.length <= 8) {
         setErrors({
            ...errors,
            [name]: "password must be 8 character or more",
         });
         setFormData({ ...FormData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: "" });
         setFormData({ ...FormData, [name]: value });
      }
   };
   console.log(FormData);

   return (
      <main className="flex items-center jsutify-center">
         <div className="w-1/2 flex h-screen items-center justify-center">
            <div className="w-[350px] rounded-lg  py-5  flex flex-col gap-3 items-center justify-center">
               <img
                  src={logo}
                  className="w-[150px] h-auto "
                  alt="school_management_system_logo"
               />
               <Link
                  href="/register"
                  className="flex items-center justify-center text-lg font-bold gap-1 "
               >
                  <GoQuestion></GoQuestion>I do not have an account
               </Link>
               <p className="text-lg text-gray-500 font-bold">I am</p>
               <div className="flex  text-gray-500 items-center justify-center gap-4">
                  <UserType
                     text="admin"
                     icon={<BiUser></BiUser>}
                     type={FormData.userType}
                     setUser={setFormData}
                     user={FormData}
                  ></UserType>
                  <UserType
                     text="employee"
                     icon={<FaUsersGear></FaUsersGear>}
                     type={FormData.userType}
                     setUser={setFormData}
                     user={FormData}
                  ></UserType>
                  <UserType
                     text="students"
                     icon={<PiStudentFill></PiStudentFill>}
                     type={FormData.userType}
                     setUser={setFormData}
                     user={FormData}
                  ></UserType>
               </div>
               <div className="   w-full px-2 flex flex-col gap-5 mt-5">
                  <InputBox
                     type="text"
                     name="username"
                     placeholder="Enter your user name"
                     onChange={handleUserName}
                     error={errors.username}
                     icon={<FaUserTie></FaUserTie>}
                  ></InputBox>
                  <InputBox
                     type="password"
                     name="password"
                     placeholder="Enter your password"
                     onChange={handlePassword}
                     error={errors.password}
                     icon={<RiLockPasswordFill></RiLockPasswordFill>}
                  ></InputBox>
                  <SubmitButton
                     className="text-white bg-blue-500"
                     disabled={!FormData?.username || !FormData?.password}
                  >
                     Login{" "}
                  </SubmitButton>
               </div>
            </div>
         </div>
         <div className="w-1/2 h-screen bg-blue-400"></div>
      </main>
   );
};

export default Login;
