import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "./Register1.css";
import Header1 from "../../components/Header1";
import Swal from "sweetalert2";
// import "./Register2.scss";
// import '../scss/FileName.scss';
function Register1() {
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState(null);
  // const [cityId, setCityId] = useState(null);
  // let countryId = null;
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [userType, setUserType] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    countriesAll();
    getAllUserTypes();
  }, []);
  useEffect(() => {
    if (countryId != null) {
      stateFetch(countryId);
    }
  }, [countryId]);
  useEffect(() => {});
  function getAllUserTypes() {
    axios.get("https://localhost:7072/api/UserType").then((d) => {
      console.log(d.data);
      setUserType(d.data);
    });
  }

  const FileUploadField = ({ field, form: { setFieldValue } }) => {
    const handleFileChange = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = function () {
        console.log(reader.result.split(",")[1]);
        setFieldValue("UserImage", reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    };
    return <input type="file" onChange={handleFileChange} />;
  };
  const DropdownSelect = ({ field, form: { setFieldValue } }) => {
    function handleDropdownChange(e) {
      setFieldValue("Country", e.target.value);
      const selectedIndex = e.target.options.selectedIndex;
      stateFetch(e.target.options[selectedIndex].getAttribute("data-key"));
      // setCountryId(e.target.options[selectedIndex].getAttribute("data-key"));
    }
    return (
      <select
        onChange={handleDropdownChange}
        style={{ height: 46 }}
        className="form-control"
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
  function stateFetch(countryId) {
    axios
      .get(`https://localhost:7072/api/State/${countryId}/GetStateByCountryId`)
      .then((d) => {
        console.log(d.data);
        setStates(d.data);
      });
  }
  const DropdownSelectState = ({ field, form: { setFieldValue } }) => {
    const handleStateChange = (e) => {
      setFieldValue("State", e.target.value);
      const selectedIndex = e.target.options.selectedIndex;
      cityFetch(e.target.options[selectedIndex].getAttribute("data-key"));
    };
    function cityFetch(stateId) {
      axios
        .get(`https://localhost:7072/api/City/${stateId}/GetCityByStateId`)
        .then((d) => {
          console.log(d.data);
          setCity(d.data);
        });
    }
    return (
      <select
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
  const countriesAll = function () {
    axios.get("https://localhost:7072/api/Country").then((d) => {
      // console.log(d.data);
      setCountries(d.data);
    });
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
        {city.map((option) => (
          <option data-key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };
  function renderUserType() {
    if (sessionStorage.getItem("role") == "Admin User") {
      return (
        <div className="form-group row mt-4">
          <label className="col-lg-4">{t("User Type")}</label>
          <div className="col-lg-4">
            <Field component={handleUserType} />
          </div>
          <ErrorMessage className="text-danger" name="Email" component="div" />
        </div>
      );
    }
  }
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
  return (
    <div>
      <Header1 />
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
          PhoneNumber:"",
          City: "",
          State: "",
          Country: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.FirstName) {
            errors.FirstName = `${t("First Name is required")}`;
          }
          //   var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
          const regex = /[^A-Za-z0-9]/;
          if (regex.test(values.FirstName)) {
            errors.FirstName = `${t("Do not include special characters")}`;
          }

          if (!values.Password) {
            errors.Password = `${t("Password is required")}`;
          }
          if (!values.Email) {
            errors.Email = `${t("Email is required")}`;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)
          ) {
            errors.Email = `${t("Invalid email address")}`;
          }
          if (!values.UserImage) {
            errors.UserImage = `${t("Pls Select Image")}`;
          }
          if (!values.AddressLine1) {
            errors.AddressLine1 = `${t("Address Line 1 field is required")}`;
          }
          if (!values.AddressLine2) {
            errors.AddressLine2 = `${t("Address Line 2 field is required")}`;
          }
          if (!values.PostalCode) {
            errors.PostalCode = `${t("Postal Code is required")}`;
          }
          if (!values.Country) {
            errors.Country = `${t("Pls Select Countrty")}`;
          }
          if (!values.State) {
            errors.State = `${t("Pls Select State")}`;
          }
          if (!values.City) {
            errors.City = `${t("Pls Select City")}`;
          }
          if(!values.PhoneNumber){
            errors.PhoneNumber=`${t("Please Enter 10 digit Mobile Number")}`
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          // setTimeout(() => {
          //   // alert(JSON.stringify(values, null, 2));
          //   // console.log(values);
          //   setSubmitting(false);
          // }, 400);
          axios
            .post("https://localhost:7072/api/Users", values)
            .then((d) => {
              if (d.data.messageParam != null) {
                console.log(d.data.messageParam);
              } else {
                if (sessionStorage.getItem("role") == null) {
                  sessionStorage.setItem("role", d.data.userType);
                  sessionStorage.setItem(
                    "name",
                    d.data.firstName + d.data.lastName
                  );
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
        }}
      >
        {({ isSubmitting }) => (
          <div>
            <Form style={{ width: "auto", marginLeft: 400 }}>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("First Name")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="FirstName"
                    placeholder={t("First Name")}
                    className="form-control"
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="FirstName"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("Last Name")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="LastName"
                    placeholder={t("Last Name")}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("User Name")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="UserName"
                    placeholder={t("User Name")}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("Email")}</label>
                <div className="col-lg-4">
                  <Field
                    type="email"
                    name="Email"
                    placeholder={t("Email")}
                    className="form-control"
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="Email"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("Phone Number")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="PhoneNumber"
                    placeholder={t("Phone Number")}
                    className="form-control"
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="PhoneNumber"
                  component="div"
                />
              </div>
              {renderUserType()}
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("User Image")}</label>
                <div className="col-lg-4">
                  <Field name="UserImage" component={FileUploadField} />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="UserImage"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("Country")}</label>
                <div className="col-lg-4">
                  <Field
                    component={DropdownSelect}
                    name="Country"
                    placeholder={t("Select Country")}
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="Country"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("State")}</label>
                <div className="col-lg-4">
                  <Field
                    component={DropdownSelectState}
                    placeholder={t("Select State")}
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="State"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("City")}</label>
                <div className="col-lg-4">
                  <Field
                    component={DropdownSelectCity}
                    placeholder={t("Select City")}
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="City"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("Address Line 1")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="AddressLine1"
                    placeholder={t("Address Line 1")}
                    className="form-control"
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="AddressLine1"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("Address Line 2")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="AddressLine2"
                    placeholder={t("Address Line 2")}
                    className="form-control"
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="AddressLine2"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("Postal Code")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="PostalCode"
                    placeholder={t("Postal Code")}
                    className="form-control"
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="PostalCode"
                  component="div"
                />
              </div>
              <div className="form-group row mt-4">
                <label className="col-lg-4">{t("Password")}</label>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="Password"
                    placeholder={t("Password")}
                    className="form-control"
                  />
                </div>
                <ErrorMessage
                  className="text-danger"
                  name="Password"
                  component="div"
                />
              </div>
              <div style={{marginLeft:350}}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  class="button-51"
                  role="button"
                >
                  {t("Register")}
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Register1;
