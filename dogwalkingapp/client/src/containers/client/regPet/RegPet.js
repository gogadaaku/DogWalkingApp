import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import "./RegPet.css";
function RegPet() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [image, setImage] = useState(null);
  const clientId = sessionStorage.getItem("id");
  const [langLoaded, setLangLoaded] = useState(false);
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && !langLoaded) {
      i18n.changeLanguage(storedLang);
      setLangLoaded(true); // Set language loaded to true to avoid re-render loop
    }
  });
  const agePeriod = ["Adult", "Puppy", "Senior", "Geriatric"];
  const dogBehaviour = ["Calm", "Aggressive", "Calm-Aggressive"];
  const breed = [
    "Akita",
    "Bernese Mountain Dog",
    "Boxer",
    "Bullmastiff",
    "Great Dane",
    "Newfoundland",
    "Portuguese Water Dog",
  ];
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(`${t("Name is required")}`)
      .min(4, `${t("Enter At least 4 Characters")}`),
    age: Yup.number()
      .required(`${t("Please Enter Dog's Age")}`)
      .min(1, `${"Minimum Age for registeration must be 1 year"}`)
      .max(20, `${"Maximum age Must be less than 20 years"}`),
    weight: Yup.number()
      .required(`${t("Please Enter Weight")}`)
      .min(2, `${t("Minimum Weight must be 2 kg")}`)
      .max(40, `${t("Maximum Weight must be 40 kg")}`),
    breed: Yup.string().required(`${t("Please Select Dog Breed")}`),
    behaviour: Yup.string().required(`${t("Please Select Dog's Behaviour")}`),
    image: Yup.string().required(`${t("Please Select Image")}`),
  });
  const fileImageConvert = ({ field, form: { setFieldValue } }) => {
    const handleFileChange = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = function () {
        console.log(reader.result.split(",")[1]);
        setFieldValue("image", reader.result.split(",")[1]);
        setImage(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    };
    return <input type="file" onChange={handleFileChange} />;
  };
  const agePeriodSelect = ({ field, form: { setFieldValue } }) => {
    const handleAgePeriodDropdown = (e) => {
      console.log(e.target.value);
      setFieldValue("agePeriod", e.target.value);
    };
    return (
      <select
        onChange={handleAgePeriodDropdown}
        style={{ height: 45 }}
        className="form-control"
      >
        <option>{t("Select Age Period")}</option>
        {agePeriod.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    );
  };
  const dogBreedSelect = ({ field, form: { setFieldValue } }) => {
    const handledropdownChange = (e) => {
      setFieldValue("breed", e.target.value);
      // console.log(e.target.value);
    };
    return (
      <select
        onChange={handledropdownChange}
        style={{ height: 45 }}
        className="form-control"
      >
        <option>{t("Select Dog Breed")}</option>
        {breed.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    );
  };
  const dogBehaviourSelect = ({ field, form: { setFieldValue } }) => {
    const handleBehaviourChange = (e) => {
      setFieldValue("behaviour", e.target.value);
    };
    return (
      <select
        onChange={handleBehaviourChange}
        style={{ height: 45 }}
        className="form-control"
      >
        <option>{t("Select Dog Behaviour")}</option>
        {dogBehaviour.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    );
  };
  return (
    <div>
      <Header1 />
      <h2 className="text-center mt-3">{t("Register Your Pet")}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="container cardContainer1"
      >
        <Formik
          initialValues={{
            name: "",
            age: "",
            weight: "",
            breed: "",
            behaviour: "",
            agePeriod: "",
            clientId: clientId,
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post("https://localhost:7072/api/Pet", values)
              .then((d) => {
                console.log(d.data);
                navigate(ROUTES.clientHome.name);
              })
              .catch((error) => {
                console.log(error);
              });
            console.log(values);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="row">
              <div className="" style={{ margin: 40 }}>
                <div className="form-group row">
                  <label className="text-primary col-4">{t("Dog Name")}:</label>
                  <div className="col-8">
                    <Field
                      type="text"
                      name="name"
                      placeholder={t("Dog Name")}
                      className="form-control"
                    />
                  </div>
                  {errors.name && touched.name ? (
                    <div className="text-danger">{errors.name}</div>
                  ) : null}
                </div>
                <div className="form-group row">
                  <label className="text-primary col-4">{t("Dog Age")}:</label>
                  <div className="col-8">
                    <Field
                      type="number"
                      name="age"
                      placeholder={t("Dog Age")}
                      className="form-control"
                    />
                  </div>
                  {errors.age && touched.age ? (
                    <div className="text-danger">{errors.age}</div>
                  ) : null}
                </div>
                <div className="form-group row">
                  <label className="text-primary col-4">
                    {t("Dog Weight")}:
                  </label>
                  <div className="col-8">
                    <Field
                      type="number"
                      name="weight"
                      placeholder={t("Dog Weight")}
                      className="form-control"
                    />
                  </div>
                  {errors.weight && touched.weight ? (
                    <div className="text-danger">{errors.weight}</div>
                  ) : null}
                </div>
                <div className="form-group row">
                  <label className="text-primary col-4">
                    {t("Dog Image")}:
                  </label>
                  <div className="col-8">
                    <Field component={fileImageConvert} />
                  </div>
                  {errors.image && touched.image ? (
                    <div className="text-danger">{errors.image}</div>
                  ) : null}
                </div>
                <div className="form-group row">
                  <label className="text-primary col-4">
                    {t("Dog Age Period")}:
                  </label>
                  <div className="col-8">
                    <Field component={agePeriodSelect} />
                  </div>
                  {errors.agePeriod && touched.agePeriod ? (
                    <div className="text-danger">{errors.agePeriod}</div>
                  ) : null}
                </div>
                <div className="form-group row">
                  <label className="text-primary col-4">
                    {t("Dog Breed")}:
                  </label>
                  <div className="col-8">
                    <Field component={dogBreedSelect} />
                  </div>
                  {errors.breed && touched.breed ? (
                    <div className="text-danger">{errors.breed}</div>
                  ) : null}
                </div>
                <div className="form-group row">
                  <label className="text-primary col-4">
                    {t("Dog Behaviour")}:
                  </label>
                  <div className="col-8">
                    <Field component={dogBehaviourSelect} />
                  </div>
                  {errors.behaviour && touched.behaviour ? (
                    <div className="text-danger">{errors.behaviour}</div>
                  ) : null}
                </div>
                <div>
                  <button
                    style={{ width: 390 }}
                    class="button-89"
                    type="submit"
                    role="button"
                  >
                    {t("Register")}
                  </button>
                </div>
                {errors.behaviour && touched.behaviour ? (
                  <div className="text-danger">{errors.behaviour}</div>
                ) : null}
              </div>
              {/* <div className="col-md-6">
                {image ? (
                  <img
                    style={{ height: 600, width: 600 }}
                    src={`data:image/png;base64,${image}`}
                  />
                ) : null}
              </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegPet;
