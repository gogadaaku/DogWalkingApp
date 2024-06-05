// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ROUTES from "../navigations/Routes";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import i18n from "../i18n";
// // import "./Header.css";
// function Header() {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = (e) => {
//     let lang = "";
//     lang = e.target.value;
//     i18n.changeLanguage(lang);
//     localStorage.setItem("lang", lang);
//   };
//   const [langLoaded, setLangLoaded] = useState(false);
//   useEffect(() => {
//     const storedLang = localStorage.getItem("lang");
//     if (storedLang && !langLoaded) {
//       i18n.changeLanguage(storedLang);
//       setLangLoaded(true);
//     }
//   });
//   const [roles, setRoles] = useState(null);
//   const checkLoginLogout = () => {
//     const role = sessionStorage.getItem("role");
//     setRoles(role);
//   };
//   const navigate = useNavigate();
//   useEffect(() => {
//     checkLoginLogout();
//   }, []);
//   function handleLogout() {
//     sessionStorage.clear();
//     navigate("/login");
//     window.location.reload();
//   }
//   useEffect(() => {
//     renderManagementDropdown();
//   }, []);
//   function renderManagementDropdown() {
//     if (sessionStorage.getItem("role") == "Admin User") {
//       return (
//         <select className="nav-link active" onChange={changeHandler}>
//           <option selected disabled>
//             {t("Management")}
//           </option>
//           <option value={"/empmag"}>{t("Employee Management")}</option>
//           <option value={"/climanag"}>{t("Client Management")}</option>
//         </select>
//       );
//     }
//   }
//   function renderLanguageDropdown() {
//     return (
//       <div>
//         <select onChange={changeLanguage}>
//           <option value="" selected disabled>
//             {t("Select Language")}
//           </option>
//           <option value="en">{t("English")}</option>
//           <option value="fr">{t("French")}</option>
//           <option value="hi">{t("Hindi")}</option>
//           <option value="pu">{t("Punjabi")}</option>
//         </select>
//       </div>
//     );
//   }
//   function renderLoginLogoutButton() {
//     return (
//       <div>
//         {roles == null ? (
//           <Link class="button-86" role="button" to={ROUTES.login1.name}>
//             {t("Login")}
//           </Link>
//         ) : (
//           <Link class="button-86" role="button" onClick={handleLogout}>
//             {t("Logout")}
//           </Link>
//         )}
//       </div>
//     );
//   }
//   function changeHandler(e) {
//     console.log(e);
//     navigate(e.target.value);
//   }
//   function renderRegisterButton() {
//     if (sessionStorage.getItem("role") == null)
//       return (
//         <div>
//           <Link
//             style={{ marginRight: 50 }}
//             class="button-49 "
//             role="button"
//             to={ROUTES.register1.name}
//           >
//             {t("Register")}
//           </Link>
//         </div>
//       );
//   }
//   function renderHistory() {
//     if (sessionStorage.getItem("role") == "Admin User") {
//       return (
//         <Link className="nav-link active" to={ROUTES.bookingHistory.name}>
//           {t("BookingHistory")}
//         </Link>
//       );
//     }
//   }
//   function renderAllUsers() {
//     if (sessionStorage.getItem("role") == "Admin User") {
//       return (
//         <Link className="nav-link active" to={ROUTES.allusers.name}>
//           {t("All Users")}
//         </Link>
//       );
//     }
//   }
//   return (
//     <div>
//       <nav class="navbar navbar-expand-lg navbar-light bg-light">
//         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul class="navbar-nav mr-auto">
//             {/* <img
//               onClick={() => {
//                 navigate("/");
//               }}
//               // style={{ display: "flex", width: 116, height: 109 }}
//               // src="../brown-dog-sitting-with-tongue-out.jpg"
//             /> */}
//             <div>
//               <li class="nav-item active">
//                 <Link className="nav-link active " to={ROUTES.about.name}>
//                   {t("About")}
//                 </Link>
//               </li>
//               <li class="nav-item active">
//                 <Link className="nav-link active " to={ROUTES.contact1.name}>
//                   {t("Contact")}
//                 </Link>
//               </li>
//               <li class="nav-item active">
//                 <Link className="nav-link active " to={ROUTES.support.name}>
//                   {t("Support")}
//                 </Link>
//               </li>
//             </div>
//             <div>{renderHistory()}</div>
//             <div>{renderAllUsers()}</div>
//             <div>{renderManagementDropdown()}</div>
//             <div>{renderLanguageDropdown()}</div>
//           </ul>
//           <div>{renderRegisterButton()}</div>

//           <div>{renderLoginLogoutButton()}</div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Header;
