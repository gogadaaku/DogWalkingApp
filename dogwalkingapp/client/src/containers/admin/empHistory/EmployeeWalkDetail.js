import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./EmployeeWalkDetail.css";

function EmployeeWalkDetail() {
  const [walkData, setWalkData] = useState({
    data: {},
    isLoading: true,
    error: null,
  });

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const queryparams = useQuery();
  const bookingId = queryparams.get("bookingId");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          "https://localhost:7072/api/EmployeeBooking/CompleteWalkDetails/" +
            bookingId
        )
        .then((response) => {
        let timeStart=response.data.startTime;
        let timeEnd=response.data.completeTime;
        let startTime=new Date(`${response.data.dateOfWalk}T${timeStart}`).toLocaleString("en-US", { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h12' });
        let endTime=new Date(`${response.data.dateOfWalk}T${timeEnd}`).toLocaleString("en-US", { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h12' });
        // console.log("transformedTime",startTime,endTime)  ;
        response.data.startTime=startTime;
        response.data.completeTime=endTime;
        setWalkData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [bookingId]);

  return (
    <div>
      <Header1 />
      <h1 style={{ fontWeight: "lighter" }} className="center">
        Employee Walk Detail
      </h1>
      <div
        style={{
          // backgroundColor: "#F5F5F5",
          padding: 20,
          borderRadius: 12,
          width: 900,
          backgroundColor: "darkgray",margin:"auto"
        }}
      >
        <div className="bodyEmpWalk">
          {/* Image container */}
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
              alt="No Imag"
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
              alt="No Imag"
            />
          </div>
        </div>
        {/* Data card below images */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="card55" style={{ padding: 20 }}>
            <table className="walkDetailsTable">
              <tbody>
                <tr>
                  <td ><strong>Booking ID:</strong></td>
                  <td style={{textAlign:"center"}}>{walkData.bookingId}</td>
                </tr>
                <tr>
                  <td ><strong>Date of Walk:</strong></td>
                  <td style={{textAlign:"center"}}>{walkData.dateOfWalk}</td>
                </tr>
                <tr>
                  <td ><strong>Start Time:</strong></td>
                  <td style={{textAlign:"center"}}>{walkData.startTime}</td>
                </tr>
                <tr>
                  <td ><strong>Complete Time:</strong></td>
                  <td style={{textAlign:"center"}}>{walkData.completeTime}</td>
                </tr>
                <tr>
                  <td ><strong>Dog Behaviour:</strong></td>
                  <td style={{textAlign:"center"}}>{walkData.dogBehaviour}</td>
                </tr>
                <tr>
                  <td ><strong>Dog Walk Descriptions:</strong></td>
                  <td style={{textAlign:"center"}}>{walkData.dogWalkDescriptions}</td>
                </tr>
                <tr>
                  <td ><strong>Pet ID:</strong></td>
                  <td style={{textAlign:"center"}}>{walkData.petId}</td>
                </tr>
                <tr>
                  <td ><strong>Transaction ID:</strong></td>
                  <td style={{textAlign:"center"}}>{walkData.transactionId || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeWalkDetail;

