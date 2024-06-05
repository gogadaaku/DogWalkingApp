import React, { useState, useEffect } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import "./Contact.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for programmatic navigation
import ROUTES from "../../../navigations/Routes";

// Define the ContactAdmin1 component
function ContactAdmin() {
  // State to hold query data, loading status, and any errors
  const [queryData, setQueryData] = useState({
    data: [],
    isLoading: true,
    error: null,
  });
  const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

  // useEffect to fetch data on component mount
  useEffect(() => {
    if (sessionStorage.getItem("role") === "Admin User") {
      const fetchData = async () => {
        try {
          // Attempt to fetch data from the API
          const response = await axios.get(
            "https://localhost:7072/api/Contact"
          );
          // Update state with the fetched data
          setQueryData({ data: response.data, isLoading: false, error: null });
        } catch (error) {
          // Update state with error message if fetching fails
          setQueryData({ data: [], isLoading: false, error: error.message });
        }
      };
      fetchData();
    } else {
      navigate(ROUTES.NotAuthorized.name); // Redirect if not admin
    }
  }, [navigate]); // Dependency on navigate to ensure it's available

  if (sessionStorage.getItem("role") === "Admin User") {
    return (
      <div>
        <Header1 />
        <h1 className="center" style={{ fontWeight: "lighter" }}>
          Guest Queries
        </h1>
        <div className="query-container">
          {queryData.isLoading ? (
            <p>Loading...</p>
          ) : queryData.error ? (
            <p>Error: {queryData.error}</p>
          ) : (
            queryData.data.map((item, index) => (
              <div key={index} className="card">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <td>{item.id}</td>
                    </tr>
                    <tr>
                      <th>Full Name</th>
                      <td>{item.fullName}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{item.email}</td>
                    </tr>
                    <tr>
                      <th>Mobile Number</th>
                      <td>{item.mobileNumber}</td>
                    </tr>
                    <tr>
                      <th>User Type</th>
                      <td>{item.userType}</td>
                    </tr>
                    <tr>
                      <th>Comments</th>
                      <td>{item.comments}</td>
                    </tr>
                    {item.guestId && (
                      <tr>
                        <th>Guest ID</th>
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
    // This block will not be reached due to the redirect in useEffect
    return null;
  }
}

export default ContactAdmin;
