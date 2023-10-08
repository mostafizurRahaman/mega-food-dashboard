import ImportBtn from "../../Components/Buttons/ImportBtn";
import { CgSoftwareUpload } from "react-icons/cg";
import InputText from "../../Components/Inputs/InputText";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../Configs/libs";
import InputSelectionObj from "../../Components/InputSelection/InputSelectionObj";
import InputSelection from "../../Components/InputSelection/InputSelection";
import { AiOutlinePlus } from "react-icons/ai";
import InputTextBox from "../../Components/Inputs/InputTextBox";
import SelectionGroup from "../../Components/InputSelection/SelectionGroup";
import MultipleSelection from "../../Components/InputSelection/MultipleSelection";
import SubmitButton from "../../Components/Buttons/SubmitButton";
const StudentInformation = () => {
   const [studentInfo, setStudentInfo] = useState({
      addmissionNo: "",
      roll: "",
      class: "",
      section: "",
      classId: "",
      sectionId: "",
      firstName: "",
      lastName: "",
      gender: "",
      birthday: "",
      studentCategory: "",
      religion: "",
      caste: "",
      mobileNumber: "",
      email: "",
      addmissionDate: "",
      bloodGroup: "",
      height: "",
      weight: "",
      measurementDate: "",
   });

   const [errors, setErrors] = useState({
      addmissionNo: "",
      roll: "",
      class: "",
      section: "",
      classId: "",
      sectionId: "",
      firstName: "",
      lastName: "",
      gender: "",
      birthday: "",
      studentCategory: "",
      religion: "",
      caste: "",
      mobileNumber: "",
      email: "",
      addmissionDate: "",
      bloodGroup: "",
      height: "",
      weight: "",
      measurementDate: "",
   });
   //  check only data:
   const handleInputText = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim().toLowerCase();
      if (value.length <= 0) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({ ...errors, [name]: `Please provide  ${name}` });
      } else {
         setStudentInfo({ ...studentInfo, [name]: value });
         setErrors({ ...errors, [name]: "" });
      }
   };
   //  Check Number type value:
   const handleNumberFields = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim();
      if (isNaN(parseInt(value)) || !/^\d+$/.test(value)) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({ ...errors, [name]: `Please provide a valid ${name}` });
      } else if (value.length <= 0) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({ ...errors, [name]: `Please provide a valid ${name}` });
      } else {
         setStudentInfo({ ...studentInfo, [name]: value });
         setErrors({ ...errors, [name]: `` });
      }
   };

   //  check Date :
   const handleDate = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
         setStudentInfo({
            ...studentInfo,
            [name]: "",
         });
         setErrors({ ...errors, [name]: `Please provide a valid date` });
      } else {
         setStudentInfo({
            ...studentInfo,
            [name]: new Date(value).toISOString(),
         });
         setErrors({ ...errors, [name]: "" });
      }
   };

   // check Mobile Number:
   const handleMobileNumber = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim();
      if (!value.length) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({ ...errors, [name]: "Mobile number shouldn't be empty" });
      } else if (!/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value)) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({
            ...errors,
            [name]: `Please provide a valid mobile number`,
         });
      } else {
         setStudentInfo({ ...studentInfo, [name]: value });
         setErrors({
            ...errors,
            [name]: "",
         });
      }
   };
   // check Email Address:
   const handleEmailAddress = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim().toLowerCase();
      if (!value.length) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({ ...errors, name: `${value} shouldn't be empty` });
      } else if (
         !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({
            ...errors,
            [name]: `Please provide a valid email address`,
         });
      } else {
         setStudentInfo({ ...studentInfo, [name]: value });
         setErrors({ ...errors, [name]: "" });
      }
   };

   //  check Height & weight:
   const handleFloatNumber = (e) => {
      const name = e.target.name;
      const value = e.target.value.trim();
      if (!value.length) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({ ...errors, [name]: ` ${name} shouldn't be empty` });
      } else if (!/^\d+(\.\d+)?$/.test(value)) {
         setStudentInfo({ ...studentInfo, [name]: "" });
         setErrors({ ...errors, [name]: `Please provide a valid ${name}` });
      } else {
         setStudentInfo({ ...studentInfo, [name]: value });
         setErrors({ ...errors, [name]: `` });
      }
   };

   const { isLoading, data: classes } = useQuery({
      queryKey: ["classes"],
      queryFn: async () => {
         let res = await fetch(
            `${baseURL}/tableCategory/65068ae3fd6fbaa0372dd63f`
         );
         res = await res.json();
         console.log(res);
         return res;
      },
   });

   const { isLoading: isLoading1, data: sections } = useQuery({
      queryKey: ["sections"],
      queryFn: async () => {
         let res = await fetch(
            `${baseURL}/tableCategory/65068ad4fd6fbaa0372dd63e`
         );
         res = await res.json();
         console.log(res);
         return res;
      },
   });

   if (isLoading || isLoading1) {
      return <h1>Loading</h1>;
   }
   console.log(studentInfo, errors);
   return (
      <form className="m-5 border border-gray-600 pb-5  my-10  ">
         <div className="flex items-center justify-between border-b-2 p-2  border-b-gray-500">
            <h2 className="uppercase text-sm  ">Student Admission</h2>
            <ImportBtn
               text="import Student"
               icon={<CgSoftwareUpload className="text-base" />}
            ></ImportBtn>
         </div>
         <div className="px-3 my-3 grid grid-cols-1  lg:grid-cols-4 gap-2">
            <InputText
               type="text"
               label="Addmission no:"
               name="addmissionNo"
               error={errors.addmissionNo}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="text"
               label="Roll Number"
               name="roll"
               error={errors.roll}
               onChange={handleNumberFields}
            ></InputText>
            <InputSelectionObj
               label="Select Class Name"
               data={studentInfo}
               setData={setStudentInfo}
               options={classes}
               selectedName="class"
               selectedId="classId"
               selectOp="Select Class"
            ></InputSelectionObj>
            <InputSelectionObj
               label="Select Section Name"
               data={studentInfo}
               setData={setStudentInfo}
               options={sections}
               selectedName="section"
               selectedId="sectionId"
               selectOp="Select Section"
            ></InputSelectionObj>
            <InputText
               type="text"
               label="First Name:"
               name="firstName"
               error={errors.firstName}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="text"
               label="last Name"
               name="lastName"
               error={errors.lastName}
               onChange={handleInputText}
            ></InputText>
            <InputSelection
               label="gender"
               data={studentInfo}
               setData={setStudentInfo}
               options={["male", "female"]}
               field="gender"
               selectOp="Select Gender"
            ></InputSelection>
            <InputText
               type="date"
               label="Date of Birth"
               setData={setStudentInfo}
               error={errors.birthday}
               name="birthday"
               onChange={handleDate}
               styles="py-[5px]"
            ></InputText>
            <div className="lg:col-span-2 flex items-start flex-col md:flex-row gap-2">
               <InputSelection
                  label="category"
                  data={studentInfo}
                  setData={setStudentInfo}
                  options={[
                     "General",
                     "OBC",
                     "Special",
                     "Physically Challenged",
                  ]}
                  field="studentCategory"
                  selectOp="Select Student category"
               ></InputSelection>
               <InputText
                  type="text"
                  label="Religion"
                  name="religion"
                  error={errors.religion}
                  onChange={handleInputText}
               ></InputText>
               <InputText
                  type="text"
                  label="caste"
                  name="caste"
                  error={errors.caste}
                  onChange={handleInputText}
               ></InputText>
            </div>
            <InputText
               type="text"
               label="Mobile Number"
               name="mobileNumber"
               error={errors.mobileNumber}
               onChange={handleMobileNumber}
            ></InputText>
            <InputText
               type="text"
               label="Email"
               name="email"
               error={errors.email}
               onChange={handleEmailAddress}
            ></InputText>
            <InputText
               type="date"
               label="Addmission Date"
               setData={studentInfo}
               error={errors.addmissionDate}
               name="addmissionDate"
               onChange={handleDate}
               styles="py-[5px]"
            ></InputText>
            <InputText
               type="file"
               label="Student image"
               setData={studentInfo}
               error={errors.studentImage}
               name="studentImage"
               onChange={handleInputText}
               styles="py-[4px] text-sm"
            ></InputText>
            <InputSelection
               label="blood group"
               data={studentInfo}
               setData={setStudentInfo}
               options={["A+", "B+", "O+", "AB+", "AB-", "O-", "B-", "A-"]}
               field="bloodGroup"
               selectOp="Select"
            ></InputSelection>
            <InputSelection
               label="House"
               data={studentInfo}
               setData={setStudentInfo}
               options={["house1", "house2", "house3"]}
               field="houseNo"
               selectOp="Select"
            ></InputSelection>
            <InputText
               type="text"
               label="Height"
               setData={studentInfo}
               error={errors.height}
               name="height"
               onChange={handleFloatNumber}
            ></InputText>
            <InputText
               type="text"
               label="weight"
               setData={studentInfo}
               error={errors.weight}
               name="weight"
               onChange={handleFloatNumber}
            ></InputText>
            <InputText
               type="date"
               label="measurement Date"
               error={errors.measurementDate}
               name="measurementDate"
               onChange={handleDate}
               styles="py-[5px]"
            ></InputText>

            <ImportBtn
               className="bg-transparent gap-2  mt-5 ml-[-100px] text-blue-500 rounded-lg text-lg   "
               icon={<AiOutlinePlus className="text-xl"></AiOutlinePlus>}
               text="Add sibllings"
            ></ImportBtn>
            <div className="lg:col-span-4">
               <InputTextBox
                  label="Medical History"
                  name="medical_history"
                  rows={3}
                  cols={10}
                  placeholder=""
                  error={errors.medical_history}
                  onChange={handleInputText}
               ></InputTextBox>
               <InputTextBox
                  label="Does your child have any specific behavior which indicates she/he is upset (sucking thumb,hiding in *"
                  name="specific_behavior"
                  rows={3}
                  cols={10}
                  placeholder=""
                  error={errors.specific_behavior}
                  onChange={handleInputText}
               ></InputTextBox>
            </div>
         </div>
         <h2 className="lg:col-span-4 text-black bg-gray-200 py-2">
            Transport details
         </h2>
         <div className="grid-cols-1 grid lg:grid-cols-3 gap-3 px-5">
            <SelectionGroup></SelectionGroup>
            <InputSelectionObj
               label="Pickup Points"
               data={studentInfo}
               setData={setStudentInfo}
               options={[
                  {
                     _id: 1,
                     name: "aftab nagar",
                  },
                  {
                     _id: 2,
                     name: "Bonosreee",
                  },
                  {
                     _id: 3,
                     name: "Mohakhali",
                  },
               ]}
               selectedName=""
               selectedId="sectionId"
               selectOp="Select Section"
            ></InputSelectionObj>
            <MultipleSelection></MultipleSelection>
         </div>
         <h2 className="lg:col-span-4 mt-5 text-black bg-gray-200 py-2">
            Hostel Details
         </h2>
         <div className="px-5 grid lg:grid-cols-2 gap-3 md:grid-cols-1 ">
            <InputSelectionObj
               label="Select Hostel Name"
               data={studentInfo}
               setData={setStudentInfo}
               options={[
                  {
                     _id: 1,
                     name: "aftab nagar",
                  },
                  {
                     _id: 2,
                     name: "Bonosreee",
                  },
                  {
                     _id: 3,
                     name: "Mohakhali",
                  },
               ]}
               selectedName="hostelName"
               selectedId="hostelId"
               selectOp="Select Hotel Name"
            ></InputSelectionObj>
            <InputSelectionObj
               label="select room"
               data={studentInfo}
               setData={setStudentInfo}
               options={[
                  {
                     _id: 1,
                     name: "aftab nagar",
                  },
                  {
                     _id: 2,
                     name: "Bonosreee",
                  },
                  {
                     _id: 3,
                     name: "Mohakhali",
                  },
               ]}
               selectedName="roomNo"
               selectedId="roomId"
               selectOp="Select Room"
            ></InputSelectionObj>
         </div>
         <h2 className="lg:col-span-4 text-black bg-gray-200 py-2 mt-5">
            Parent Guardian Detail
         </h2>
         <div className="grid grid-cols-1  lg:grid-cols-4 gap-3 my-2 px-5">
            <InputText
               type="text"
               label="father name"
               name="fatherName"
               error={errors.fatherName}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="text"
               label="father Phone"
               name="fatherPhone"
               error={errors.fatherPhone}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="text"
               label="father occupation"
               name="fatherOccupation"
               error={errors.fatherOccupation}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="file"
               label="father image"
               setData={studentInfo}
               error={errors.fatherImage}
               name="fatherImage"
               onChange={handleInputText}
               styles="py-[4px] text-sm"
            ></InputText>
         </div>
         <div className="grid grid-cols-1  lg:grid-cols-4 gap-3 my-2 px-5">
            <InputText
               type="text"
               label="mother name"
               name="motherName"
               error={errors.motherName}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="text"
               label="mother Phone"
               name="motherPhone"
               error={errors.motherPhone}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="text"
               label="mother occupation"
               name="motherOccupation"
               error={errors.motherOccupation}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="file"
               label="mother image"
               setData={studentInfo}
               error={errors.motherImage}
               name="motherImage"
               onChange={handleInputText}
               styles="py-[4px] text-sm"
            ></InputText>
            <div className="flex items-center gap-3 lg:col-span-4">
               <h5>If Guardian is: </h5>
               <div className="flex items-center gap-2 flex-row-reverse">
                  <label htmlFor="father">father</label>
                  <input type="checkbox" id="father" name="father" />
               </div>
               <div className="flex items-center gap-2 flex-row-reverse">
                  <label htmlFor="mother">mother</label>
                  <input type="checkbox" id="mother" />
               </div>
               <div className="flex items-center gap-2 flex-row-reverse">
                  <label htmlFor="others">others</label>
                  <input type="checkbox" id="others" />
               </div>
            </div>
         </div>
         <div className="grid grid-cols-1  lg:grid-cols-4 gap-3 my-2 px-5">
            <InputText
               type="text"
               label="guardian name"
               name="guardianName"
               error={errors.guardianName}
               onChange={handleInputText}
            ></InputText>

            <InputText
               type="relation"
               label="guardian relation"
               name="guardianRelation"
               error={errors.guardianRelation}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="email"
               label="guardian email"
               name="guardianEmail"
               error={errors.guardianEmail}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="file"
               label="guardian image"
               setData={studentInfo}
               error={errors.guardianImage}
               name="guardianImage"
               onChange={handleInputText}
               styles="py-[4px] text-sm"
            ></InputText>
            <InputText
               type="text"
               label="guardian Phone"
               name="guardianPhone"
               error={errors.guardianPhone}
               onChange={handleInputText}
            ></InputText>
            <InputText
               type="text"
               label="guardian occupation"
               name="guardianOccupation"
               error={errors.guardianOccupation}
               onChange={handleInputText}
            ></InputText>
            <div className="lg:col-span-2">
               <InputText
                  type="text"
                  label="guardian Address"
                  name="guardianAddress"
                  error={errors.guardianAddress}
                  onChange={handleInputText}
               ></InputText>
            </div>
         </div>
         <SubmitButton className="bg-blue-400 text-white my-5 py-1">
            Save
         </SubmitButton>
      </form>
   );
};

export default StudentInformation;
