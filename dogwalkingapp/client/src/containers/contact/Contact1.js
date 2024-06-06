import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Field, Form, Formik, swap } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import "./Contact1.css";
import Header1 from "../../components/Header1";

import PhoneInput from "react-phone-number-input";
import axios from "axios";
import Swal from "sweetalert2";
import ROUTES from "../../navigations/Routes";
import { useNavigate } from "react-router-dom";

function Contact1() {
  const email = sessionStorage.getItem("email");
  const fullName = sessionStorage.getItem("name");
  const phoneNumber = sessionStorage.getItem("phoneNumber");
  const userType = sessionStorage.getItem("role");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [langLoaded, setLangLoaded] = useState(false);
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && !langLoaded) {
      i18n.changeLanguage(storedLang);
      setLangLoaded(true); // Set language loaded to true to avoid re-render loop
    }
    console.log("email in contact", email);
  });
  const handleUserType = ({ field, form: { setFieldValue } }) => {
    const handleUserTypeChange = (e) => {
      setFieldValue("UserType", e.target.value);
      console.log(e.target.value);
    };
    return (
      <select  value={userType}
        style={{ height: 45 }}
        onChange={handleUserTypeChange}
        className="form-control"
      >
        <option>{t("Select User Type")}</option>
        <option value={t("Employee User")}>{t("Walker")}</option>
        <option value={t("Client User")}>{t("Client")}</option>
        <option value={t("Anonymous")}>{t("Anonymous")}</option>
      </select>
    );
  };
  const handleComments = ({ field, form: { setFieldValue } }) => {
    const handleCommentChange = (e) => {
      setFieldValue("Comments", e.target.value);
      console.log(e.target.value);
    };
    return (
      <textarea
        className="form-control"
        onChange={handleCommentChange}
        rows="4"
        cols="50"
      ></textarea>
    );
  };
  let validationSchema = Yup.object().shape({
    FullName: Yup.string()
      .min(2, t("Minimum 2 characters "))
      .required(t("Full Name is Required")),
    Email: Yup.string()
      .email(t("Invalid Email"))
      .required(t("Email Required!!!")),
    MobileNumber: Yup.number()
      .typeError(t("That doesn't look like a phone number"))
      .positive(t("A phone number can't start with a minus"))
      .integer(t("A phone number can't include a decimal point"))
      .min(8, t("Minimum 10 numbers are required"))
      .required(t("A phone number is required")),
    UserType: Yup.string().required(t("User Type is required")),
    Comments: Yup.string()
      .min(100, t("Minimum 100 character are required"))
      .required(t("Comments are required so that we can understand your problem")),
  });

  const handlePhoneNumber = ({ field, form: { setFieldValue } }) => {
    const setPhoneNumber = (e) => {
      setFieldValue("MobileNumber", e);
    };
    return <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />;
  };
  return (
    <div>
      <Header1 />
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="cardContainer4">
          <Formik
            initialValues={{
              FullName: fullName || "",
              Email: email || "",
              MobileNumber: "",
              UserType: "",
              Comments: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              await axios
                .post("https://localhost:7072/api/Contact", values)
                .then((d) => {
                  console.log(d.data);
                  Swal.fire({
                    title: t("Query Successfuly Submitted"),
                    icon: "success",
                  }).then(() => {
                    navigate(ROUTES.home.name);
                  });
                });
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="form-group row mt-4">
                  <label className="col-lg-4">{t("Full Name")}</label>
                  <div className="col-lg-8">
                    <Field
                      type="text"
                      name="FullName"
                      placeholder={t("Full Name")}
                      className="form-control"
                    />
                  </div>
                  {errors.FullName && touched.FullName ? (
                    <div className="text-danger">{errors.FullName}</div>
                  ) : null}
                </div>
                <div className="form-group row mt-4">
                  <label className="col-lg-4">{t("Email")}</label>
                  <div className="col-lg-8">
                    <Field
                      type="text"
                      name="Email"
                      placeholder={t("Email")}
                      className="form-control"
                    />
                  </div>
                  {errors.Email && touched.Email ? (
                    <div className="text-danger">{errors.Email}</div>
                  ) : null}
                </div>

                <div className="form-group row mt-4">
                  <label className="col-lg-4">{t("Mobile Number")}</label>
                  <div className="col-lg-8">
                    <Field name="MobileNumber" component={handlePhoneNumber} />
                  </div>
                  {errors.MobileNumber && touched.MobileNumber ? (
                    <div className="text-danger">{errors.MobileNumber}</div>
                  ) : null}
                </div>
                <div className="form-group row mt-4">
                  <label className="col-lg-4">{t("User Type")}</label>
                  <div className="col-lg-8">
                    <Field component={handleUserType} />
                  </div>
                  {errors.UserType && touched.UserType ? (
                    <div className="text-danger">{errors.UserType}</div>
                  ) : null}
                </div>
                <div className="form-group row mt-4">
                  <label className="col-lg-4">{t("Comment")}</label>
                  <div className="col-lg-8">
                    <Field component={handleComments} />
                  </div>
                  {errors.Comments && touched.Comments ? (
                    <div className="text-danger">{errors.Comments}</div>
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 40,
                  }}
                >
                  <button
                    style={{ width: 390 }}
                    class="button-89"
                    type="submit"
                    role="button"
                  >
                    {t("Submit Query")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Contact1;
