import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";
import { useNavigate } from "react-router-dom";

function ClientPets() {
  const [pets, setPets] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getClientPets();
  }, []);
  function getClientPets() {
    axios
      .get("https://localhost:7072/api/Pet/" + sessionStorage.getItem("id"))
      .then((d) => {
        console.log(d.data);
        setPets(d.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Header1 />
      <h1 className="text-center">Client Pets</h1>
      <div className="container d-flex justify-content-center">
        {pets?.map((option) => (
          <div class="card mr-4" style={{ width: "18rem" }}>
            <img
              class="card-img-top"
              src={`data:image/png;base64,${option.image}`}
              alt="Card imag"
              height={430}
              style={{width:"inherit"}}
            />
            <div class="card-body">
              <h5 class="card-title">{option.name}</h5>
              <p class="card-text">
                <div className="form-group row">
                  <div className="d-flex justify-content-center">
                    <label>Breed:</label>
                    <label>{option.breed}</label>
                  </div>
                </div>
              </p>
              <button
                onClick={() => {
                  navigate(ROUTES.petHistory.name + "?petId=" + option.id+"&name= "+option.name);
                }}
                className="btn btn-primary"
              >
                History
              </button>
            </div>
          </div>
        ))}
      </div>
      {pets == 0 ? (
        <h1 className="text-center">You dont have any registered pets</h1>
      ) : null}
    </>
  );
}

export default ClientPets;
