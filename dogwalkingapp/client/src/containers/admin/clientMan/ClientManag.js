import React, { useEffect, useRef, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import { FaPlus, FaEdit, FaTrash, FaHistory } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import $ from "jquery";
import "./ClientManag.css";
import image from "../../../images/brown-dog-sitting-with-tongue-out-removebg-preview.png";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap's JavaScript
import { Country, State, City } from "country-state-city";
import { flushSync } from "react-dom";

// function CountryDropdown({ onCountryChange }) {
//   const handleCountryChange = (e) => {
//     onCountryChange(e.target.value);
//   };

//   return (
//     <select
//       style={{ height: 45 }}
//       onChange={handleCountryChange}
//       className="form-control"
//     >
//       {Country.getAllCountries().map((country) => (
//         <option key={country.isoCode} value={country.isoCode}>
//           {country.name}
//         </option>
//       ))}
//     </select>
//   );
// }

function ClientManag() {
  const navigate = useNavigate();
  const [selectedClientCity, setSelectedClientCity] = useState("");
  const { t } = useTranslation();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (clients.length > 0) {
      $("#table").DataTable();
    }
  }, [clients]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7072/api/Users/GetClientUsers",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      await axios.delete(`https://localhost:7072/api/Users/${clientId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      fetchClients(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const editClient = (client) => {
    setSelectedClient(client); // Set the client to be edited

    // Find the country ISO code by name
    const country = Country.getAllCountries().find((c) => c.name === "India");
    console.log(country);
    if (country) {
      setSelectedCountry(country.isoCode);

      const states = State.getStatesOfCountry(country.isoCode);
      const selectedStateClient = states.find((s) => s.name === client.state);
      console.log("selectedStateClient", selectedStateClient);
      setSelectedState(selectedStateClient.isoCode);

      setStates(states);

      // Find the state ISO code by name
      if (client.state) {
        const state = states.find((s) => s.name === client.state);

        if (state) {
          const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
          const selectedClientCity = cities.find((c) => c.name === client.city);
          console.log(selectedClientCity);
          setSelectedClientCity(selectedClientCity.name);
          setCities(cities);
        } else {
          setCities([]);
        }
      } else {
        setCities([]);
      }
    } else {
      setSelectedCountry("");
      setStates([]);
      setCities([]);
    }

    // $("#editModal").modal("show"); // Show the modal for editing
  };

  const handleEditChange = (e) => {
    setSelectedClient({ ...selectedClient, [e.target.name]: e.target.value });
  };

  const updateClient = async () => {
    try {
      await axios.put(
        `https://localhost:7072/api/Users/${selectedClient.id}`,
        selectedClient,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      $("#editModal").modal("hide"); // Hide the modal after update
      fetchClients(); // Refresh the list after update
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleCountryChange = (countryCode) => {
    const country = Country.getCountryByCode(countryCode);
    setSelectedCountry(country.isoCode);
    const states = State.getStatesOfCountry(countryCode);
    console.log(states);
    setStates(states);
    setSelectedClient({
      ...selectedClient,
      country: country.name,
      state: states,
      city: "",
    });
  };

  const handleStateChange = (stateCode) => {
    console.log(stateCode);
    console.log(selectedCountry);
    const state = states.find((s) => s.isoCode === stateCode);
    setSelectedState(state.isoCode);
    if (state) {
      const cities = City.getCitiesOfState(selectedCountry, stateCode);
      console.log(cities);
      setCities(cities);
      setSelectedClient({ ...selectedClient, state: state.name, city: "" });
    } else {
      setCities([]);
      setSelectedClient({ ...selectedClient, state: "", city: "" });
    }
  };

  const handleCityChange = (cityName) => {
    const city = cities.find((c) => c.name === cityName);
    setSelectedClientCity(city.name);
    console.log(city);
    setSelectedClient({ ...selectedClient, city: cityName });
  };

  const renderTable = () => {
    return clients.map((client) => (
      <tr key={client.id}>
        <td>{client.id}</td>
        <td>{client.firstName}</td>
        <td>{client.lastName}</td>
        <td>{client.email}</td>
        <td>
          <button
            onClick={() =>
              navigate(
                ROUTES.cliHistory.name +
                  "?id=" +
                  client.id +
                  "&name=" +
                  client.firstName +
                  " " +
                  client.lastName
              )
            }
            className="btn btn-primary"
          >
            <FaHistory />
          </button>
        </td>
        <td>
          <button
            onClick={() => deleteClient(client.id)}
            className="btn btn-danger"
          >
            <FaTrash />
          </button>
        </td>
        <td>
          <button
            data-toggle="modal"
            data-target="#editModal"
            onClick={() => editClient(client)}
            className="btn btn-warning"
          >
            <FaEdit />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <Header1 />
      {sessionStorage.getItem("role") === "Admin User" ? (
        <div className="divstyleadmin">
          <div className="m-4">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <h1 style={{ fontWeight: "lighter" }}>All Clients</h1>
              <button
                onClick={() => navigate(ROUTES.registerPage2.name)}
                className="btn btn-info"
              >
                <FaPlus /> Add Client
              </button>
            </div>
            <div className="card11">
              <table
                id="table"
                ref={tableRef}
                className="table table-striped table-hover table-bordered"
              >
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>History</th>
                    <th>Delete</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <img src={image} alt="Not Authorized" />
          <h1>You Are Not Authorized To View This Content</h1>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Return To Home Page
          </button>
        </div>
      )}
      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Client
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={selectedClient?.firstName || ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={selectedClient?.lastName || ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={selectedClient?.email || ""}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    style={{ height: 45 }}
                    value={selectedCountry}
                    className="form-control"
                    onChange={(e) => handleCountryChange(e.target.value)}
                  >
                    {Country.getAllCountries().map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select
                    style={{ height: 45 }}
                    className="form-control"
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select
                    style={{ height: 45 }}
                    className="form-control"
                    value={selectedClientCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                  >
                    {cities.map((city) => (
                      <option key={city.geonameId} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateClient}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientManag;
