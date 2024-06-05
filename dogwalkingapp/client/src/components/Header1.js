import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../navigations/Routes";
import "./Header.css";
import dog from "../images/brown-dog-sitting-with-tongue-out-removebg-preview.png";
function Header1() {
  //use translation hook for translating
  const { t, i18n } = useTranslation();
  //Deals with langugage change
  const changeLanguage = (e) => {
    let lang = "";
    lang = e;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  //A variable for comparing session stored language so that we can set the language
  const [langLoaded, setLangLoaded] = useState(false);
  //To get stored langugae from session storage and change page'language accordingly
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && !langLoaded) {
      i18n.changeLanguage(storedLang);
      setLangLoaded(true);
    }
  }, []);
  //For setting and getting roles
  const [roles, setRoles] = useState(null);
  //For checking Loging & Logout
  const checkLoginLogout = () => {
    const role = sessionStorage.getItem("role");
    setRoles(role);
  };
  //Use navigate hook for navigation without reloads
  const navigate = useNavigate();
  //TO check wether user is logged in or logged out at initial render
  useEffect(() => {
    checkLoginLogout();
  }, []);
  //For logging out user
  function handleLogout() {
    sessionStorage.clear();
    navigate(ROUTES.login4.name);
    window.location.reload();
  }
  // useEffect(() => {}, []);
  //For changing language
  function renderLanguageDropdown() {
    return (
      <div>
        <select onChange={changeLanguage}>
          <option value="" selected disabled>
            {t("Select Language")}
          </option>
          <option value="en">{t("English")}</option>
          <option value="fr">{t("French")}</option>
          <option value="hi">{t("Hindi")}</option>
          <option value="pu">{t("Punjabi")}</option>
        </select>
      </div>
    );
  }
  //Used for rendering Login and Logout Button
  function renderLoginLogoutButton() {
    return (
      <div>
        {roles == null ? (
          <Link class="button-86" role="button" to={ROUTES.login1.name}>
            {t("Login")}
          </Link>
        ) : (
          <Link class="button-86" role="button" onClick={handleLogout}>
            {t("Logout")}
          </Link>
        )}
      </div>
    );
  }
  // function changeHandler(e) {
  //   console.log(e);
  //   navigate(e.target.value);
  // }
  // function renderRegisterButton() {
  //   if (sessionStorage.getItem("role") == null)
  //     return (
  //       <div>
  //         <Link
  //           style={{ marginRight: 50 }}
  //           class="button-49 "
  //           role="button"
  //           to={ROUTES.register1.name}
  //         >
  //           {t("Register")}
  //         </Link>
  //       </div>
  //     );
  // }
  //Used to render History navbar item
  function renderHistory() {
    if (sessionStorage.getItem("role") == "Admin User") {
      return (
        <Link className=" active" to={ROUTES.bookingHistory.name}>
          {t("BookingHistory")}
        </Link>
      );
    }
  }
  // function renderAllUsers() {
  //   if (sessionStorage.getItem("role") == "Admin User") {
  //     return (
  //       <Link className=" active" to={ROUTES.allusers.name}>
  //         {t("All Users")}
  //       </Link>
  //     );
  //   }
  // }
  return (
    <div>
      <nav
        style={{ height: 104 }}
        class="navbar navbar-expand-lg navbar-dark bg-light"
      >
        <div class="collapse navbar-collapse" id="navbarColor01">
          <li class="nav-item active">
            <img
              onClick={() => {
                navigate(ROUTES.home.name);
              }}
              style={{ display: "flex", width: 116, height: 109 }}
              // src="../brown-dog-sitting-with-tongue-out.jpg"
              src={dog}
            />
          </li>
          <ul class="navbar-nav mr-auto">
            <>
              <li class="nav-item active">
                <Link className=" active " to={ROUTES.about.name}>
                  {t("About")}
                </Link>
              </li>
              <li class="nav-item">
                <Link className=" active " to={ROUTES.contact1.name}>
                  {t("Contact")}
                </Link>
              </li>
              {/* <li class="nav-item">
                <Link className=" active " to={ROUTES.support.name}>
                  {t("Support")}
                </Link>
              </li> */}
              {sessionStorage.getItem("role") === "Employee User" ? (
                <li className="nav-item">
                  <Link className=" active " to={ROUTES.myBookingEmp.name}>
                    {t("My Bookings")}
                  </Link>
                </li>
              ) : null}
              {/* {sessionStorage.getItem("role") === "Admin User" ? (
                <li class="nav-item">
                  <Link className=" active " to={ROUTES.allusers.name}>
                    {t("All Users")}
                  </Link>
                </li>
              ) : null} */}
              {sessionStorage.getItem("role") === "Client User" ? (
                <li class="nav-item">
                  <Link className=" active " to={ROUTES.regPet.name}>
                    {t("Register Dog")}
                  </Link>
                </li>
              ) : null}

              {sessionStorage.getItem("role") === "Client User" ? (
                <li class="nav-item">
                  {" "}
                  <Link className=" active " to={ROUTES.clientPets.name}>
                    {t("My Dogs")}
                  </Link>
                </li>
              ) : null}
              {sessionStorage.getItem("role") === "Client User" ? (
                <li class="nav-item">
                  {" "}
                  <Link className=" active " to={ROUTES.clientMyBooking1.name}>
                    {t("My Bookings")}
                  </Link>
                </li>
              ) : null}
              {/* {sessionStorage.getItem("role") === "Admin User" ? (
                <li class="nav-item">
                  <Link className=" active " to={ROUTES.adminManagement.name}>
                    {t("Add Breeds")}
                  </Link>
                </li>
              ) : null} */}
              {sessionStorage.getItem("role") === "Admin User" ? (
                <li class="nav-item">
                  <Link className=" active " to={ROUTES.contactAdmin.name}>
                    {t("Contact Queries")}
                  </Link>
                </li>
              ) : null}
              {sessionStorage.getItem("role") === "Client User" ? (
                <li class="nav-item">
                  {" "}
                  <Link className=" active " to={ROUTES.clientBooking.name}>
                    {t("Book Walk")}
                  </Link>
                </li>
              ) : null}
              {sessionStorage.getItem("role") === "Admin User" ? (
                <li class="nav-item">
                  {" "}
                  <Link className=" active " to={ROUTES.adminProfile.name}>
                    {t("My Profile")}
                  </Link>
                </li>
              ) : null}
              {sessionStorage.getItem("role") === "Employee User" ? (
                <li class="nav-item">
                  {" "}
                  <Link className=" active " to={ROUTES.managProfEmp.name}>
                    {t("My Profile")}
                  </Link>
                </li>
              ) : null}
              <li class="nav-item">{<div>{renderHistory()}</div>}</li>
              {sessionStorage.getItem("role") == "Admin User" ? (
                <li class="nav-item dropdown">
                  <a
                    class=" dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {t("Management")}
                  </a>
                  <div class="dropdown-menu">
                    <Link class="dropdown-item " to={ROUTES.empMan.name}>
                      {t("Employee Management")}
                    </Link>
                    <Link class="dropdown-item" to={ROUTES.cliMan.name}>
                      {t("Client Management")}
                    </Link>
                    <Link className="dropdown-item " to={ROUTES.allusers.name}>
                      {t("All Users")}
                    </Link>
                  </div>
                </li>
              ) : null}
              <li class="nav-item dropdown">
                <a
                  class=" dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {t("Select Language")}
                </a>
                <div class="dropdown-menu">
                  <button
                    onClick={() => {
                      changeLanguage("en");
                    }}
                    class="dropdown-item"
                  >
                    {t("English")}
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("hi");
                    }}
                    class="dropdown-item"
                  >
                    {t("Hindi")}
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("pu");
                    }}
                    class="dropdown-item"
                  >
                    {t("Punjabi")}
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("fr");
                    }}
                    class="dropdown-item"
                  >
                    {t("French")}
                  </button>
                </div>
              </li>
              <li>
                <div id="google_translate_element"></div>
              </li>
            </>
          </ul>
          {sessionStorage.getItem("id") && (
            <h6
              style={{
                marginRight: "50px",
                color: "#006a80",
                marginTop: "11px",
                fontWeight: 400,
              }}
              className="welcome-message"
            >
              Welcome: {sessionStorage.getItem("email")}
            </h6>
          )}
          {sessionStorage.getItem("role") == null ? (
            <Link
              to={ROUTES.registerPage2.name}
              class="button-54 mr-4"
              role="button"
              type="submit"
              control-id="ControlID-2"
            >
              {t("Register")}
            </Link>
          ) : null}
          {sessionStorage.getItem("role") == null ? (
            <Link
              to={ROUTES.login4.name}
              class="button-54 mr-4"
              role="button"
              type="submit"
              control-id="ControlID-2"
            >
              {t("Login")}
            </Link>
          ) : (
            <Link
              onClick={handleLogout}
              class="button-54 mr-4"
              role="button"
              type="submit"
              control-id="ControlID-2"
            >
              {t("Logout")}
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header1;
