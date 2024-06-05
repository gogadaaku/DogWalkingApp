import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import image from "../../../images/brown-dog-sitting-with-tongue-out-removebg-preview.png"
function ClilentHistory() {
  const [clientHistoryData, setClientHistoryData] = useState({
    data: [],
    isLoading: true,
    error: null,
  });
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  const queryParams = useQuery();
  const id = queryParams.get("id");
  const name = queryParams.get("name"); // Assuming 'name' is also a query parameter
  const navigate = useNavigate();
  
  useEffect(() => {
    if (sessionStorage.getItem("role") !== "Admin User") {
      navigate(ROUTES.home.name); // Redirect to home if not admin
    } else {
      const fetchHistoryData = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7072/api/EmployeeBooking/ClientHistory/" + id
          );
          console.log(response.data)
          const transformedData = response.data.map((data) => {
            const array = data.dateAndTimeOfBooking.split(" ");
            const array1 = data.dateForBooking.split(" ");
            const date = `${array[2]}-${array[1]}-${array[3]} ${array[0]}`;
            const date1 = `${array1[2]}-${array1[1]}-${array1[3]} ${array1[0]}`;
            const time = array[4];
            const time1 = array1[4];
            
            const time12 = new Date(`2024-06-03 ${time}`).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            );
            console.log("time12", time12)
            const time2 = new Date(`2024-06-03 ${time1}`).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            );
            
            return {
              ...data,
              dateOfBooking: date,
              dateForBooking: date1,
              timeOfBooking: time12,
              timeForBooking: time2,
            };
          });
          console.log(transformedData)
          setClientHistoryData({
            data: transformedData,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          setClientHistoryData({
            data: [],
            isLoading: false,
            error: error.message,
          });
        }
      };
      fetchHistoryData();
    }
  }, [id, navigate]);

  const renderTable = () => {
    return clientHistoryData?.data.map((item) => (
      <tr>
        <td>{item.id}</td>
        <td>{item.clientId}</td>
        <td>{item.dateOfBooking}</td>
        <td>{item.timeOfBooking}</td>
        <td>{item.dateForBooking}</td>
        <td>{item.timeForBooking}</td>
        <td>{item.completed ? "Completed" : "Not Completed"}</td>
        <td>{item.transactionId ? "Paid" : "Not Paid"}</td>
        <td>
          {item.completed ? (
            <button
              onClick={() => navigate(ROUTES.clientWalkDetails.name + "?bookingId=" + item.id)}
              style={{ height: 50 }}
              className="buttonEmp"
            >
              View Detail
            </button>
          ) : (
            <div className="center">
              <button style={{ height: 50 }} className="buttonEmp">
                No Details
              </button>
            </div>
          )}
        </td>
      </tr>
    ));
  };

  if (sessionStorage.getItem("role") === "Admin User") {
    return (
      <div>
        <Header1 />
        <div className="center">
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1 style={{ marginTop: 30, fontWeight: "lighter" }}>
            Client History
          </h1>
          <h1 style={{ marginTop: 30, fontWeight: "lighter" }}>{name}</h1>
          <h1 style={{ marginTop: 30, fontWeight: "lighter" }}>{id}</h1>
        </div>
        <div className="divstyleadmin">
          <div className="card11">
            <table
              style={{ width: "1390px" }}
              className="table table-bordered table-hover table-stripped"
            >
              <thead>
                <tr>
                  <th>Booking Id</th>
                  <th>Client Id</th>
                  <th>Date of Booking</th>
                  <th>Time of Booking</th>
                  <th>Date For Booking</th>
                  <th>Time For Booking</th>
                  <th>Completed?</th>
                  <th>Payment</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </table>
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

export default ClilentHistory;
