import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import "./AdminProfile.css";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { error } from "jquery";
import axios from "axios";

function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const schema = yup.object().shape({
    currentPassword: yup.string().required("Current Password Is Required"),
    newPassword: yup
      .string()
      .required("Please Enter New Password")
      .test(
        "password-match",
        "Current Password and New Password must not match",
        function (value) {
          return this.parent.currentPassword !== value;
        }
      ),
    confirmPassword: yup
      .string()
      .required("Please Enter Confirm Password")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.newPassword === value;
      }),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(passwordData, { abortEarly: false }).then((d) => {
        setErrors({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      });
      await axios
        .put(
          "https://localhost:7072/api/Profile/" + sessionStorage.getItem("id"),
          passwordData
        )
        .then((d) => {
          Swal.fire({
            title: "Password Successfuly changed",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire({
            title: `${err.response.data.messageParam}`,
            icon: "error",
          });
        });
    } catch (error) {
      const validationErrors = {};
      console.log(typeof error.inner);
      console.log(error.inner);
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      // console.log(validationErrors);
      setErrors(validationErrors);
    }
  };

  const changePasswordHandler = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header1 />
      <form onSubmit={onSubmit}>
        <h2 className="text-center mt-2">Change Password</h2>
        <div className="center margin">
          <div className="card" style={{ width: 700 }}>
            <div className="body ">
              <div className="center1">
                <div
                  className="form-group row col-lg-10 mt-2"
                  style={{ marginLeft: 12 }}
                >
                  <div className="col-lg-4">
                    <label htmlFor="currentPassword">Current Password: </label>
                  </div>
                  <div className="col-lg-6 ">
                    <input
                      name="currentPassword"
                      id="currentPassword"
                      onChange={changePasswordHandler}
                      style={{ borderRadius: 12, marginLeft: 91, width: 352 }}
                      className="form-control shadow"
                    />
                    {errors.currentPassword && (
                      <h6 className="text-center text-danger" style={{ marginTop: "5px",width:200,marginLeft:100 }}>
                        {errors.currentPassword}
                      </h6>
                    )}
                  </div>
                </div>
                <div
                  className="form-group row col-lg-10 mt-2 "
                  style={{ marginLeft: 12 }}
                >
                  <div className="col-lg-4">
                    <label htmlFor="newPassword">New Password: </label>
                  </div>
                  <div className="col-lg-6 ">
                    <input
                      name="newPassword"
                      id="newPassword"
                      onChange={changePasswordHandler}
                      style={{ borderRadius: 12, marginLeft: 91, width: 352 }}
                      className="form-control shadow"
                    />
                    {errors.newPassword && (
                      <h6
                        className="text-center text-danger"
                        style={{ margin: "18px 0px -7px 34px", width: 455 }}
                      >
                        {errors.newPassword}
                      </h6>
                    )}
                  </div>
                </div>
                <div
                  className="form-group row col-lg-10 mt-2 "
                  style={{ marginLeft: 12 }}
                >
                  <div className="col-lg-4">
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                  </div>
                  <div className="col-lg-6 ">
                    <input
                      name="confirmPassword"
                      id="confirmPassword"
                      onChange={changePasswordHandler}
                      style={{ borderRadius: 12, marginLeft: 91, width: 352 }}
                      className="form-control shadow"
                    />
                    {errors.confirmPassword && (
                      <h6
                        className="text-center text-danger"
                        style={{ marginLeft: 100, width: 288, marginTop: 21 }}
                      >
                        {errors.confirmPassword}
                      </h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="center">
          <button
            type="submit"
            style={{
              width: "35%",
              backgroundColor: "#f3f3f3",
              borderRadius: 30,
              boxShadow: "4px 4px 8px 4px rgba(0, 0, 0, 0.2)",
            }}
            className="form-control  col-6"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
export default ChangePassword;
