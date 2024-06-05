// import React, { useEffect, useState } from "react";
// import Header1 from "../../../components/Header1";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import ROUTES from "../../../navigations/Routes";
// import "./MyEmpBooking.css";
// import $ from "jquery";
// function MyEmpBooking() {
//   let filteredBookings = [];
//   const [myBookings, setMyBooking] = useState([]);
//   const [showAllWalks, setShowAllWalks] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     getEmployeeBooking();
//   }, []);

//   function getEmployeeBooking() {
//     axios
//       .get(
//         "https://localhost:7072/api/EmployeeBooking?employeeId=" +
//           sessionStorage.getItem("id")
//       )
//       .then((d) => {
//         // console.log(d.data);
//         setMyBooking(d.data);
//       })
//       .catch((err) => {
//         // console.log(err);
//       });
//   }
//   //   useEffect(() => {
//   //     renderTable();
//   //   }, [filteredBookings]);
//   useEffect(() => {
//     if (myBookings.length > 0) {
//       $("#table").DataTable();
//     }
//   });
//   const renderTable = () => {
//     filteredBookings = myBookings?.filter((booking) => {
//       const bookingDate = new Date(booking.dateForBooking);
//       const currentDateTime = new Date();
//       //   console.log("currentDateTime", currentDateTime);
//       //   console.log("dateForBooking", booking.dateForBooking);
//       if (showAllWalks === "Show All Walks") {
//         return booking;
//       } else if (showAllWalks === "Show Completed Walks") {
//         return booking.completed && bookingDate > currentDateTime;
//       } else if (showAllWalks === "Not Paid Walks") {
//         return booking.paymetDuringBooking == false && !booking.completed;
//       } else if (showAllWalks === "Upcoming Walks") {
//         return !booking.completed && bookingDate > currentDateTime;
//       } else if (showAllWalks === "Expired Walks") {
//         return bookingDate < currentDateTime;
//       } else return booking;
//     });

//     // function conditionForWalk(
//     //   time,
//     //   date,
//     //   totaltime,
//     //   petId,
//     //   transactionId,
//     //   bookingId
//     // ) {
//     //   const dateArray = date.split(" ");
//     //   // const dateString = dateArray[0];
//     //   const dateString = `${dateArray[0]} ${dateArray[1]} ${dateArray[2]} ${dateArray[3]}`;
//     //   const timeString = dateArray[1];

//     //   const bookingDateTime = new Date(`${dateString} ${time}`);
//     //   console.log(bookingDateTime);
//     //   const currentDateTime = new Date();

//     //   // Check if the booking date-time is in the past
//     //   if (bookingDateTime < currentDateTime) {
//     //     console.log("Time has already expired");
//     //     Swal.fire({
//     //       icon: "error",
//     //       title: "Walk Time Already Over!!!!",
//     //     });
//     //     return;
//     //   }
//     //   navigate(
//     //     ROUTES.startWalk.name +
//     //       "?totalTime=" +
//     //       totaltime +
//     //       "&petId=" +
//     //       petId +
//     //       "&transactionId=" +
//     //       transactionId +
//     //       "&bookingId=" +
//     //       bookingId
//     //   );
//     //   // The booking is valid, you can proceed with the walk
//     //   console.log("Booking is valid, you can start the walk");
//     // }

//     const conditionForWalk = () => {};

//     return (
//       <>
//         {filteredBookings?.map((bookings, index) => {
//           const dateArray = bookings.dateForBooking.split(" ");
//           const fromTimeArray = bookings.fromTime.split(":");
//           const toTimeArray = bookings.toTime.split(":");

//           // Calculate the total time in minutes
//           const fromTime =
//             parseInt(fromTimeArray[0]) * 60 + parseInt(fromTimeArray[1]);
//           const toTime =
//             parseInt(toTimeArray[0]) * 60 + parseInt(toTimeArray[1]);
//           const totalMinutes = toTime - fromTime;

