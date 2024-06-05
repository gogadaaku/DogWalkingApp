import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header1 from '../../../components/Header1';
// import './ViewUserDetails.css'; // Ensure CSS is similar to AdminProfile.css
import ROUTES from '../../../navigations/Routes';
import image from"../../../images/brown-dog-sitting-with-tongue-out-removebg-preview.png"
function ViewUserDetails() {
  const [userData, setUserData] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const queryparams = useQuery();
  const id = queryparams.get("id");

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7072/api/Users/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  };

  const handleChange = (e) => {
    setShowUpdateButton(true);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateUserDetails = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      await axios.put(`https://localhost:7072/api/User/${userId}/updateUserProfile`, userData);
      alert('User details updated successfully!');
    } catch (error) {
      console.error('Failed to update user details', error);
    }
  };

  if (sessionStorage.getItem("role") === "Admin User") {
    return (
      <div>
        <Header1 />
        <h1 className="text-center mt-4">{t("User Details")}</h1>
        {userData && (
          <div className="center">
            <div className="card">
              <img
                style={{ boxShadow: "4px 4px 8px 4px rgba(0, 0, 0, 0.2)" }}
                src={`data:image/png;base64,${userData.userImage}`}
                width={600}
              />
              <div className="body">
                <h2 className="mt-5 text-center">{`${userData.firstName} ${userData.lastName}`}</h2>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="firstName">{t("First Name")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="lastName">{t("Last Name")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="email">{t("Email")}</label>
                  <div className="col-lg-8">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="phoneNumber">{t("Phone Number")}</label>
                  <div className="col-lg-8">
                    <input type='tel' value={userData.phoneNumber} onChange={handleChange} name="phoneNumber" className='form-control' disabled={disabled} />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="country">{t("Country")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={userData.country}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="state">{t("State")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      value={userData.state}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="city">{t("City")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={userData.city}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="addressLine1">{t("Address Line 1")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="addressLine1"
                      id="addressLine1"
                      value={userData.addressLine1}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="addressLine2">{t("Address Line 2")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="addressLine2"
                      id="addressLine2"
                      value={userData.addressLine2}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="postalCode">{t("Postal Code")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={userData.postalCode}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div>
                {/* <div className="form-group row mt-3">
                  <label className="col-lg-4" htmlFor="addressLine3">{t("Address Line 3")}</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="addressLine3"
                      id="addressLine3"
                      value={userData.addressLine3}
                      onChange={handleChange}
                      disabled={disabled}
                      className="form-control"
                    />
                  </div>
                </div> */}
                {/* <div className="center mt-3">
                  {!showUpdateButton && (
                    <button onClick={() => setDisabled(false)} className="btn btn-primary">
                      {t("Edit")}
                    </button>
                  )}
                  {showUpdateButton && (
                    <>
                      <button onClick={() => setDisabled(false)} className="btn btn-primary">
                        {t("Edit")}
                      </button>
                      &nbsp;
                      <button onClick={updateUserDetails} className="btn btn-success">
                        {t("Update")}
                      </button>
                    </>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
} else {
    return (
      <>
        <div
          style={{
            display: "inline-block",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img src={image} />
          <h1 style={{ fontWeight: "lighter" }}>
            You Are Not Authorized To View This Content Please Login If You
            Are Admin To View This Content
          </h1>
          <button
            onClick={() => {
              navigate(ROUTES.home.name);
            }}
            className="btn "
            style={{
              margin: "10px",
              backgroundColor: "#77533B",
              color: "burlywood",
            }}
          >
            Go To Home Page
          </button>
        </div>
      </>
    );
  }
}


export default ViewUserDetails;
