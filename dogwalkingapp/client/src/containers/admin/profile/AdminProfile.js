import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import "./AdminProfile.css";
import { CgEnter } from "react-icons/cg";
import ROUTES from "../../../navigations/Routes";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";
function AdminProfile() {
  const [adminData, setAdminData] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    getAdminDetails();
  }, []);
  const setPhoneNumber = (e) => {
    setShowUpdateButton(true)
    console.log(e);
    setAdminData({ ...adminData, phoneNumber: e });
  };
  const getAdminDetails = async () => {
    try {
      await axios
        .get(
          "https://localhost:7072/api/Profile/" + sessionStorage.getItem("id")
        )
        .then((d) => {
          console.log(d.data);
          setAdminData(d.data);
        })
        .catch((err) => {});
    } catch (error) {}
  };
  const changeChangePasswordButton = () => {
    navigate(ROUTES.adminChangePassword.name + "?id=" + adminData.id);
  };
  const changeHandler = (e) => {
    setShowUpdateButton(true);
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  const updateAdminData = async () => {
    try {
      await axios
        .put(
          "https://localhost:7072/api/Profile/" +
            sessionStorage.getItem("id") +
            "/updateAdminProfile",
          adminData
        )
        .then((d) => {
          console.log(d.data);
        });
    } catch (error) {}
  };
  if (sessionStorage.getItem("role") == "Admin User") {
    return (
      <div>
        <Header1 />
        <h1 className="text-center mt-4"> {t("Admin Profile Management")}</h1>
        {adminData && (
          <div className="center">
            <div className="card">
              <img
                style={{ boxShadow: "4px 4px 8px 4px rgba(0, 0, 0, 0.2)" }}
                src={`data:image/png;base64,${adminData.userImage}`}
                width={600}
              />
              <div className="body">
                <h2 className="mt-5 text-center hover">{`${adminData.firstName} ${adminData.lastName}`}</h2>
                <div className="form-group row mt-3 center">
                  <label className="col-lg-4 h4 p-3" htmlFor="firstName">
                    {t("First Name")}
                  </label>
                  <div className="col-lg-5 p-3">
                    <input
                      name="firstName"
                      onChange={changeHandler}
                      style={{ width: 250 }}
                      id="firstName"
                      value={adminData.firstName}
                      disabled={disabled}
                      className="form-control text-center"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3 center">
                  <label className="col-lg-4 h4 p-3" htmlFor="lastName">
                    {t("Last Name")}
                  </label>
                  <div className="col-lg-5 p-3">
                    <input
                      name="lastName"
                      onChange={changeHandler}
                      id="lastName"
                      style={{ width: 250 }}
                      value={adminData.lastName}
                      disabled={disabled}
                      className="form-control text-center"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3 center">
                  <label className="col-lg-4 h4 p-3" htmlFor="addressLine1">
                    {t("Address Line 1")}:
                  </label>
                  <div className="col-lg-5 p-3">
                    <input
                      name="addressLine1"
                      onChange={changeHandler}
                      id="addressLine1"
                      style={{ width: 250 }}
                      value={adminData.addressLine1}
                      disabled={disabled}
                      className="form-control text-center"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3 center">
                  <label className="col-lg-4 h4 p-3" htmlFor="addressLine2">
                    {t("Address Line 2")}:
                  </label>
                  <div className="col-lg-5 p-3">
                    <input
                      onChange={changeHandler}
                      name="addressLine2"
                      id="addressLine2"
                      style={{ width: 250 }}
                      value={adminData.addressLine2}
                      disabled={disabled}
                      className="form-control text-center"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3 center">
                  <label className="col-lg-4 h4 p-3" htmlFor="email">
                    {t("Email")}
                  </label>
                  <div className="col-lg-5 p-3">
                    <input
                      onChange={changeHandler}
                      name="email"
                      id="email"
                      style={{ width: 250 }}
                      value={adminData.email}
                      disabled={disabled}
                      className="form-control text-center"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3 center">
                  <label className="col-lg-4 h4 p-3" htmlFor="phoneNumber">
                    {t("Phone Number")}
                  </label>
                  <div className="col-lg-5 p-3">
                    {/* <input
                      onChange={changeHandler}
                      name="phoneNumber"
                      id="phoneNumber"
                      style={{ width: 250 }}
                      value={empData.phoneNumber}
                      disabled={disabled}
                      className="form-control text-center"
                    /> */}
                    <PhoneInput
                      value={adminData.phoneNumber}
                      onChange={setPhoneNumber}
                    />
                  </div>
                </div>
                <div className="center mb-3">
                  {!showUpdateButton && (
                    <>
                      <button
                        onClick={changeChangePasswordButton}
                        style={{ width: 200 }}
                        className="form-control button1"
                      >
                        {t("Change Password")}
                      </button>{" "}
                      &nbsp;
                      <button
                        onClick={() => {
                          setDisabled(false);
                        }}
                        style={{ width: 200 }}
                        className="form-control button1"
                      >
                        {t("Edit")}
                      </button>
                    </>
                  )}
                  {showUpdateButton && (
                    <>
                      <button
                        onClick={changeChangePasswordButton}
                        style={{ width: 200 }}
                        className="form-control button1"
                      >
                        Change Password
                      </button>{" "}
                      &nbsp;
                      <button
                        onClick={() => {
                          setDisabled(false);
                        }}
                        style={{ width: 200 }}
                        className="form-control button1"
                      >
                        Edit
                      </button>
                      &nbsp;
                      <button
                        onClick={updateAdminData}
                        style={{ width: 200 }}
                        className="form-control button1"
                      >
                        Update
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <br></br>
      </div>
    );
  }
  if (sessionStorage.getItem("role") != "Admin User") {
    return (
      <>
        <h1 className="text-center card mx-auto " style={{ marginTop: "16%" }}>
          You Are Not Authorized to View This Content If You Are Admin Please
          Login to View This Content
        </h1>
        <br></br>
        <br></br>
        <button
          onClick={() => {
            navigate(ROUTES.home.name);
          }}
          style={{
            width: 600,
          }}
          className="button1 form-control mx-auto"
        >
          Go Back To Home
        </button>
      </>
    );
  }
}

export default AdminProfile;