//           // Calculate the total time in hours and minutes
//           const totalHours = Math.floor(totalMinutes / 60);
//           const totalMinutesRemaining = totalMinutes % 60;
//           //   console.log("timeleft", totalMinutesRemaining);
//           return (
//             <tr>
//               {/* <td style={{ width: "30px" }}>{bookings.id}</td> */}
//               <td>{index + 1}</td>
//               <td>{bookings.dateForBooking}</td>
//               <td>{bookings.fromTime}</td>
//               <td>{bookings.toTime}</td>
//               <td>{bookings.clientName}</td>
//               <td>{bookings.petName}</td>
//               <td>
//                 {bookings.paymetDuringBooking === false ? (
//                   <input type="checkbox" disabled />
//                 ) : (
//                   <input type="checkbox" checked disabled />
//                 )}
//               </td>
//               <td>{bookings.clientAddress}</td>
//               <td>
//                 <button
//                   className="buttonEmp"
//                   onClick={() => {
//                     navigate(
//                       ROUTES.navigate.name +
//                         "?longitude=" +
//                         bookings.longitude +
//                         "&lattitude=" +
//                         bookings.latitude
//                     );
//                   }}
//                 >
//                   Click to get Navigation
//                 </button>
//               </td>
//               <td>
//                 <button
//                   className="buttonEmp"
//                   onClick={() => {
//                     conditionForWalk(
//                       bookings.fromTime,
//                       bookings.dateForBooking,
//                       totalMinutesRemaining,
//                       bookings.petId,
//                       bookings.transactionId,
//                       bookings.id
//                     );
//                   }}
//                 >
//                   Start Walk
//                 </button>
//               </td>
//             </tr>
//           );
//         })}
//       </>
//     );
//   };

//   return (
//     <div>
//       <Header1 />
//       <h1 className="text-center lighterf">My Booking</h1>
//       <div className="d-flex justify-content-center">
//         <button
//           style={{ height: "55px", width: "250px", margin: "1px" }}
//           onClick={() => {
//             setShowAllWalks("Show All Walks");
//             // console.log(showAllWalks);
//           }}
//           className="buttonEmp"
//         >
//           showAllWalks
//         </button>
//         <button
//           style={{ height: "55px", width: "250px", margin: 1 }}
//           className="buttonEmp"
//           onClick={() => {
//             setShowAllWalks("Show Completed Walks");
//           }}
//         >
//           Show Completed Walks
//         </button>
//         <button
//           onClick={() => {
//             setShowAllWalks("Upcoming Walks");
//           }}
//           style={{ height: "55px", width: "250px", margin: 1 }}
//           className="buttonEmp"
//         >
//           Upcoming Walks
//         </button>
//         <button
//           onClick={() => {
//             setShowAllWalks("Not Paid Walks");
//           }}
//           style={{ height: "55px", width: "250px", margin: 1 }}
//           className="buttonEmp"
//         >
//           Not Paid Walks
//         </button>{" "}
//         <button
//           onClick={() => {
//             setShowAllWalks("Expired Walks");
//           }}
//           style={{ height: "55px", width: "250px", margin: 1 }}
//           className="buttonEmp"
//         >
//           Expired Walks
//         </button>
//       </div>
//       <br></br>
//       <div className="bodymyEmp">
//         <div className="cardContainer3">
//           <div className="table-responsive">
//             <table
//               id="table"
//               className="table table-hover table-stripped table-bordered"
//             >
//               <thead>
//                 <tr>
//                   <th>Booking S.No</th>
//                   <th>Booking Date</th>
//                   <th>From Time</th>
//                   <th>To Time</th>
//                   <th>Client Name</th>
//                   <th>Pet Name</th>
//                   <th>Payment Done</th>
//                   <th>Address</th>
//                   <th>Location</th>
//                   <th>Start Walk</th>
//                 </tr>
//               </thead>
//               <tbody>{renderTable()}</tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyEmpBooking;
import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import "./MyEmpBooking.css";
import $ from "jquery";
import { CgEnter } from "react-icons/cg";

