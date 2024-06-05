import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header1 from '../../../components/Header1';
import { useNavigate } from 'react-router-dom';
import image from "../../../images/brown-dog-sitting-with-tongue-out-removebg-preview.png"
import ROUTES from '../../../navigations/Routes';

function ClientWakDetails() {
  const [walkData, setWalkData] = useState({
    data: {},
    isLoading: true,
    error: null,
  });
  const navigate = useNavigate();

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const queryparams = useQuery();
  const bookingId = queryparams.get("bookingId");

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "Admin User") {
      navigate('/home'); // Redirect to home if not admin
    } else {
      const fetchData = async () => {
        axios
          .get(
            "https://localhost:7072/api/EmployeeBooking/CompleteWalkDetails/" +
              bookingId
          )
          .then((response) => {
            setWalkData(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchData();
    }
  }, [bookingId, navigate]);

  if (sessionStorage.getItem("role") === "Admin User") {
    return (
      <div>
        <Header1 />
        <h1 style={{ fontWeight: "lighter" }} className="center">
          Client Walk Detail
        </h1>
        <div
          style={{
            padding: 20,
            borderRadius: 12,
            width: 900,
            backgroundColor: "darkgray",
            margin: "auto"
          }}
        >
          <div className="bodyClientWalk">
            <div
              className="imageContainer"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <img
                style={{
                  borderRadius: 12,
                  width: "300px",
                  height: "200px",
                  objectFit: "cover",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
                src={`data:image/jpeg;base64,${walkData.startPetImage}`}
                alt="Start Walk Image"
              />
              <img
                style={{
                  borderRadius: 12,
                  width: "300px",
                  height: "200px",
                  objectFit: "cover",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  marginLeft: 20,
                }}
                src={`data:image/jpeg;base64,${walkData.endPetImage}`}
                alt="End Walk Image"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="card55" style={{ padding: 20 }}>
                <p><strong>Booking ID:</strong> {walkData.bookingId}</p>
                <p><strong>Date of Walk:</strong> {walkData.dateOfWalk}</p>
                <p><strong>Start Time:</strong> {walkData.startTime}</p>
                <p><strong>Complete Time:</strong> {walkData.completeTime}</p>
                <p><strong>Dog Behaviour:</strong> {walkData.dogBehaviour}</p>
                <p><strong>Dog Walk Descriptions:</strong> {walkData.dogWalkDescriptions}</p>
                <p><strong>Pet ID:</strong> {walkData.petId}</p>
                <p><strong>Transaction ID:</strong> {walkData.transactionId || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          style={{
            display: "inline-block",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img src={image} />
          <h1 style={{ fontWeight: "lighter" }}>
            You Are Not Authorized To View This Content Please Login If You
            Are Admin To View This Content
          </h1>
          <button
            onClick={() => {
              navigate(ROUTES.home.name);
            }}
            className="btn "
            style={{
              margin: "10px",
              backgroundColor: "#77533B",
              color: "burlywood",
            }}
          >
            Go To Home Page
          </button>
        </div>
      </>
    );
  }
}

export default ClientWakDetails;
