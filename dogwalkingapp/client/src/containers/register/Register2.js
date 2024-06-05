import React, { useEffect, useState } from "react";
import Header1 from "../../components/Header1";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { FaFileUpload, FaLeaf } from "react-icons/fa";
import "./Register1.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
function Register2() {
  const [countries, setCountries] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  //   const [PhoneNumber, setPhoneNumber] = useState();
  //   const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [city, setCity] = useState([]);
  const [userType, setUserType] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllCountries();
    fetchUserTypes();
  }, []);
  const fetchAllCountries = async () => {
    await axios.get("https://localhost:7072/api/Country").then((d) => {
      setCountries(d.data);
      const countrydata = countries ? console.log(d.data) : null;
    });
  };
  const validationSchema = Yup.object({
    FirstName: Yup.string()
      .required(t("First Name is required"))
      .matches(/^[A-Za-z0-9]+$/, t("Do not include special characters")),
    LastName: Yup.string().required(t("Please enter last name")),
    UserName: Yup.string().required(t("Please enter username")),
    Password: Yup.string()
      .required(t("Password is required"))
      .min(8, t("Password must be at least 8 characters")),
    Email: Yup.string()
      .email(t("Invalid email address"))
      .required(t("Email is required")),
    UserImage: Yup.string().required(t("Pls Select Image")),
    AddressLine1: Yup.string().required(t("Address Line 1 field is required")),
    AddressLine2: Yup.string().required(t("Address Line 2 field is required")),
    PostalCode: Yup.string().required(t("Postal Code is required")),
    Country: Yup.string().required(t("Pls Select Countrty")),
    State: Yup.string().required(t("Pls Select State")),
    City: Yup.string().required(t("Pls Select City")),
    PhoneNumber: Yup.number()
      .required(t("Please Enter 10 digit Mobile Number"))
      .min(10, "Phone Number Must be 10 digit number"),
  });
  const onSubmit = async (values, { setSubmitting }) => {
    values.PhoneNumber = values.PhoneNumber.toString();
    await axios
      .post("https://localhost:7072/api/Users", values)
      .then((d) => {
        if (d.data.messageParam != null) {
          console.log(d.data.messageParam);
        } else {
          if (sessionStorage.getItem("role") == null) {
            sessionStorage.setItem("role", d.data.userType);
            sessionStorage.setItem("name", d.data.firstName + d.data.lastName);
            sessionStorage.setItem("id", d.data.id);
            navigate("/");
          }
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          title: "Error Registering",
          text: `${error.response.data.messageParam}`,
          buttons: true,
        }).then(() => {
          // window.location.reload();
        });
      });
  };
  const handleUserType = ({ field, form: { setFieldValue } }) => {
    return (
      <select style={{ height: 46 }} className="form-control">
        <option>{t("Select User Type")}</option>
        {userType.map((option) => (
          <option data-key={option.id} value={option.userTypeName}>
            {option.userTypeName}
          </option>
        ))}
      </select>
    );
  };
  const fetchUserTypes = async () => {
    await axios.get("https://localhost:7072/api/UserType").then((d) => {
      console.log(d.data);
      setUserType(d.data);
    });
  };
  const FileUploadField = ({ field, form: { setFieldValue } }) => {
    const handleFileChange = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = function () {
        console.log(reader.result.split(",")[1]);
        setFieldValue("UserImage", reader.result.split(",")[1]);
        setUserImage(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    };
    return <input type="file" onChange={handleFileChange} />;
  };

  const fetchStates = async (countryId) => {
    await axios
      .get(`https://localhost:7072/api/State/${countryId}/GetStateByCountryId`)
      .then((d) => {
        console.log(d.data);
        setStates(d.data);
      });
  };
  const DropdownSelect = ({ field, form: { setFieldValue } }) => {
    const handleDropdownChange = (e) => {
      const selectedCountryId =
        e.target.options[e.target.selectedIndex].dataset.key;
      setFieldValue("Country", e.target.value);
      //   setCountryId(selectedCountryId);
      fetchStates(selectedCountryId);
    };
    return (
      <select
        style={{ height: 46 }}
        className="form-control"
        onChange={handleDropdownChange}
        value={field.value}
      >
        <option>{t("Select Country")}</option>
        {countries.map((option) => (
          <option data-key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };
  const fetchCity = async (stateId) => {
    await axios
      .get(`https://localhost:7072/api/City/${stateId}/GetCityByStateId`)
      .then((d) => {
        setCities(d.data);
      });
  };
  const DropdownSelectState = ({ field, form: { setFieldValue } }) => {
    const handleStateChange = (e) => {
      const selectedStateId =
        e.target.options[e.target.selectedIndex].dataset.key;
      setFieldValue("State", e.target.value);
      //   setStateId(selectedStateId);
      fetchCity(selectedStateId);
    };
    return (
      <select
        value={field.value}
        onChange={handleStateChange}
        style={{ height: 46 }}
        className="form-control"
      >
        <option selected>{t("Select State")}</option>
        {states.map((option) => (
          <option data-key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };
  const DropdownSelectCity = ({ field, form: { setFieldValue } }) => {
    const handleCityChange = (e) => {
      setFieldValue("City", e.target.value);
    };
    return (
      <select
        onChange={handleCityChange}
        style={{ height: 46 }}
        className="form-control"
      >
        <option selected>{t("Select City")}</option>
        {cities.map((option) => (
          <option data-key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };
  const handlePhoneNumber = ({ field, form: { setFieldValue } }) => {
    const setPhoneNumber = (e) => {
      setFieldValue("PhoneNumber", e);
    };
    return <PhoneInput onChange={setPhoneNumber} />;
  };
  return (
    <div>
      <Header1 />
      <h1 className="text-center fontWeight mt-3">Register Page</h1>
      <div
        className="container bg"
        style={{ padding: "1px 0px 11px 17px", width: 900 }}
      >
        {userImage && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 10,
              height: 150,
            }}
          >
            <img
              src={`data:image/png;base64,${userImage}`}
              style={{
                borderRadius: "15%",
                width: 200,
                boxShadow: " 4px 4px 8px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        )}
        <Formik
          enableReinitialize={true}
          initialValues={{
            FirstName: "",
            LastName: "",
            UserName: "",
            Password: "",
            Email: "",
            UserImage: "",
            UserType: "",
            AddressLine1: "",
            AddressLine2: "",
            PostalCode: "",
            PhoneNumber: "",
            City: "",
            State: "",
            Country: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("First Name")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="FirstName"
                    placeholder={t("First Name")}
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="FirstName"
                    component="div"
                  />
                </div>
              </div>
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("Last Name")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="LastName"
                    placeholder={t("Last Name")}
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="LastName"
                    component="div"
                  />
                </div>
              </div>
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("User Name")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="UserName"
                    placeholder={t("User Name")}
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="UserName"
                    component="div"
                  />
                </div>
              </div>
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("Email Name")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="Email"
                    placeholder={t("Email Name")}
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="Email"
                    component="div"
                  />
                </div>
              </div>
                <div
                  className="form-group row mt-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label className="col-lg-4">{t("User Image")}</label>
                  <div className="col-lg-4">
                    <Field name="UserImage" component={FileUploadField} />
                    <ErrorMessage
                      className="text-danger text-center mt-2"
                      name="UserImage"
                      component="div"
                    />
                  </div>
                </div>
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("Phone Number")}</label>
                <div className="col-lg-4">
                  <Field name="PhoneNumber" component={handlePhoneNumber} />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="PhoneNumber"
                    component="div"
                  />
                </div>
              </div>
            
              {sessionStorage.getItem("role") === "Admin User" ? (
                <div
                  className="form-group row mt-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label className="col-lg-4">{t("User Type")}</label>
                  <div className="col-lg-4">
                    <Field component={handleUserType} />
                  </div>
                </div>
              ) : null}
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("Country")}</label>
                <div className="col-lg-4">
                  <Field name="Country" component={DropdownSelect} />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="Country"
                    component="div"
                  />
                </div>
              </div>
              {states && (
                <div
                  className="form-group row mt-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label className="col-lg-4">{t("State")}</label>
                  <div className="col-lg-4">
                    <Field name="State" component={DropdownSelectState} />
                    <ErrorMessage
                      className="text-danger text-center mt-2"
                      name="State"
                      component="div"
                    />
                  </div>
                </div>
              )}
              {cities && (
                <div
                  className="form-group row mt-4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label className="col-lg-4">{t("City")}</label>
                  <div className="col-lg-4">
                    <Field name="City" component={DropdownSelectCity} />
                    <ErrorMessage
                      className="text-danger text-center mt-2"
                      name="City"
                      component="div"
                    />
                  </div>
                </div>
              )}
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("Address Line 1")}:</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="AddressLine1"
                    placeholder={t("Address Line 1")}
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="AddressLine1"
                    component="div"
                  />
                </div>
              </div>
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("Address Line 2")}:</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="AddressLine2"
                    placeholder={t("Address Line 2")}
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="AddressLine2"
                    component="div"
                  />
                </div>
              </div>
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("Postal Code")}:</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="PostalCode"
                    placeholder={t("Postal Code")}
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="PostalCode"
                    component="div"
                  />
                </div>
              </div>
              <div
                className="form-group row mt-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label className="col-lg-4">{t("Password")}:</label>
                <div className="col-lg-4">
                  <Field
                    type="password"
                    name="Password"
                    placeholder={t("Password")}
                    className="form-control"
                  />
                  <ErrorMessage
                    className="text-danger text-center mt-2"
                    name="Password"
                    component="div"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button12 form-control"
                >
                  {t("Register")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register2;
