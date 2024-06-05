import { computeHeadingLevel } from "@testing-library/react";
import About from "../containers/about/About";
import ClilentHistory from "../containers/admin/clientHistory/ClilentHistory";
import ClientManag from "../containers/admin/clientMan/ClientManag";
import EmpManag from "../containers/admin/empMan/EmpManag";
import AdminHome from "../containers/admin/home/AdminHome";
import Contact from "../containers/contact/Contact";
import Home from "../containers/home/Home";
// import Login from "../containers/login/Login";
import Register from "../containers/register/Register";
import Support from "../containers/support/Support";
import BookingHistory from "../containers/admin/bookingHistory/BookingHistory";
import AllUsers from "../containers/admin/allUsers/AllUsers";
import EmployeeHistory from "../containers/admin/empHistory/EmployeeHistory";
// import Login1 from "../containers/login/Login10";
import Register1 from "../containers/register/Register1";
import Contact1 from "../containers/contact/Contact1";
// import Login2 from "../containers/login/Login2";
import Login3 from "../containers/login/Login3";
import RegPet from "../containers/client/regPet/RegPet";
import ClientHome from "../containers/client/home/ClientHome";
import ClientPets from "../containers/client/myPets/ClientPets";
import PetHistory from "../containers/client/petHistory/PetHistory";
import Booking from "../containers/client/booking/Booking";
import Management from "../containers/admin/management/Management";
import MyBookings from "../containers/client/booking/MyBookings";
import EmpHome from "../containers/employee/employeeHome/EmpHome";
import MyEmpBookings from "../containers/employee/myBookings/MyEmpBookings";
import Navigate from "../containers/employee/navigation/Navigate";
import StartWalk from "../containers/employee/startWalk/StartWalk";
import AdminProfile from "../containers/admin/profile/AdminProfile";
import ChangePassword from "../containers/admin/profile/ChangePassword";
import Register2 from "../containers/register/Register2";
import Login4 from "../containers/login/Login4";
import MyEmpBooking from "../containers/employee/myBookings/MyEmpBooking";
import ManagProfEmp from "../containers/employee/profile/ManagProfEmp";
import ContactAdmin from "../containers/admin/contact/ContactAdmin";
import BookingHistory1 from "../containers/admin/bookingHistory/BookingHistory1";
import ContactReplyAdmin from "../containers/admin/contact/ContactReplyAdmin";
import EmployeeWalkDetail from "../containers/admin/empHistory/EmployeeWalkDetail";
import ClientWakDetails from "../containers/admin/clientHistory/ClientWakDetails";
import ViewUserDetails from "../containers/admin/allUsers/ViewUserDetails";
import NotAuthorized from "../components/notAuthorized/NotAuthorized";
// import Booking1 from "../containers/client/booking/Booking1";

const ROUTES = {
  empMan: {
    name: "/empmag",
    component: <EmpManag />,
  },
  about: {
    name: "/about",
    component: <About />,
  },
  adminHome: {
    name: "/adminHome",
    component: <AdminHome />,
  },
  home: {
    name: "/",
    component: <Home />,
  },
  contact: {
    name: "/contact",
    component: <Contact />,
  },
  support: {
    name: "/support",
    component: <Support />,
  },
  // login: {
  //   name: "/login",
  //   component: <Login />,
  // },
  register: {
    name: "/register",
    component: <Register />,
  },
  cliMan: {
    name: "/climanag",
    component: <ClientManag />,
  },
  cliHistory: {
    name: "/cliHistory",
    component: <ClilentHistory />,
  },
  bookingHistory: {
    name: "/bookingHistory",
    component: <BookingHistory />,
  },
  allusers: {
    name: "/allUsers",
    component: <AllUsers />,
  },
  empHistory: {
    name: "/empHistory",
    component: <EmployeeHistory />,
  },
  login3: {
    name: "/login3",
    component: <Login3 />,
  },
  register1: {
    name: "/register1",
    component: <Register1 />,
  },
  contact1: {
    name: "/contact1",
    component: <Contact1 />,
  },
  regPet: {
    name: "/regPet",
    component: <RegPet />,
  },
  clientHome: {
    name: "/clientHome",
    component: <ClientHome />,
  },
  clientPets: {
    name: "/clientPets",
    component: <ClientPets />,
  },
  petHistory: {
    name: "/petHistory",
    component: <PetHistory />,
  },
  clientBooking: {
    name: "/clientBooking",
    component: <Booking />,
  },
  adminManagement: {
    name: "/adminManagement",
    component: <Management />,
  },
  clientMyBooking1: {
    name: "/clientMyBooking1",
    component: <MyBookings />,
  },
  empHome: {
    name: "/empHome",
    component: <EmpHome />,
  },
  myEmpBooking: {
    name: "/myEmpBooking",
    component: <MyEmpBookings />,
  },navigate:{
    name:"/navigateEmp",
    component:<Navigate/>
  },startWalk:{
    name:"/startWalk",
    component:<StartWalk/>
  },adminProfile:{
    name:"/adminProfile",
    component:<AdminProfile/>
  },adminChangePassword:{
    name:"/changePassword",
    component:<ChangePassword/>
  },registerPage2:{
    name:"/registerPage2",
    component:<Register2/>
  },login4:{
    name:"/login4",
    component:<Login4/>
  },myBookingEmp:{
    name:"/myBookingEmp"
    ,component:<MyEmpBooking/>
  },managProfEmp:{
    name:"/managProfEmp"
    ,component:<ManagProfEmp/>
  },contactAdmin:{
    name:"/contactAdmin",
    component:<ContactAdmin/>
  },bookingHistoryAdmin:{
    name:"/bookingHistoryAdmin",
    component:<BookingHistory1/>
  },contactAdminReply:{
    name:"/contactAdminReply",
    component:<ContactReplyAdmin/>
  },employeeWalkDetail:{
    name:"/employeeWalkDetail",
    component:<EmployeeWalkDetail/>
  },clientWalkDetails:{
    name:"/clientWalkDetails",
    component:<ClientWakDetails/>
  },viewUserDetailAdmin:{
    name:"/viewUserDetailAdmin",
    component:<ViewUserDetails/>
  },NotAuthorized:{
    name:"/NotAuthorized",
    component:<NotAuthorized/>
  }
};
export default ROUTES;
