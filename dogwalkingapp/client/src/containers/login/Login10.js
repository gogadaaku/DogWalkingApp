// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useTranslation } from "react-i18next";
// import Header from "../../components/Header";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Header1 from "../../components/Header1";
// function Login10() {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const [langLoaded, setLangLoaded] = useState(false);
//   const changeLanguage = (e) => {
//     // console.log(e);
//     let lang = "";
//     lang = e.target.value;
//     // console.log("lang:", lang);
//     i18n.changeLanguage(lang);
//     localStorage.setItem("lang", lang);
//   };
//   useEffect(() => {
//     const storedLang = localStorage.getItem("lang");
//     if (storedLang && !langLoaded) {
//       i18n.changeLanguage(storedLang);
//       setLangLoaded(true); // Set language loaded to true to avoid re-render loop
//     }
//   });
//   return (
//     <div className="App">
//       <center>
//         <Header1 />
//         <h1 style={{ marginTop: 14 }}>{t("Enter Your Details To Login")}</h1>
//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validate={(values) => {
//             const errors = {};
//             if (!values.email) {
//               errors.email = `${t("Email Required")}`;
//             } else if (
//               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//             ) {
//               errors.email = "Invalid email address";
//             }
//             if (!values.password) {
//               errors.password = `${t("Password Required")}`;
//             }
//             if (values.password.length < 8 && values.password) {
//               errors.password = "Min lenght 8";
//             }
//             return errors;
//           }}
//           onSubmit={(values, { setSubmitting }) => {
//             setTimeout(() => {
//               alert(JSON.stringify(values, null, 2));
//               console.log(values);
//               axios
//                 .post("https://localhost:7072/api/Authentication/hello", values)
//                 .then((d) => {
//                   console.log(d.data);
//                   sessionStorage.setItem("role", d.data.userType);
//                   sessionStorage.setItem("id", d.data.id);
//                   sessionStorage.setItem(
//                     "name",
//                     d.data.firstName + d.data.lastName
//                   );
//                   sessionStorage.setItem("token", d.data.token);
//                   Swal.fire({
//                     icon: "success",
//                     title: "Login Successful!",
//                     text: `Welcome, ${d.data.firstName}!`,
//                   });
//                   navigate("/");
//                 });
//               setSubmitting(false);
//             }, 400);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div style={{ marginTop: 20 }} className="col-lg-9">
//                 <div className="form-group row">
//                   <label className="col-lg-4">{t("Email")}</label>
//                   <div className="col-lg-5">
//                     <Field
//                       type="email"
//                       name="email"
//                       placeholder={t("Enter Username")}
//                       className="form-control"
//                     />
//                   </div>
//                   <ErrorMessage
//                     className="text-danger"
//                     name="email"
//                     component="div"
//                   />
//                 </div>
//                 <div className="form-group row">
//                   <label className="col-lg-4">{t("Password")}</label>
//                   <div className="col-lg-5">
//                     <Field
//                       type="password"
//                       name="password"
//                       placeholder={t("Enter Password")}
//                       className="form-control"
//                     />
//                   </div>
//                   <ErrorMessage
//                     className="text-danger"
//                     name="password"
//                     component="div"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn btn-warning"
//                   disabled={isSubmitting}
//                 >
//                   {t("Login")}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </center>
//       {/* <button
//         value="fr"
//         onClick={(e) => {
//           changeLanguage(e);
//         }}
//       ></button> */}
//       {/* <button
//         value="en"
//         onClick={(e) => {
//           changeLanguage(e);
//         }}
//       ></button> */}
//     </div>
//   );
// }

// export default Login10;
