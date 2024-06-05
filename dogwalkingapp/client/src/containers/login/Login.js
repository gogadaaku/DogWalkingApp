// import React, { lazy, useEffect, useState } from "react";
// import Header from "../../components/Header";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// function Login() {
//   const { t, i18n } = useTranslation();
//   const [langLoaded, setLangLoaded] = useState(false);
//   const navigate = useNavigate();
//   const [login, setLogin] = useState({
//     name: "",
//     password: "",
//   });
//   const [loginError, setLoginError] = useState({
//     name: "",
//     password: "",
//   });

// //   useEffect(() => {
// //     const storedLang = localStorage.getItem("lang");
// //     // console.log("sdfsd", typeof ());
// //     if (storedLang && !langLoaded) {
// //       i18n.changeLanguage(storedLang);
// //       setLangLoaded(true);
// //     }
// //   });
//   const changeHandler = (e) => {
//     setLogin({ ...login, [e.target.name]: e.target.value });
//     console.log(login);
//   };

//   function authenticate() {
//     // let formData = new FormData();
//     // formData.append("email", JSON.stringify(login.name));
//     // formData.append("password", JSON.stringify(login.password));
//     axios
//       .post(`https://localhost:7072/api/Authentication/hello`, {
//         email: login.name,
//         password: login.password,
//       })
//       .then((d) => {
//         console.log(d.data);

//         sessionStorage.setItem("role", d.data.userType);
//         sessionStorage.setItem("id", d.data.id);
//         sessionStorage.setItem("name", d.data.firstName + d.data.lastName);
//         sessionStorage.setItem("token", d.data.token);
//         // console.log(d.data.message);
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful!",
//           text: `Welcome, ${d.data.firstName}!`,
//         });
//         navigate("/");
//         // window.location.reload();
//       })
//       .catch((e) => {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: "Invalid username or password",
//         });
//       });
//   }
//   function onLoginClick() {
//     console.log(loginError);
//     let errors = false;
//     let error = {
//       name: "",
//       password: "",
//     };
//     if (login.name == "" || login.name.trim().length == 0) {
//       errors = true;
//       error = { ...error, name: "Enter UserName" };
//     }
//     if (login.password == "" || login.password.trim().length == 0) {
//       errors = true;
//       error = { ...error, password: "Enter password" };
//     }

//     if (errors) {
//       setLoginError(error);
//       return;
//     } else {
//       setLoginError(error);
//       authenticate();
//     }
//   }
//   return (
//     <div>
//       <Header />
//       <div className="container mb-6">
//         <h2 style={{marginTop:14}} className="text-primary">{t("Login")}</h2>
//         <label>{t("Enter Your Details To Login")}</label>
//       </div>
//       <div className="container ">
//         <div className="col-9 m-5">
//           <div className="form-group row">
//             <div className="col-3">
//               <label>{t("User Name")}</label>
//             </div>
//             <div className="col-9">
//               <input
//                 onChange={changeHandler}
//                 type="text"
//                 placeholder={t("Enter Username")}
//                 name="name"
//                 className="form-control"
//               />
//             </div>
//             <p className="text-danger">{loginError.name}</p>
//           </div>
//           <br></br>
//           <div className="form-group row">
//             <div className="col-3">
//               <label>{t("Password")}</label>
//             </div>
//             <div className="col-9">
//               <input
//                 onChange={changeHandler}
//                 type="text"
//                 placeholder={t("Enter Password")}
//                 name="password"
//                 className="form-control"
//               />
//             </div>
//             <p className="text-danger">{loginError.password}</p>
//           </div>
//           <br></br>
//           <div className="form-group row">
//             <div className="col-3"></div>
//             <div className="col-9">
//               <button
//                 onClick={() => {
//                   onLoginClick();
//                 }}
//                 className="btn btn-warning form-control"
//               >
//                 {t("Login")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
