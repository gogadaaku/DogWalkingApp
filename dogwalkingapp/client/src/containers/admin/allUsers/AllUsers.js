import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import axios, { all } from "axios";
import { useTranslation } from "react-i18next";
import { FaPlus, FaEdit, FaTrash, FaHistory } from "react-icons/fa";
import ROUTES from "../../../navigations/Routes";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import $ from "jquery";
import Header1 from "../../../components/Header1";
import "./AllUsers.css";
import { useNavigate } from "react-router-dom";
import image from "../../../images/brown-dog-sitting-with-tongue-out-removebg-preview.png";
function AllUsers() {
  const navigate = useNavigate();
  const [jj, setJJ] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const { t } = useTranslation();
  useLayoutEffect(() => {
    fetchAllUsers();
  }, []);
  useEffect(() => {
    if (allUsers.length > 0) {
      $("#table").DataTable();
    }
  }, []);
  const fetchAllUsers = async () => {
    await axios
      .get("https://localhost:7072/api/Users", {
        headers: {
          Authorization: `Bearer  ${sessionStorage.getItem("token")}`,
        },
      })
      .then((d) => {
        setAllUsers(d.data);
        console.log(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const renderTable = () => {
    const filteredUsers = allUsers?.filter((items) => {
      return items.userType !== "Admin User";
    });
    return filteredUsers?.map((items) => {
      return (
        <tr>
          <td>{items.id}</td>
          <td>{items.firstName}</td>
          <td>{items.lastName}</td>
          <td>{items.email}</td>
          <td>{items.userType}</td>
          <td>
            <button
              onClick={() => {
                navigate(ROUTES.viewUserDetailAdmin.name+"?id="+items.id);
              }}
              style={{ backgroundColor: "black" }}
              className="btn btn-success"
            >
              {t("View Detail")}
            </button>
          </td>
          <td className="center">
            {items.userLockedUnlocked == false ? (
              <button
                style={{ backgroundColor: "darkslategrey" }}
                onClick={() => {
                  lockUnlock(items);
                }}
                className="btn btn-danger"
              >
                {t("Lock")}
              </button>
            ) : (
              <button
                onClick={() => {
                  lockUnlock(items);
                }}
                className="btn btn-success"
              >
                {t("Unlock")}
              </button>
            )}
          </td>
        </tr>
      );
    });
  };
  function lockUnlock(user) {
    axios
      .get(`https://localhost:7072/api/Users/${user.id}/hello`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((d) => {
        if (jj) {
          setJJ(false);
        } else {
          setJJ(true);
        }
        console.log(d);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  {
    if (sessionStorage.getItem("role") === "Admin User") {
      return (
        <div>
          <Header1 />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            <h1 style={{ fontWeight: "lighter" }}>{t("All Users")}</h1>{" "}
            <button
              onClick={() => {
                navigate(ROUTES.registerPage2.name);
              }}
              className="btn btn-info"
              style={{
                height: "45px",
                width: "150px",
                backgroundColor: "darkgoldenrod",
              }}
            >
              <FaPlus /> Add User
            </button>
          </div>
          <div className="divstyleadmin">
            <div className="card11">
              <div className="m-4">
                <table
                  id="table"
                  className="table table-striped table-hover table-bordered "
                >
                  <thead>
                    <tr>
                      <th>{t("User Id")}</th>
                      <th>{t("First Name")}</th>
                      <th>{t("Last Name")}</th>
                      <th>{t("Email")}</th>
                      <th>{t("User Type")}</th>
                      <th>{t("View Details")}</th>

                      <th>{t("Lock/Unlock User")}</th>
                    </tr>
                  </thead>
                  <tbody>{allUsers && renderTable()}</tbody>
                </table>
              </div>
            </div>
          </div>
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
              {t("You Are Not Authorized To View This Content Please Login If You Are Admin To View This Content")}
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
              {t("Go To Home Page")}
            </button>
          </div>
        </>
      );
    }
  }
}

export default AllUsers;
