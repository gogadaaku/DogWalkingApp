import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";

function MyEmpBookings() {
  const [myBookings, setMyBooking] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getEmployeeBooking();
  }, []);
  function getEmployeeBooking() {
    axios
      .get(
        "https://localhost:7072/api/EmployeeBooking?employeeId=" +
          sessionStorage.getItem("id")
      )
      .then((d) => {
        console.log(d.data);
        setMyBooking(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function conditionForWalk(
    time,
    date,
    totaltime,
    petId,
    transactionId,
    bookingId
  ) {
    const dateArray = date.split(" ");
    // const dateString = dateArray[0];
    const dateString = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
    const timeString = dateArray[1];

    const bookingDateTime = new Date(`${dateString} ${time}`);
    console.log(bookingDateTime);
    const currentDateTime = new Date();

    // Check if the booking date-time is in the past
    if (bookingDateTime < currentDateTime) {
      console.log("Time has already expired");
      Swal.fire({
        icon: "error",
        title: "Walk Time Already Over!!!!",
      });
      return;
    }
    navigate(
      ROUTES.startWalk.name +
        "?totalTime=" +
        totaltime +
        "&petId=" +
        petId +
        "&transactionId=" +
        transactionId +
        "&bookingId=" +
        bookingId
    );
    // The booking is valid, you can proceed with the walk
    console.log("Booking is valid, you can start the walk");
  }

  const [showExpiredBookings, setShowExpiredBookings] = useState(false);
  function renderTable() {
    const filteredBookings = myBookings?.filter((booking) => {
      const dateArray = booking.dateForBooking.split(" ");
      const dateString = dateArray[0];
      const timeString = dateArray[1];
      const bookingDateTime = new Date(`${dateString} ${timeString}`);
      const currentDateTime = new Date();
      console.log(currentDateTime);
      console.log(bookingDateTime);
      return showExpiredBookings || bookingDateTime >= currentDateTime;
    });

    return (
      <>
        <button onClick={() => setShowExpiredBookings(!showExpiredBookings)}>
          {showExpiredBookings ? "Show Valid Walks" : "Show All Walks"}
        </button>
        {filteredBookings?.map((bookings) => {
          // Parse the "fromTime" and "toTime" values
          // if (!bookings.date) return null; // Skip the row if the date is undefined

          const dateArray = bookings.dateForBooking.split(" ");
          const fromTimeArray = bookings.fromTime.split(":");
          const toTimeArray = bookings.toTime.split(":");

          // Calculate the total time in minutes
          const fromTime =
            parseInt(fromTimeArray[0]) * 60 + parseInt(fromTimeArray[1]);
          const toTime =
            parseInt(toTimeArray[0]) * 60 + parseInt(toTimeArray[1]);
          const totalMinutes = toTime - fromTime;

          // Calculate the total time in hours and minutes
          const totalHours = Math.floor(totalMinutes / 60);
          const totalMinutesRemaining = totalMinutes % 60;
          console.log("timeleft", totalMinutesRemaining);
          return (
            <tr style={{ justifyContent: "center" }}>
              <td>{bookings.dateForBooking}</td>
              <td>{bookings.fromTime}</td>
              <td>{bookings.toTime}</td>
              <td>{bookings.clientName}</td>
              <td>{bookings.petName}</td>
              <td>
                {bookings.paymetDuringBooking === false ? (
                  <input type="checkbox" />
                ) : (
                  <input type="checkbox" checked />
                )}
              </td>
              <td>{bookings.clientAddress}</td>
              <td>
                <button
                  onClick={() => {
                    navigate(
                      ROUTES.navigate.name +
                        "?longitude=" +
                        bookings.longitude +
                        "&lattitude=" +
                        bookings.latitude
                    );
                  }}
                >
                  Click to get Navigation
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    conditionForWalk(
                      bookings.fromTime,
                      bookings.dateForBooking,
                      totalMinutesRemaining,
                      bookings.petId,
                      bookings.transactionId,
                      bookings.id
                    );
                  }}
                >
                  Start Walk
                </button>
              </td>
            </tr>
          );
        })}
      </>
    );
  }
  return (
    <div>
      <Header1 />
      <h1 className="text-center">MyBookings</h1>
      <div>
        <table className="table table-hover table-stripped table-bordered">
          <thead>
            <tr>
              <th>Booking Date/Time</th>
              <th>From Time</th>
              <th>To Time</th>
              <th>Client Name</th>
              <th>Pet Name</th>
              <th>Payment Done</th>
              <th>Address</th>
              <th>Location</th>
              <th>Start Walk</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default MyEmpBookings;
