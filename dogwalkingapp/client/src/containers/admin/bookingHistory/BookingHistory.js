import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../../components/Header";
import Header1 from "../../../components/Header1";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import image from "../../../images/brown-dog-sitting-with-tongue-out-removebg-preview.png";
import ROUTES from "../../../navigations/Routes";

function BookingHistory() {
  const navigate = useNavigate();
  const [bookingHistoryData, setBookingHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("role") !== "Admin User") {
      navigate("/home"); // Redirect to home if not admin
    } else {
      allBookingData();
    }
  }, []);
  const dateConversion = (dateAndTime) => {
    return new Date(dateAndTime).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const timeConversion = (time) => {
    // Assuming 'time' is a string like "15:00:00"
    const date = new Date(`1970-01-01T${time}Z`); // Use a fixed date and UTC timezone
    return date.toLocaleTimeString("en-IN", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  const allBookingData = async () => {
    await axios
      .get("https://localhost:7072/api/AllBookingHistory")
      .then((d) => {
        console.log(d.data);
        setBookingHistoryData(d.data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function renderTable() {
    $(document).ready(function () {
      $("#table").DataTable();
    });
    return bookingHistoryData.map((items) => {
      const dateTime = dateConversion(items.dateAndTimeOfBooking);
      console.log("dateTime", dateTime);
      const dateForBooking = dateConversion(items.dateForBooking);
      const bookingFromTime = timeConversion(items.fromTime);
      const bookingToTime = timeConversion(items.toTime);
      return (
        <tr>
          <td style={{textAlign:"center"}}>{items.id}</td>
          <td style={{textAlign:"center"}}>{dateTime}</td>
          <td style={{textAlign:"center"}}>{items.bookingClientName}</td>
          <td style={{textAlign:"center"}}>{items.walkerName}</td>
          <td style={{textAlign:"center"}}>{dateForBooking}</td>
          <td style={{textAlign:"center"}}>{bookingFromTime}</td>
          <td style={{textAlign:"center"}}>{bookingToTime}</td>
        </tr>
      );
    });
  }

  if (sessionStorage.getItem("role") === "Admin User") {
    return (
      <div>
        <Header1 />
        <h1 style={{ margin: "30px 10px 30px 10px" }} className="text-center">
          Booking History
        </h1>
        <div
          style={{ display: "flex", justifyContent: "center", width: "auto" }}
        >
          <div className="card55" style={{ padding: 30 }}>
            {isLoading && (
              <table
                id="table"
                className="table table-hover table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th style={{width:"10%" ,textAlign:"center"}}>Booking Id</th>
                    <th style={{width:"10%" ,textAlign:"center"}}>Booking Date</th>
                    <th style={{width:"10%" ,textAlign:"center"}}> Client Name</th>
                    <th style={{width:"10%" ,textAlign:"center"}}> Walker Name</th>
                    <th style={{width:"10%" ,textAlign:"center"}}> Date For Walk</th>
                    <th style={{width:"10%" ,textAlign:"center"}}> From Time </th>
                    <th style={{width:"10%" ,textAlign:"center"}}> To Time</th>
                  </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
              </table>
            )}
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
            You Are Not Authorized To View This Content Please Login If You Are
            Admin To View This Content
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

export default BookingHistory;
