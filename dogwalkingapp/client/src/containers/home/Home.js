import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header1 from "../../components/Header1";
import image from "../../images/can-dogs-get-fleas-from-grass.jpg";
import "./Home.css";
function Home() {
  const { t, i18n } = useTranslation();
  const [langLoaded, setLangLoaded] = useState(false);
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && !langLoaded) {
      i18n.changeLanguage(storedLang);
      setLangLoaded(true); // Set language loaded to true to avoid re-render loop
    }
  });
  return (
    <div className="body" style={{ height: "100vh", width: "100%" }}>
      <Header1 />
      <div className="flex">
        <img
          src={image}
          width={"100%"}
          style={{ boxShadow: "4px 4px 8px 4px rgba(0, 0, 0, 0.2)" }}
        />
        <br></br>
      </div>
      <h1 className="text-center mt-5 hover">{t("Welcome To Website")}</h1>
    </div>
  );
}

export default Home;
