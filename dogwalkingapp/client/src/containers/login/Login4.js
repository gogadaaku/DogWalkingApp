import Header1 from "../../components/Header1";
import "./Login4.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigations/Routes";
import EmpManag from "../admin/empMan/EmpManag";
import React, { useEffect, useState } from "react";
import axios from "axios";
function Login4() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
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
  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    await axios
      .post("https://localhost:7072/api/Authentication/hello", values)
      .then((d) => {
        sessionStorage.setItem("email", d.data.email);
        sessionStorage.setItem("role", d.data.userType);
        sessionStorage.setItem("id", d.data.id);
        sessionStorage.setItem(
          "name",
          d.data.firstName + " " + d.data.lastName
        );
        sessionStorage.setItem("token", d.data.token);
        sessionStorage.setItem("phoneNumber", d.data.phoneNumber);
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
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: t("Login Failed"),
          text: `${err.response.data.messageParam}`,
        });
      });
  };
  return (
    <div>
      <Header1 />
      <h1 className="text-center fontWeight">Login page</h1>
      <div className="displayflexwala">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="cardContainer">
                <div className="form-group row col-lg-9">
                  <label style={{ padding: 6 }} className="col-lg-4">
                    Email
                  </label>
                  <div className="col-lg-8">
                    <Field
                      type="text"
                      name="email"
                      placeholder={t("Email")}
                      className="form-control"
                    />
                    <ErrorMessage
                      className="text-danger text-center mt-2"
                      name="email"
                      component="div"
                    />
                  </div>
                </div>
                <div className="form-group row col-lg-9">
                  <label style={{ padding: 6 }} className="col-lg-4">
                    Password
                  </label>
                  <div className="col-lg-8">
                    <Field
                      type="password"
                      name="password"
                      placeholder={t("Password")}
                      className="form-control"
                    />
                    <ErrorMessage
                      className="text-danger text-center mt-2"
                      name="password"
                      component="div"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: "0px 0px 0px 0px ",
                    height: 45,
                    width: "150px",
                    borderRadius: 15,
                    border: "1px solid",
                    margin: " 20px",
                  }}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login4;