function MyEmpBooking() {
  let filteredBookings = [];
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [showAllWalk, setShowAllWalk] = useState(true);
  const [myBookings, setMyBooking] = useState([]);
  const [showAllWalks, setShowAllWalks] = useState("");
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
        setMyBooking(d.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  useEffect(() => {
    if (myBookings.length > 0) {
      $("#table").DataTable();
    }
  });

  const renderTable = () => {
    filteredBookings = myBookings?.filter((booking) => {
      const bookingDate = new Date(booking.dateForBooking);
      const currentDateTime = new Date();

      if (showAllWalks === "Show All Walks") {
        return booking;
      } else if (showAllWalks === "Show Completed Walks") {
        return booking.completed;
      } else if (showAllWalks === "Not Paid Walks") {
        return !booking.paymetDuringBooking && !booking.completed;
      } else if (showAllWalks === "Upcoming Walks") {
        return !booking.completed && bookingDate > currentDateTime;
      } else if (showAllWalks === "Expired Walks") {
        return bookingDate < currentDateTime;
      } else return booking;
    });

    function conditionForWalk(
      time,
      date,
      totaltime,
      petId,
      transactionId,
      bookingId,
      clientId,
      walkerId
    ) {
      console.log("clientId: " + clientId);
      console.log("walkerId: " + walkerId);
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
          bookingId +
          "&walkerId=" +
          walkerId +
          "&clientId=" +
          clientId
      );
      // The booking is valid, you can proceed with the walk
      console.log("Booking is valid, you can start the walk");
    }

    return (
      <>
        {filteredBookings?.map((bookings, index) => {
          const dateArray = bookings.dateForBooking.split(" ");
          const fromTimeArray = bookings.fromTime.split(":");
          const toTimeArray = bookings.toTime.split(":");

          const fromTime =
            parseInt(fromTimeArray[0]) * 60 + parseInt(fromTimeArray[1]);
          const toTime =
            parseInt(toTimeArray[0]) * 60 + parseInt(toTimeArray[1]);
          const totalMinutes = toTime - fromTime;

          const totalHours = Math.floor(totalMinutes / 60);
          const totalMinutesRemaining = totalMinutes % 60;

          return (
            <tr>
              <td>{index + 1}</td>
              <td>{bookings.dateForBooking}</td>
              <td>{bookings.fromTime}</td>
              <td>{bookings.toTime}</td>
              <td>{bookings.clientName}</td>
              <td>{bookings.petName}</td>
              <td>
                {showPaymentStatus ? (
                  <input
                    type="checkbox"
                    checked={bookings.paymetDuringBooking}
                    disabled
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={bookings.paymetDuringBooking}
                    disabled
                  />
                )}
              </td>
              <td>{bookings.clientAddress}</td>
              <td>
                <button
                  className="buttonEmp"
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
                {!showAllWalk && (
                  <button
                    className="buttonEmp"
                    onClick={() => {
                      conditionForWalk(
                        bookings.fromTime,
                        bookings.dateForBooking,
                        totalMinutesRemaining,
                        bookings.petId,
                        bookings.transactionId,
                        bookings.id,
                        bookings.clientId,
                        bookings.walkerId
                      );
                    }}
                  >
                    Start Walk
                  </button>
                )}{" "}
                {showAllWalk && <p>Click Upcoming Walk to Start</p>}
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <Header1 />
      <h1 className="text-center lighterf mt-3 texthover">My Booking</h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button
          style={{ height: "55px", width: "250px", margin: "1px" }}
          onClick={() => {
            setShowAllWalk(true);

            setShowAllWalks("Show All Walks");
          }}
          className="buttonEmp"
        >
          showAllWalks
        </button>
        <button
          style={{ height: "55px", width: "250px", margin: 1 }}
          className="buttonEmp"
          onClick={() => {
            setShowAllWalk(true);
            setShowAllWalks("Show Completed Walks");
          }}
        >
          Show Completed Walks
        </button>
        <button
          onClick={() => {
            setShowAllWalk(false);
            setShowAllWalks("Upcoming Walks");
          }}
          style={{ height: "55px", width: "250px", margin: 1 }}
          className="buttonEmp"
        >
          Upcoming Walks
        </button>
        <button
          onClick={() => {
            setShowAllWalk(true);
            setShowAllWalks("Not Paid Walks");
          }}
          style={{ height: "55px", width: "250px", margin: 1 }}
          className="buttonEmp"
        >
          Not Paid Walks
        </button>{" "}
        <button
          onClick={() => {
            setShowAllWalk(true);
            setShowAllWalks("Expired Walks");
          }}
          style={{ height: "55px", width: "250px", margin: 1 }}
          className="buttonEmp"
        >
          Expired Walks
        </button>
      </div>
      <br></br>
      <div className="bodymyEmp">
        <div className="cardContainer3">
          <div className="table-responsive">
            <table
              id="table"
              className="table table-hover table-stripped table-bordered"
            >
              <thead>
                <tr>
                  <th>Booking S.No</th>
                  <th>Booking Date</th>
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
      </div>
    </div>
  );
}

export default MyEmpBooking;
