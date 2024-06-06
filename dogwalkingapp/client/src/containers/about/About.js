import React, { useEffect, useState } from "react";
import Header1 from "../../components/Header1";
import { useTranslation } from "react-i18next";
import "./About.css"; // Importing a CSS file for styling

function About() {
  const { t, i18n } = useTranslation();
  const [langLoaded, setLangLoaded] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [charge, setCharge] = useState(750); // Base charge for 15 minutes in Rupees

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && !langLoaded) {
      i18n.changeLanguage(storedLang);
      setLangLoaded(true); 
    }
  }, [i18n, langLoaded]);

  useEffect(() => {
    switch (selectedDuration) {
      case 15:
        setCharge(250); // Adjusted to approximate conversion rate
        break;
      case 30:
        setCharge(400);
        break;
      case 45:
        setCharge(450);
        break;
      default:
        setCharge(250);
    }
  }, [selectedDuration]);

  return (
    <>
      <Header1 />
      <div className="about-container">
        <h1 className="about-title">{t("About Us")}</h1>
        <p className="about-description">{t("Explore our Dog Walking services. Choose from 15, 30, or 45-minute walks. Pricing adjusts accordingly.")}</p>
        <div className="duration-selector">
          <label className="duration-label">{t("Select Duration:")}</label>
          <select className="duration-dropdown" value={selectedDuration} onChange={e => setSelectedDuration(Number(e.target.value))}>
            <option value={15}>{t("15 min")}</option>
            <option value={30}>{t("30 min")}</option>
            <option value={45}>{t("45 min")}</option>
          </select>
        </div>
        <p className="charge-display">{t("Charge for this walk: ₹")}{charge}</p>
      </div>
    </>
  );
}

export default About;
