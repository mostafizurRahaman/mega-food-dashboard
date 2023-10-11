import { ErrorMessage, InputText, SubmitButton } from "../../Components";
import { useContext, useState } from "react";
import { baseURL } from "../../Configs/libs";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
   const { user, setUser } = useContext(AuthContext);
   const [loginData, setLoginData] = useState({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState({
      email: "",
      password: "",
      general: "",
   });
   const location = useLocation();

   const from = location?.state?.from.pathname || "/dashboard";

   const navigate = useNavigate();

   if (user?.email && user?.status === "active" && user?.role === "admin") {
      return navigate(from, { replace: true });
   }

   const handleEmail = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim();
      if (!value.length) {
         setErrors({ ...errors, [name]: "email shouldn't be empty" });
         setLoginData({ ...loginData, [name]: "" });
      } else if (
         !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
         setErrors({ ...errors, [name]: "Please provide a email" });
         setLoginData({ ...loginData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: "" });
         setLoginData({ ...loginData, [name]: value });
      }
   };

   const handlePassword = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      if (value.length <= 0) {
         setErrors({ ...errors, [name]: "password shouldn'b be empty  " });
         setLoginData({ ...loginData, [name]: "" });
      } else if (!/[A-Z]/.test(value)) {
         setErrors({ ...errors, [name]: "must have a  capital letter " });
         setLoginData({ ...loginData, [name]: "" });
      } else if (!/[a-z]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a small letter " });
         setLoginData({ ...loginData, [name]: "" });
      } else if (!/[0-9]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a digit" });
         setLoginData({ ...loginData, [name]: "" });
      } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a special character" });
         setLoginData({ ...loginData, [name]: "" });
      } else if (value.length <= 8) {
         setErrors({
            ...errors,
            [name]: "password must be 8 character or more",
         });
         setLoginData({ ...loginData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: "" });
         setLoginData({ ...loginData, [name]: value });
      }
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      console.log(loginData);
      setErrors({ ...errors, general: "" });
      const form = e.target;
      try {
         if (loginData?.email && loginData?.password) {
            const res = await fetch(`${baseURL}/user/login`, {
               method: "POST",
               headers: {
                  "content-type": "application/json",
               },
               body: JSON.stringify(loginData),
            });
            const data = await res.json();
            console.log(data);
            if (data?.status === "success") {
               console.log(data.data);
               localStorage.setItem("accessToken", data.data.accessToken);
               setUser(data.data);
               toast.success("User login successfully");
               form.reset();
            } else {
               setErrors({ ...errors, general: data.message });
            }
         }
      } catch (err) {
         console.log(err);
         setErrors({ ...errors, general: err.message });
      }
   };
   return (
      <div className="flex min-h-screen  flex-col gap-5 items-center justify-center">
         <form
            onSubmit={handleLogin}
            className="w-[400px] px-7  rounded-lg py-10 bg-secondary gap-3 flex flex-col items-center 
             shadow-[5px_3px_3px_3px_#ddd] hover:shadow-[-5px_-3px_3px_3px_#ddd] duration-500 transition-all "
         >
            <h2 className="text-xl font-medium text-black capitalize text-center">
               login in
            </h2>
            <InputText
               type="email"
               placeholder="enter your email"
               name="email"
               styles="text-lg"
               error={errors.email}
               onChange={handleEmail}
            />
            <InputText
               type="password"
               placeholder="enter your password"
               name="password"
               error={errors.password}
               styles="text-lg"
               onChange={handlePassword}
               
            />

            <SubmitButton
               text="login"
               disabled={!loginData.email || !loginData.password}
               className=" bg-primary  text-black inline-block  w-[100px]  "
            />
            {errors.general && <ErrorMessage message={errors.general} />}
         </form>
      </div>
   );
};

export default Login;
