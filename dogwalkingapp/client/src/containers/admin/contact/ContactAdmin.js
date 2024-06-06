import React, { useState, useEffect } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import { useTranslation } from "react-i18next";

function ContactAdmin() {
  const { t, i18n } = useTranslation();
  const [queryData, setQueryData] = useState({
    data: [],
    isLoading: true,
    error: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Set language from session storage or default to 'en'
    const currentLang = sessionStorage.getItem("lang") || 'en';
    i18n.changeLanguage(currentLang);

    if (sessionStorage.getItem("role") === "Admin User") {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://localhost:7072/api/Contact");
          setQueryData({ data: response.data, isLoading: false, error: null });
        } catch (error) {
          setQueryData({ data: [], isLoading: false, error: error.message });
        }
      };
      fetchData();
    } else {
      navigate(ROUTES.NotAuthorized.name);
    }
  }, [navigate, i18n]);

  if (sessionStorage.getItem("role") === "Admin User") {
    return (
      <div>
        <Header1 />
        <h1 className="center" style={{ fontWeight: "lighter" }}>
          {t('Guest Queries')}
        </h1>
        <div className="query-container">
          {queryData.isLoading ? (
            <p>{t('Loading...')}</p>
          ) : queryData.error ? (
            <p>{t('Error')}: {queryData.error}</p>
          ) : (
            queryData.data.map((item, index) => (
              <div key={index} className="card">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>{t('Id')}</th>
                      <td>{item.id}</td>
                    </tr>
                    <tr>
                      <th>{t('Full Name')}</th>
                      <td>{item.fullName}</td>
                    </tr>
                    <tr>
                      <th>{t('Email')}</th>
                      <td>{item.email}</td>
                    </tr>
                    <tr>
                      <th>{t('Mobile Number')}</th>
                      <td>{item.mobileNumber}</td>
                    </tr>
                    <tr>
                      <th>{t('User Type')}</th>
                      <td>{item.userType}</td>
                    </tr>
                    <tr>
                      <th>{t('Comments')}</th>
                      <td>{item.comments}</td>
                    </tr>
                    {item.guestId && (
                      <tr>
                        <th>{t('Guest ID')}</th>
                        <td>{item.guestId}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ContactAdmin;
