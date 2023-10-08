import {
   MdEmojiTransportation,
   MdOutlineHomeWork,
   MdOutlineVideoSettings,
   MdTopic,
} from "react-icons/md";
import LinkNav from "../LinkNav";
import SummeryDetails from "../SummeryDetails/SummeryDetails";
import ProfileInfo from "../ProfileInfo";
import { FiSettings } from "react-icons/fi";
import { SiGooglemeet, SiOnlyoffice } from "react-icons/si";
import { BiUserPlus } from "react-icons/bi";
import {
   FaChartLine,
   FaCodeBranch,
   FaDollarSign,
   FaDownload,
   FaEmpire,
   FaGears,
   FaMoneyBill1Wave,
   FaRegMap,
   FaRegObjectGroup,
   FaUniversalAccess,
   FaWifi,
} from "react-icons/fa6";
import { FaMapSigns } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { TbBrandZoom } from "react-icons/tb";
import { HiMiniDocumentText } from "react-icons/hi2";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { RiGraduationCapFill } from "react-icons/ri";
import { GiBookshelf, GiHumanPyramid } from "react-icons/gi";
import { TfiWrite } from "react-icons/tfi";
import { PiCertificateFill } from "react-icons/pi";
import { CgCalendarDates } from "react-icons/cg";
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
               <LinkNav path="/dashboard/addtable" title="Add table "></LinkNav>
               <LinkNav
                  path="/dashboard/addcategory"
                  title="Add Category"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               groupName="Front Office"
               icon={<SiOnlyoffice></SiOnlyoffice>}
            >
               <LinkNav
                  path="/dashboard/enquiry"
                  title="Admission Enquery"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/visitors"
                  title="Visitor Books"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/generalcall"
                  title="Phone call log"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/dispatch"
                  title="Postal dispatch"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/dispatch"
                  title="Postal recieve"
               ></LinkNav>
               <LinkNav path="/dashboard/complain" title="Complian"></LinkNav>
               <LinkNav
                  path="/dashboard/visitorspurpose"
                  title="Setup Front Office"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<BiUserPlus className="text-[17px]" />}
               groupName="Student Information"
            >
               <LinkNav
                  path="/dashboard/studentdetails"
                  title="Student details"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/student-admission"
                  title="Student Admission"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/online-admission"
                  title="online admission"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/disable-student"
                  title="Disable student"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/multiclass"
                  title="Multi Class Student"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/bulkdelete"
                  title="bulk delete"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/student-category"
                  title="Student Category"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/student-house"
                  title="Student House"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/disable-reason"
                  title="Disable Reason"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<FaMoneyBill1Wave />}
               groupName="Fees collection"
            >
               <LinkNav
                  path="/dashboard/studentfees"
                  title="collect Fees"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/offlinepayment"
                  title="Offline bank payment"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/studentfee/searchpayment"
                  title="Search Fees Payment"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/studentfee/feesearch"
                  title="Student Due Search"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/feemaster"
                  title="Fees Master"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/feegroup "
                  title="Fees Group"
               ></LinkNav>
               <LinkNav path="/dashboard/feetype " title="Fees Type"></LinkNav>
               <LinkNav
                  path="/dashboard/feesdiscount "
                  title="Fees Discount"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/feesforward "
                  title="Fees Forward"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/feesreminder "
                  title="Fees Reminder"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<MdOutlineVideoSettings />}
               groupName="Online Course"
            >
               <LinkNav
                  path="/dashboard/onlinecourses"
                  title="Online Course"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/onlinecourses/offlinepayment"
                  title="Offline Payment"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/onlinecourse/coursecategory"
                  title="course category"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/onlinecourse/report"
                  title="Online Course Report"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/onliecourse/settings"
                  title="Settings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/studentfees"
                  title="collect Fees"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaCodeBranch />} groupName="Multi Branch">
               <LinkNav
                  path="/dashboard/multibranch/overview"
                  title="Multi Branch"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/multibranch/report"
                  title="Report"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/multibranch/setting"
                  title="setting"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<SiGooglemeet />}
               groupName="Gmeet Live Classes"
            >
               <LinkNav
                  path="/dashboard/gmeet/timetable"
                  title="Live Classes"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/gmeet/meeting"
                  title="Live meeting"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/gmeet_report"
                  title="live class report"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/gmeet/settings"
                  title="settings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/gmeet/meeting_report"
                  title="Live meeting report"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<TbBrandZoom className="text-[17px]" />}
               groupName="Zoom Live Classes"
            >
               <LinkNav
                  path="/dashboard/zoom/timetable"
                  title="Live Classes"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/zoom/meeting"
                  title="Live meeting"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/zoom_report"
                  title="live class report"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/zoom/settings"
                  title="settings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/zoom/meeting_report"
                  title="Live meeting report"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaMapSigns />} groupName="Behaviour Records">
               <LinkNav
                  path="/behaviour/studentincidents"
                  title="Assign Incident"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/behaviour/incident"
                  title="Incident"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/behaviour/report"
                  title="reports"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/behaviour/settings"
                  title="settings"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaDollarSign />} groupName="Income">
               <LinkNav path="/dashboard/income" title="Add Income"></LinkNav>
               <LinkNav
                  path="/dashboard/income/search"
                  title="Search Income"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/income/incomehead"
                  title="income head"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<HiMiniDocumentText />}
               groupName="CBSEExamination"
            >
               <LinkNav path="/dashboard/cbse/exam" title="Exam"></LinkNav>
               <LinkNav
                  path="/dashboard/cbse/shedule"
                  title="Exam Shedule"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/cbse/result/marksheet"
                  title="Print Marksheet"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/cbse/grade"
                  title="Exam Grade"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/cbse/observation/assign"
                  title="Assign Observation"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/cbse/observation"
                  title="observation"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/cbse/assessment"
                  title="assessment"
               ></LinkNav>
               <LinkNav path="/dashboard/cbse/term" title="term"></LinkNav>
               <LinkNav
                  path="/dashboard/cbse/template"
                  title="template"
               ></LinkNav>
               <LinkNav path="/dashboard/cbse/report" title="report"></LinkNav>
               <LinkNav
                  path="/dashboard/cbse/settings"
                  title="settings"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<BsFillCreditCard2BackFill />}
               groupName="expense"
            >
               <LinkNav path="/dashboard/expense" title="Add expense"></LinkNav>
               <LinkNav
                  path="/dashboard/expense/search"
                  title="Search expense"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/expense/expensehead"
                  title="expense head"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaRegMap />} groupName="Examination">
               <LinkNav
                  path="/dashboard/exam_group"
                  title="Exam group"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam_shedule"
                  title="Exam Shedule"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam_result"
                  title="Exam Result"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admitcard/design"
                  title="Design Admit Card"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admitcard/print"
                  title="print Admit Card"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/marksheet/design"
                  title="Design Marksheet"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/marksheet/print"
                  title="print Marksheet"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/grade"
                  title="Marks Grade"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/marksdivision"
                  title="Marks Division"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/observation/assign"
                  title="Assign Observation"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/observation"
                  title="observation"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/assessment"
                  title="assessment"
               ></LinkNav>
               <LinkNav path="/dashboard/exam/term" title="term"></LinkNav>
               <LinkNav
                  path="/dashboard/exam/template"
                  title="template"
               ></LinkNav>
               <LinkNav path="/dashboard/exam/report" title="report"></LinkNav>
               <LinkNav
                  path="/dashboard/exam/settings"
                  title="settings"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<CgCalendarDates />} groupName="Attendence">
               <LinkNav
                  path="/dashboard/admin/studentattendence"
                  title="Student Attendence"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/approve_leave"
                  title="Approve Leave"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam_result"
                  title="Attendence by date"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admitcard/design"
                  title="Design Admit Card"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admitcard/print"
                  title="print Admit Card"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/marksheet/design"
                  title="Design Marksheet"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/marksheet/print"
                  title="print Marksheet"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/grade"
                  title="Marks Grade"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/marksdivision"
                  title="Marks Division"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/observation/assign"
                  title="Assign Observation"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/observation"
                  title="observation"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/exam/assessment"
                  title="assessment"
               ></LinkNav>
               <LinkNav path="/dashboard/exam/term" title="term"></LinkNav>
               <LinkNav
                  path="/dashboard/exam/template"
                  title="template"
               ></LinkNav>
               <LinkNav path="/dashboard/exam/report" title="report"></LinkNav>
               <LinkNav
                  path="/dashboard/exam/settings"
                  title="settings"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaWifi />} groupName="Online Examination">
               <LinkNav
                  path="/dashboard/onlineexam"
                  title="Online Exam"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/questionbanks"
                  title="Questions Banks"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<RiGraduationCapFill />}
               groupName="Accademics"
            >
               <LinkNav
                  path="/dashboard/timetable/classreports"
                  title="Class Timetable"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/timetable/teachertimeable"
                  title="Teacher Timetable"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/assign_class_teacher"
                  title="assign class teacher"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/promotestudent"
                  title="promote students"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/subgroup"
                  title="Subject group"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/subject"
                  title="Subject"
               ></LinkNav>
               <LinkNav path="/dashboard/admin/class" title="class"></LinkNav>
               <LinkNav
                  path="/dashboard/admin/section"
                  title="section"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<MdTopic />} groupName="Lesson Plan">
               <LinkNav
                  path="/dashboard/admin/lessonplan/copylesson"
                  title="Copy Old Lesson"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/syllabus"
                  title="Manage Lesson Plan"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/syllabus/status"
                  title="Manage Syllabus Status"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/lessonplan/lesson"
                  title="lesson"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/lessonplan/topics"
                  title="topics"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<GiHumanPyramid />}
               groupName="Human Resource"
            >
               <LinkNav
                  path="/dashboard/admin/staff"
                  title="Staff directory"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/staffattendence"
                  title="Staff Attendence"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/payroll"
                  title="payroll"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/leaverequest"
                  title="Approve Leave Request"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/staff/leaverequest"
                  title="Apply Leave"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/leavetypes"
                  title="Leave Types"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/staff/ratings"
                  title="Teacher Ratings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/department"
                  title="Department"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/designation"
                  title="designation"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/staff/disabledstafflist"
                  title="Disabled Staff"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<HiSpeakerphone />} groupName="Communicate">
               <LinkNav
                  path="/dashboard/admin/notification"
                  title="Notice Board"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/mailsms/send_email"
                  title="send Email"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/mailsms/compose_sms"
                  title="Send SMS"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/mailsms/email_sms_logs"
                  title="Email and sms logs"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/mailsms/shedule"
                  title=" Shedule Email and sms logs"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/bulkmail"
                  title="Login Credential Send"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/mailsms/email_template"
                  title="Email Template"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/mailsms/sms_template"
                  title="SMS Template"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaDownload />} groupName="Download center">
               <LinkNav
                  path="/dashboard/admin/contenttype "
                  title="Content Type"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/content/list"
                  title="Content Share list"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/content/upload"
                  title="upload / share content "
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/video_tutorails"
                  title="Video Tutorials "
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<TfiWrite />} groupName="Homeworks">
               <LinkNav
                  path="/dashboard/admin/homeworks "
                  title="Add Home works"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/homeworks/dailyassigment"
                  title="Daily Assignent"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<GiBookshelf />} groupName="Library">
               <LinkNav
                  path="/dashboard/admin/booklist "
                  title="Booklist"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/member"
                  title="Issue / return "
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/member/student"
                  title="Add Student"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/member/teacher"
                  title="Add staff member"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaRegObjectGroup />} groupName="Inventory">
               <LinkNav
                  path="/dashboard/admin/issueitem "
                  title="Issue items"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/itemstock"
                  title="Add Items stock"
               ></LinkNav>
               <LinkNav path="/dashboard/admin/item" title="Add Item"></LinkNav>
               <LinkNav
                  path="/dashboard/admin/itemcategory"
                  title="Item category"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/itemstore"
                  title="Item store"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/itemsupplier"
                  title="Item suplier"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<MdEmojiTransportation />}
               groupName="transport"
            >
               <LinkNav
                  path="/dashboard/admin/transport/feesmaster "
                  title="Fees master"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/pickuppoint"
                  title="Pickup point"
               ></LinkNav>
               <LinkNav path="/dashboard/admin/route" title="Route"></LinkNav>
               <LinkNav
                  path="/dashboard/admin/vehicles"
                  title="vehicles"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/assignvechicles"
                  title="Assign Vechicles"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/pickuppoint/assign"
                  title="Route pickup points"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/transport/fees"
                  title="Student transport fees"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<MdOutlineHomeWork />} groupName="hostel">
               <LinkNav
                  path="/dashboard/admin/hostel/room"
                  title="Hostel Room"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/hostel/roomtype"
                  title="Room Type"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/addhostel"
                  title="Add Hostel"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails
               icon={<PiCertificateFill />}
               groupName="Certificate"
            >
               <LinkNav
                  path="/dashboard/admin/stuent/certificate"
                  title="Studnet Certificate"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/generatecertificate"
                  title="Generate Certificate"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/studentidcard"
                  title="Student Id card"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/generateidcard"
                  title="Generate Id card"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/staffidcard"
                  title="Staff id card"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/generatestaffidcard"
                  title="Generate Staff Id card"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaEmpire />} groupName="Front CMS">
               <LinkNav
                  path="/dashboard/admin/front/event"
                  title="Event"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/front/gallary"
                  title="Gallary"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/front/news "
                  title="news"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/front/media "
                  title="media manager"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/front/pages "
                  title="pages"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/front/menus "
                  title="menus"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/front/bannerimages "
                  title="banner images"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaUniversalAccess />} groupName="Alumni">
               <LinkNav
                  path="/dashboard/admin/alumni/alumnilist"
                  title="manage alumni"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/alumni/events"
                  title="Gallary"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaChartLine />} groupName="reports">
               <LinkNav
                  path="/dashboard/admin/reports/studentinformation"
                  title="Student information"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/financereport/finance"
                  title="Finance"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/examresults/examination"
                  title="Examinations"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/onlineexam/report"
                  title="Online examinations"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/reports/lesson_plan"
                  title="lesson plan"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/reports/humanresource_report"
                  title="Human resource"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/reports/homework_reports"
                  title="Homework "
               ></LinkNav>
               <LinkNav
                  path="/dashboard/reports/library"
                  title="library"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/reports/inventory"
                  title="inventory"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/route/studenttransportdetails"
                  title="transport"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/hostelroom/studenthosteldetails"
                  title="hostel"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/reports/alumni_report"
                  title="alumni"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/userlog"
                  title="alumni"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/aduit"
                  title="Audit trial report"
               ></LinkNav>
            </SummeryDetails>
            <SummeryDetails icon={<FaGears />} groupName="System Settings">
               <LinkNav
                  path="/dashboard/admin/settings/general"
                  title="General Settings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/settings/session"
                  title="session settings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/settings/notification"
                  title="notification settings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/settings/emailsettings"
                  title="Email settings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/settings/payment_method"
                  title="payment methods"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/settings/printheaderfooter"
                  title="Print header footer"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/settings/front_cms"
                  title="Front cms settings "
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/role"
                  title="role permission "
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/backup"
                  title="backup restore"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/lanugage"
                  title="language"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/currency"
                  title="currency"
               ></LinkNav>
               <LinkNav path="/dashboard/admin/users" title="users"></LinkNav>
               <LinkNav
                  path="/dashboard/admin/modules"
                  title="modules"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/customfeilds"
                  title="custom fields"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/captcha"
                  title="captcha settings"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/systemfields"
                  title="system fields"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/student/profilesettings"
                  title="Student profile update"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/onlineadmission/admissionsettings"
                  title="Online admission"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/file_type"
                  title="file type"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/side_bar"
                  title="sidebar menu"
               ></LinkNav>
               <LinkNav
                  path="/dashboard/admin/system_update"
                  title="System update"
               ></LinkNav>
            </SummeryDetails>
         </div>
      </div>
   );
};

export default Siderbar;
