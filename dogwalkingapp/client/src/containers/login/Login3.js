// import React, { useEffect, useState } from "react";
// import Header1 from "../../components/Header1";
// import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { useTranslation } from "react-i18next";
// import "./Login1.css";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import ROUTES from "../../navigations/Routes";

// function Login3() {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();
//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email(`${t("Invalid Email Addresss")}`)
//       .required(`${"Email is required"}`),
//     password: Yup.string()
//       .min(8, `${t("Password Should Be 8 Characters Long")}`)
//       //   .matches(
//       //     "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
//       //     `${t(
//       //       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
//       //     )}`
//       //   )
//       .required(`${t("Password Required")}`),
//   });
//   const [langLoaded, setLangLoaded] = useState(false);
//   useEffect(() => {
//     const storedLang = localStorage.getItem("lang");
//     if (storedLang && !langLoaded) {
//       i18n.changeLanguage(storedLang);
//       setLangLoaded(true);
//     }
//   }, []);
//   return (
//     <div>
//       <Header1 />
//       <label>{t("Enter Your Details To Login")}</label>
//       <div style={{ marginLeft: 300 }}>
//         <Formik
//           initialValues={{
//             email: "",
//             password: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(Values) => {
//             axios
//               .post("https://localhost:7072/api/Authentication/hello", Values)
//               .then((d) => {
//                 console.log(d.data);

//                 sessionStorage.setItem("role", d.data.userType);
//                 sessionStorage.setItem("id", d.data.id);
//                 sessionStorage.setItem(
//                   "name",
//                   d.data.firstName + d.data.lastName
//                 );
//                 sessionStorage.setItem("token", d.data.token);
//                 // console.log(d.data.message);
//                 Swal.fire({
//                   icon: "success",
//                   title: "Login Successful!",
//                   text: `Welcome, ${d.data.firstName}!`,
//                 });
//                 if (sessionStorage.getItem("role") == "Client User") {
//                   navigate(ROUTES.clientHome.name);
//                 } else {
//                   navigate(ROUTES.home.name);
//                 }
//                 // window.location.reload();
//               })
//               .catch((e) => {
//                 console.log(e);
//                 Swal.fire({
//                   icon: "error",
//                   title: "Login Failed",
//                   text: `${e.response.data.messageParam}`,
//                 });
//               });
//           }}
//         >
//           {({ isSubmitting, errors, touched }) => {
//             return (
//               <Form>
//                 <div style={{ marginTop: 20 }} className="col-lg-9">
//                   <div className="form-group row">
//                     <label className="col-lg-4">{t("Email")}</label>
//                     <div className="col-lg-5">
//                       <Field
//                         type="email"
//                         name="email"
//                         placeholder={t("Email")}
//                         className="form-control"
//                       />
//                     </div>
//                     {errors.email && touched.email ? (
//                       <div className="text-danger">{errors.email}</div>
//                     ) : null}
//                   </div>
//                   <div className="form-group row">
//                     <label className="col-lg-4">{t("Password")}</label>
//                     <div className="col-lg-5">
//                       <Field
//                         type="password"
//                         name="password"
//                         placeholder={t("Enter Password")}
//                         className="form-control"
//                       />
//                     </div>
//                     {errors.password && touched.password ? (
//                       <div className="text-danger">{errors.password}</div>
//                     ) : null}
//                   </div>

//                   <button
//                     type="submit"
//                     className="button-89"
//                     disabled={isSubmitting}
//                   >
//                     {t("Login")}
//                   </button>
//                 </div>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default Login3;
import React, { useEffect, useState } from "react";
import Header1 from "../../components/Header1";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import "./Login1.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigations/Routes";

function Login3() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [langLoaded, setLangLoaded] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && !langLoaded) {
      i18n.changeLanguage(storedLang);
      setLangLoaded(true);
    }
  }, [i18n]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Invalid Email Address"))
      .required(t("Email is required")),
    password: Yup.string()
      .min(8, t("Password Should Be 8 Characters Long"))
      .required(t("Password is required")),
  });

  return (
    <div>
      <Header1 />
      <div>
        <label className="label">{t("Enter Your Details To Login")}</label>
      </div>
      <div style={{ marginLeft: 300 }}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(Values) => {
            axios
              .post("https://localhost:7072/api/Authentication/hello", Values)
              .then((d) => {
                console.log(d.data);

                sessionStorage.setItem("role", d.data.userType);
                sessionStorage.setItem("id", d.data.id);
                sessionStorage.setItem(
                  "name",
                  d.data.firstName + d.data.lastName
                );
                sessionStorage.setItem("token", d.data.token);
                Swal.fire({
                  icon: "success",
                  title: t("Login Successful!"),
                  text: `${t("Welcome")}, ${d.data.firstName}!`,
                });
                if (sessionStorage.getItem("role") == "Client User") {
                  navigate(ROUTES.clientHome.name);
                } else {
                  navigate(ROUTES.home.name);
                }
              })
              .catch((e) => {
                console.log(e);
                Swal.fire({
                  icon: "error",
                  title: t("Login Failed"),
                  text: `${e.response.data.messageParam}`,
                });
              });
          }}
        >
          {({ isSubmitting, errors, touched }) => {
            return (
              <Form>
                <div style={{ marginTop: 20 }} className="col-lg-9">
                  <div>
                    {/* <div style={{marginLeft:70,marginBottom:80,marginTop:90}}> */}
                    <div className="form-group row">
                      <label className="col-lg-4">{t("Email")}</label>
                      <div className="col-lg-5">
                        <Field
                          type="email"
                          name="email"
                          placeholder={t("Email")}
                          className="form-control"
                        />
                      </div>
                      {errors.email && touched.email ? (
                        <div className="text-danger label">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-4">{t("Password")}</label>
                      <div className="col-lg-5">
                        <Field
                          type="password"
                          name="password"
                          placeholder={t("Enter Password")}
                          className="form-control"
                        />
                      </div>
                      {errors.password && touched.password ? (
                        <div className="text-danger label">{errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="label">
                    <button
                      type="submit"
                      className="button-89"
                      disabled={isSubmitting}
                    >
                      {t("Login")}
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login3;
