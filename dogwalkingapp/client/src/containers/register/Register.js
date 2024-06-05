import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
function Register() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({
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
    City: "",
    State: "",
    Country: "",
  });
  const { t, i18n } = useTranslation();
  const [formError, setFormError] = useState({
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
    City: "",
    State: "",
    Country: "",
  });
  const [emailError, setEmailError] = useState(false);
  // let error = "";
  const [userTypes, setUserTypes] = useState([]);
  useEffect(() => {
    getUserTypes();
    getCountries();
  }, []);
  const navigate = useNavigate();
  function renderEmailError() {
    if (emailError == true) {
      return (
        <h5
          className="text-danger"
          style={{
            position: "absolute",
            marginTop: 1,
            marginLeft: 415,
          }}
        >
          Email Already In Use!!!
        </h5>
      );
    }
  }
  function submitForm() {
    axios.post("https://localhost:7072/api/Users", form).then((d) => {
      // console.log("data aa gya", d.data);
      if (d.data.messageParam != null) {
        console.log(d.data.messageParam);
        setEmailError(true);
        // error = d.data.messageParam;
      } else {
        if (sessionStorage.getItem("role") == null) {
          sessionStorage.setItem("role", d.data.userType);
          navigate("/");
        }
        navigate("/");
        window.location.reload();
      }
    });
  }
  function getCountries() {
    axios.get("https://localhost:7072/api/Country").then((d) => {
      // console.log("countries", d.data);
      setCountries(d.data);
    });
  }
  function renderCountries() {
    return (
      <div className="form-group row  mt-3">
        <div className="text-primary col-lg-4">
          <label>{t("Country")}:</label>
        </div>
        <div className="col-lg-5">
          <select
            style={{ height: 46 }}
            id="country"
            onChange={(e) => {
              changeHandler(e);
              const selectedIndex = e.target.options.selectedIndex;
              setCountryId(
                e.target.options[selectedIndex].getAttribute("data-key")
              );
              getStateByCountryId(
                e.target.options[selectedIndex].getAttribute("data-key")
              );
            }}
            name="Country"
            className="form-control"
          >
            <option value="" selected disabled>
              {t("Select Country")}
            </option>
            {countries?.map((item) => (
              <option data-key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <p style={{ height: 0 }} className="text-danger">
          {formError.Country}
        </p>
      </div>
    );
  }
  function getStateByCountryId(countryId) {
    axios
      .get(`https://localhost:7072/api/State/${countryId}/GetStateByCountryId`)
      .then((d) => {
        // console.log(d.data);
        setStates(d.data);
      });
  }
  function renderStates() {
    return (
      <div className="form-group row  mt-3">
        <div className="text-primary col-lg-4">
          <label>{t("State")}:</label>
        </div>
        <div className="col-lg-5">
          <select
            style={{ height: 46 }}
            id="state"
            onChange={(e) => {
              changeHandler(e);
              const selectedIndex = e.target.options.selectedIndex;
              setStateId(
                e.target.options[selectedIndex].getAttribute("data-key")
              );
              console.log(stateId);
              getCityByStateId(
                e.target.options[selectedIndex].getAttribute("data-key")
              );
            }}
            name="State"
            className="form-control"
          >
            <option value="" selected disabled>
              {t("Select State")}
            </option>
            {states?.map((item) => (
              <option data-key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <p style={{ height: 0 }} className="text-danger">
          {formError.State}
        </p>
      </div>
    );
  }
  function getCityByStateId(stateId) {
    axios
      .get(`https://localhost:7072/api/City/${stateId}/GetCityByStateId`)
      .then((d) => {
        console.log(d.data);
        setCities(d.data);
      });
  }
  function renderCities() {
    return (
      <div className="form-group row  mt-3">
        <div className="text-primary col-lg-4">
          <label>{t("City")}:</label>
        </div>
        <div className="col-lg-5">
          <select
            style={{ height: 46 }}
            id="city"
            onChange={(e) => {
              changeHandler(e);
              const selectedIndex = e.target.options.selectedIndex;
              // e.target.options[selectedIndex].getAttribute("data-key")
            }}
            name="City"
            className="form-control"
          >
            <option value="" selected disabled>
              {t("Select City")}
            </option>
            {cities?.map((item) => (
              <option data-key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <p style={{ height: 0 }} className="text-danger">
          {formError.City}
        </p>
      </div>
    );
  }

  function getUserTypes() {
    axios.get("https://localhost:7072/api/UserType").then((d) => {
      console.log(d);
      setUserTypes(d.data);
    });
  }
  const changeHandler = (e) => {
    console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleUserTypeChange = (e) => {
    console.log(e);
    console.log("value", e.target.value);
    const selectedIndex = e.target.options.selectedIndex;
    console.log(e.target.options[selectedIndex].getAttribute("data-key"));
    // e.target.getAttribute('key');
    // console.log("customAtrribute:", customAtrribute);
  };
  function renderUserTypes() {
    if (sessionStorage.getItem("role") === "Admin User") {
      return (
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("User Type")}:</label>
          </div>
          <div className="col-lg-5">
            <select
              style={{ height: 50 }}
              id="userType"
              onChange={changeHandler}
              name="UserType"
              className="form-control"
            >
              <option value="" selected disabled>
                {t("Select User Type")}
              </option>
              {userTypes?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.userTypeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }
  }
  function onUpdateClick() {
    let error = false;
    let errors = {
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
      City: "",
      State: "",
      Country: "",
    };
    // console.log("error aa gya")
    if (form.FirstName.trim().length == 0 || form.FirstName == null) {
      error = true;
      errors = { ...errors, FirstName: "Pls Enter First Name" };
    }
    if (form.UserName.trim().length == 0 || form.UserName == null) {
      error = true;
      errors = { ...errors, UserName: "Pls Enter User Name" };
    }
    if (form.Password.trim().length == 0 || form.Password == null) {
      error = true;
      errors = { ...errors, Password: "Pls Enter Password" };
    }
    if (form.Email.trim().length == 0 || form.Email == null) {
      error = true;
      errors = { ...errors, Email: "Pls Enter Email" };
    }
    if (form.AddressLine1.trim().length == 0 || form.AddressLine1 == null) {
      error = true;
      errors = { ...errors, AddressLine1: "Pls Enter Address" };
    }
    // if (form.AddressLine2.trim().length == 0 || form.AddressLine2 == null) {
    //   error = true;
    //   errors = { ...errors, AddressLine2: "Pls Enter Email" };
    // }
    if (form.PostalCode.trim().length == 0 || form.PostalCode == null) {
      error = true;
      errors = { ...errors, PostalCode: "Pls Enter Postal Code" };
    }
    if (form.Country.trim().length == 0 || form.Country == null) {
      error = true;
      errors = { ...errors, PostalCode: "Pls Select Country" };
    }
    if (form.State.trim().length == 0 || form.State == null) {
      error = true;
      errors = { ...errors, State: "Pls Select State" };
    }
    if (form.City.trim().length == 0 || form.City == null) {
      error = true;
      errors = { ...errors, City: "Pls Select City" };
    }
    if (error) setFormError(errors);
    else {
      setFormError(errors);
      submitForm();
    }
  }
  return (
    <div>
      <Header />
      <div className="col-lg-9">
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("First Name")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              name="FirstName"
              onChange={changeHandler}
              className="form-control "
            />
          </div>
          <p style={{ height: 0 }} className="text-danger">
            {formError.FirstName}
          </p>
        </div>
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("Last Name")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              name="LastName"
              onChange={changeHandler}
              className="form-control "
            />
          </div>
        </div>
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("User Name")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              name="UserName"
              onChange={changeHandler}
              className="form-control "
            />
          </div>
          <p style={{ height: 0 }} className="text-danger">
            {formError.UserName}
          </p>
        </div>
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("Email")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              name="Email"
              onChange={changeHandler}
              className="form-control "
            />
          </div>
          <p style={{ height: 0 }} className="text-danger">
            {formError.Email}
          </p>
          <p className="m-2">{renderEmailError()}</p>
        </div>
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("User Image")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="file"
              onChange={(e) => {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onload = function () {
                  // reader.result.split(",")[1];
                  
                  setForm({ ...form, UserImage: reader.result.split(",")[1] });
                  console.log("reader result:", reader.result.split(",")[1]);
                };
                reader.readAsDataURL(file);
                console.log(reader);
              }}
              className="form-control "
            />
          </div>
        </div>

        <div>{renderUserTypes()}</div>
        <div>{renderCountries()}</div>
        <div>{renderStates()}</div>
        <div>{renderCities()}</div>
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("Address Line 1")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              name="AddressLine1"
              onChange={changeHandler}
              className="form-control "
            />
          </div>
          <p style={{ height: 0 }} className="text-danger">
            {formError.AddressLine1}
          </p>
        </div>
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("Address Line 2")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              name="AddressLine2"
              onChange={changeHandler}
              className="form-control "
            />
          </div>
        </div>
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("Postal Code")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="text"
              name="PostalCode"
              onChange={changeHandler}
              className="form-control "
            />
          </div>
          <p className="text-danger">{formError.PostalCode}</p>
        </div>
        <div className="form-group row  mt-3">
          <div className="text-primary col-lg-4">
            <label>{t("Password")}:</label>
          </div>
          <div className="col-lg-5">
            <input
              type="password"
              name="Password"
              onChange={changeHandler}
              className="form-control "
            />
          </div>
          <p style={{ height: 0 }} className="text-danger">
            {formError.Password}
          </p>
        </div>
        <div>
          {/* <button
            className="text-primary"
            onClick={() => {
              console.log(form);
              submitForm();
            }}
          >
            Register
          </button> */}
          <div className="form-group row  mt-3">
            <div className="text-primary col-lg-4">
              {/* <label>Password:</label> */}
            </div>
            <div className="col-lg-5">
              <button
                style={{ width: 500 }}
                onClick={() => {
                  // console.log(form);
                  // submitForm();
                  onUpdateClick();
                }}
                className="button-17 form-control"
                role="button"
              >
                {t("Register")}
              </button>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default Register;
