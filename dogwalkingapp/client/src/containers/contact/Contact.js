import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
function Contact() {
  const { t, i18n } = useTranslation();

  const [langLoaded, setLangLoaded] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    // console.log("sdfsd", typeof ());
    if (storedLang && !langLoaded) {
      i18n.changeLanguage(storedLang);
      setLangLoaded(true); // Set language loaded to true to avoid re-render loop
    }
  });
  return (
    <div>
      <Header />
      <h2 style={{marginTop:14}}>{t("Contact desc")}:</h2>
      <div className="text-primary">
        <h1>{t("Contact desc1")}</h1>
        <div style={{ marginLeft: 360, marginTop: 120 }} className="col-lg-6">
          <div className="form-group row">
            <div className="col-lg-4">
              <label className="text-primary">{t("Full Name")}:</label>
            </div>
            <div className="col-lg-8">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 360, marginTop: 4 }} className="col-lg-6">
          <div className="form-group row">
            <div className="col-lg-4">
              <label className="text-primary">{t("Email Address")}:</label>
            </div>
            <div className="col-lg-8">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        {/* <div style={{ marginLeft: 360, marginTop: 4 }} className="col-lg-6">
          <div className="form-group row">
            <div className="col-lg-4">
              <label className="text-primary">Email Address</label>
            </div>
            <div className="col-lg-8">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div> */}
        <div style={{ marginLeft: 360, marginTop: 4 }} className="col-lg-6">
          <div className="form-group row">
            <div className="col-lg-4">
              <label className="text-primary">{t("Mobile Number")}:</label>
            </div>
            <div className="col-lg-8">
              <input type="number" className="form-control" />
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 360, marginTop: 4 }} className="col-lg-6">
          <div className="form-group row">
            <div className="col-lg-4">
              <label className="text-primary">{t("You Are A")}:</label>
            </div>
            <div className="col-lg-8">
              <select style={{ height: 43 }} className="form-control">
                <option disabled selected>
                  {t("Select User Type")}
                </option>
                <option>{t("Walker")}</option>
                <option>{t("Client")}</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: 360, marginTop: 4 }} className="col-lg-6">
          <div className="form-group row">
            <div className="col-lg-4">
              <label className="text-primary">{t("Comments")}:</label>
            </div>
            <div className="col-lg-8">
              <textarea className="form-control" typeof="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
