import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaHistory } from "react-icons/fa";
import $ from "jquery";
import ROUTES from "../../../navigations/Routes";
import { useTranslation } from "react-i18next";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import Header1 from "../../../components/Header1";
function EmpManag() {
  const [jj, setJJ] = useState(true);
  const [employees, setEmployees] = useState([]);
  // const tableRef = useRef();
  useEffect(() => {
    getAllEmployeeUsers();
  }, [jj]);
  useEffect(() => {
    if (employees?.length > 0) {
      if (localStorage.getItem("lang") === "en") {
        $("#table").DataTable({ scrollX: true });
      } else if (localStorage.getItem("lang") === "fr") {
        $("#table").DataTable({
          language: {
            sEmptyTable: "Aucune donnée disponible dans le tableau",
            sInfo:
              "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
            sInfoEmpty: "Affichage de l'élément 0 à 0 sur 0 élément",
            sInfoFiltered: "(filtré à partir de _MAX_ éléments au total)",
            sInfoPostFix: "",
            sInfoThousands: ",",
            sLengthMenu: "Afficher _MENU_ éléments",
            sLoadingRecords: "Chargement...",
            sProcessing: "Traitement...",
            sSearch: "Rechercher :",
            sZeroRecords: "Aucun élément correspondant trouvé",
            oPaginate: {
              sFirst: "Premier",
              sLast: "Dernier",
              sNext: "Suivant",
              sPrevious: "Précédent",
            },
            oAria: {
              sSortAscending:
                ": activer pour trier la colonne par ordre croissant",
              sSortDescending:
                ": activer pour trier la colonne par ordre décroissant",
            },
            select: {
              rows: {
                _: "%d lignes sélectionnées",
                0: "Aucune ligne sélectionnée",
                1: "1 ligne sélectionnée",
              },
            },
          },
          scrollX: true,
        });
      } else if (localStorage.getItem("lang") === "hi") {
        $("#table").DataTable({
          language: {
            sProcessing: "प्रगति पे हैं ...",
            sLengthMenu: " _MENU_ प्रविष्टियां दिखाएं ",
            sZeroRecords: "रिकॉर्ड्स का मेल नहीं मिला",
            sInfo: "_START_ to _END_ of _TOTAL_ प्रविष्टियां दिखा रहे हैं",
            sInfoEmpty: "0 में से 0 से 0 प्रविष्टियां दिखा रहे हैं",
            sInfoFiltered: "(_MAX_ कुल प्रविष्टियों में से छठा हुआ)",
            sInfoPostFix: "",
            sSearch: "खोजें:",
            sUrl: "",
            oPaginate: {
              sFirst: "प्रथम",
              sPrevious: "पिछला",
              sNext: "अगला",
              sLast: "अंतिम",
            },
          },
          scrollX: true,
        });
      } else if (localStorage.getItem("lang") === "pu") {
        $("#table").DataTable({
          language: {
            sEmptyTable: "ਸੂਚੀ ਵਿੱਚ ਕੋਈ ਕਤਾਰ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
            sInfo: "_TOTAL_ ਵਿੱਚੋਂ _START_ ਤੋਂ _END_ ਐਂਟਰੀਆਂ ਦਿੱਖ ਰਹੀਆਂ ਹਨ",
            sInfoEmpty: "0 ਵਿੱਚੋਂ 0 ਤੋਂ 0 ਕਤਾਰਾਂ ਦਿੱਖ ਰਹੀਆਂ ਹਨ",
            sInfoFiltered: "(ਕੁੱਲ _MAX_ ਵਿਚੋਂ ਛਾਂਟੀਆਂ ਗਈਆਂ ਕਤਾਰਾਂ)",
            sInfoPostFix: "",
            sInfoThousands: ",",
            sLengthMenu: "ਕੁੱਲ _MENU_ ਕਤਾਰਾਂ",
            sLoadingRecords: "ਸੂਚੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
            sProcessing: "ਕਾਰਵਾਈ ਚੱਲ ਰਹੀ ਹੈ...",
            sSearch: "ਖੋਜ ਕਰੋ:",
            sZeroRecords: "ਕੋਈ ਕਤਾਰ ਨਹੀਂ ਮਿਲੀ",
            oPaginate: {
              sFirst: "ਪਹਿਲਾ",
              sLast: "ਅਖੀਰਲਾ",
              sNext: "ਅਗਲਾ",
              sPrevious: "ਪਿਛਲਾ",
            },
            oAria: {
              sSortAscending: ": ਕਾਲਮ ਨੂੰ ਵੱਧਦੇ ਕ੍ਰਮ ਵਿਚ ਵੇਖੋ",
              sSortDescending: ": ਕਾਲਮ ਨੂੰ ਘਟਦੇ ਕ੍ਰਮ ਵਿਚ ਵੇਖੋ",
            },
          },
          scrollX: true,
        });
      }
    }
  }, [employees]);
  useEffect(() => {}, []);
  const { t, i18n } = useTranslation();
  const [langLoaded, setLangLoaded] = useState(false);
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && !langLoaded) {
      i18n.changeLanguage(storedLang);
      setLangLoaded(true); // Set language loaded to true to avoid re-render loop
    }
  }, [i18n, langLoaded]);
  const [updUserId, setUserId] = useState(null);

  function getAllEmployeeUsers() {
    axios
      .get("https://localhost:7072/api/Users/GetEmployeeUsers", {
        headers: {
          Authorization: `Bearer  ${sessionStorage.getItem("token")}`,
        },
      })
      .then((d) => {
        setEmployees(d.data);
        console.log(d.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function deleteEmployeeUser(EmployeeId) {
    console.log(EmployeeId);
    axios.delete("https://localhost:7072/api/Users/" + EmployeeId).then((D) => {
      console.log("data deleted successfuly");
      window.location.reload();
      if (jj === true) {
        setJJ(false);
      } else {
        setJJ(true);
      }
    });
  }
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const changeHandler = (e) => {
    console.log(e);
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  function updateApi() {
    console.log(user);
    axios
      .put("https://localhost:7072/api/Users/" + updUserId, user, {
        headers: {
          Authorization: `Bearer  ${sessionStorage.getItem("token")}`,
        },
      })
      .then((d) => {
        console.log(d.data);
        window.location.reload();

        // if (jj == true) {
        //   setJJ(false);
        // } else {
        //   setJJ(true);
        // }
      });
  }
  function renderModal() {
    if (user != null) {
      return (
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5
                  style={{ position: "absolute", left: 85 }}
                  class="modal-title"
                  id="exampleModalLabel"
                >
                  {t("Employee Information Update")}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="modal-body">
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">{t("First Name")}:</label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        className="form-control"
                        onChange={changeHandler}
                        type="text"
                        name="firstName"
                        value={user.firstName}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">{t("Last Name")}:</label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        onChange={changeHandler}
                        className="form-control"
                        name="lastName"
                        type="text"
                        value={user.lastName}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">{t("User Name")}:</label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        onChange={changeHandler}
                        className="form-control"
                        name="username"
                        type="text"
                        value={user.username}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">{t("Email")}:</label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        onChange={changeHandler}
                        name="email"
                        className="form-control"
                        type="text"
                        value={user.email}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">
                        {t("Address Line 1")}:
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        name="addressLine1"
                        onChange={changeHandler}
                        className="form-control"
                        type="text"
                        value={user.addressLine1}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">
                        {t("Address Line 2")}:
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        onChange={changeHandler}
                        name="addressLine2"
                        className="form-control"
                        type="text"
                        value={user.addressLine2}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">
                        {t("Postal Code")}:
                      </label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        onChange={changeHandler}
                        name="postalCode"
                        className="form-control"
                        type="text"
                        value={user.postalCode}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">{t("Country")}:</label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        onChange={changeHandler}
                        name="country"
                        className="form-control"
                        type="text"
                        value={user.country}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">{t("State")}:</label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        onChange={changeHandler}
                        name="state"
                        className="form-control"
                        type="text"
                        value={user.state}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-4">
                      <label className="text-primary">{t("City")}:</label>
                    </div>
                    <div className="col-lg-8">
                      <input
                        onChange={changeHandler}
                        name="city"
                        className="form-control"
                        type="text"
                        value={user.city}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  {t("Close")}
                </button>
                <button
                  onClick={() => {
                    updateApi();
                  }}
                  data-dismiss="modal"
                  type="button"
                  class="btn btn-primary"
                >
                  {t("Update")}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  function fetchUserData(data) {
    setUser(data);
    console.log(data);
  }
  function renderTable() {
    return employees.map((items) => {
      return (
        <tr>
          <td>{items.id}</td>
          <td>{items.firstName}</td>
          <td>{items.lastName}</td>
          <td>{items.email}</td>
          <td>
            <button
              onClick={() => {
                navigate(
                  ROUTES.empHistory.name +
                    "?id=" +
                    items.id +
                    "&name=" +
                    items.firstName +
                    " " +
                    items.lastName
                );
              }}
              className="btn btn-primary"
            >
              <FaHistory />
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteEmployeeUser(items.id);
              }}
            >
              <FaTrash />
              {/* Delete User */}
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-warning"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                fetchUserData(items);
                setUserId(items.id);
              }}
            >
              <FaEdit />
            </button>
          </td>
        </tr>
      );
    });
  }
  // eslint-disable-next-line no-lone-blocks
  {
    if (sessionStorage.getItem("role") === "Admin User") {
      return (
        <div>
          <Header1 />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: 30,
              marginTop: 30,
            }}
          >
            <h2 style={{ fontWeight: "lighter" }}>
              {t("Employee Information")}
            </h2>
            <div>
              <button
                style={{ height: "auto" }}
                className="text-primary form-control"
                onClick={() => {
                  navigate(ROUTES.registerPage2.name);
                }}
              >
                <FaPlus />
                &nbsp; {t("Add Employee User")}
              </button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="card55" style={{ padding: 30 }}>
              <table
                id="table"
                className="table table-bordered table-hover table-striped "
              >
                <thead>
                  <tr>
                    <th style={{textAlign:"center"}}>{t("Employee Id")}</th>
                    <th style={{textAlign:"center"}}>{t("First Name")}</th>
                    <th style={{textAlign:"center"}}>{t("Last Name")}</th>
                    <th style={{textAlign:"center"}}>{t("Email")}</th>
                    <th style={{textAlign:"center"}}>{t(" History")}</th>
                    <th style={{textAlign:"center"}}>{t("Delete")}</th>
                    <th>{t("Edit User")}</th>
                  </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
              </table>
            </div>
          </div>
          <dliv>{renderModal()}</dliv>
        </div>
      );
    }
  }

  // eslint-disable-next-line no-lone-blocks
  {
    if (sessionStorage.getItem("role") !== "Admin User") {
      navigate(ROUTES.NotAuthorized.name);
    }
  }
}

export default EmpManag;
