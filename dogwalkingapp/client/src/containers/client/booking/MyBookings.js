import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import Header1 from "../../../components/Header1";
import { useTranslation } from "react-i18next";
import $ from "jquery";
import "./MyBooking.css";
function MyBookings() {
  const id = sessionStorage.getItem("id");
  const [bookings, setBookings] = useState([]);
  const [totalTime, setTotalTime] = useState(null);
  const { t } = useTranslation();
  const [buttonText, setButtonText] = useState("");
  useEffect(() => {
    getAllUserBookings();
  }, []);
  useEffect(() => {
    if (bookings.length > 0) {
      $("#booking").DataTable();
    }
    renderTable();
  }, [bookings, buttonText]);

  function getAllUserBookings() {
    axios
      .get("https://localhost:7072/api/Booking/" + id + "/hello")
      .then((d) => {
        const transformedData = d.data?.map((items) => {
          let fromTime = items.fromTime;
          let toTime = items.toTime;
          const fromTime1 = new Date(
            `2024-06-03 ${fromTime}`
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const toTime1 = new Date(`2024-06-03 ${toTime}`).toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          );
          return {
            ...items,
            fromTime: fromTime1,
            toTime: toTime1,
          };
        });
        console.log("data", d.data);
        // setBookings(d.data);
        setBookings(transformedData);
      })
      .catch((d) => {
        console.log(d);
      });
  }
  function totalMinutes(fromTime, toTime) {
    if (typeof fromTime === "string" && typeof toTime === "string") {
      const fromTimeArray = fromTime.split(":");
      const toTimeArray = toTime.split(":");

      const fromHours = parseInt(fromTimeArray[0]);
      const fromMinutes = parseInt(fromTimeArray[1]);
      const toHours = parseInt(toTimeArray[0]);
      const toMinutes = parseInt(toTimeArray[1]);

      const fromTotalMinutes = fromHours * 60 + fromMinutes;
      const toTotalMinutes = toHours * 60 + toMinutes;

      const totalMinutes = toTotalMinutes - fromTotalMinutes;
      return totalMinutes;
    }
  }
  function renderTable() {
    // return bookings?.map((item, index) => (
    //   <tr key={index}>
    //     <td>{item.petName}</td>
    //     <td>{item.walkerName}</td>
    //     <td>{`${totalMinutes(item.fromTime, item.toTime)} Minutes`}</td>
    //     <td>{item.dateAndTimeOfBooking}</td>
    //     <td>{item.fromTime}</td>
    //     <td>{item.toTime}</td>
    //   </tr>
    // ));
    const filteredBookings = bookings?.filter((items) => {
      const currentDate = new Date();
      const bookingDate = new Date(items.dateForBooking);
      if (buttonText === "Show All Bookings") {
        return items;
      } else if (buttonText === "Show Completed Bookings") {
        return items.completed;
      } else if (buttonText === "Show Not Completed") {
        return !items.completed;
      } else if (buttonText === "Future Bookings") {
        return !items.completed && bookingDate > currentDate;
      }
      return items;
    });
    return filteredBookings?.map((item, index) => (
      <tr key={index}>
        <td>{item.petName}</td>
        <td>{item.walkerName}</td>
        <td>{`${totalMinutes(item.fromTime, item.toTime)} Minutes`}</td>
        <td>{item.dateForBooking}</td>
        <td>{item.fromTime}</td>
        <td>{item.toTime}</td>
      </tr>
    ));
  }

  return (
    <div>
      <Header1 />
      <h1 className="center">{t("MyBookings")}</h1>
      <div className="displaybutton mb-5 mt-5">
        <button
          style={{ width: 150, height: 55 }}
          onClick={() => {
            setButtonText("Show All Bookings");
          }}
          className="buttonEmp"
        >
          Show All Bookings
        </button>
        <button
          onClick={() => {
            setButtonText("Show Completed Bookings");
          }}
          style={{ width: 150, height: 55 }}
          className="buttonEmp"
        >
          Show Completed Bookings
        </button>
        <button
          onClick={() => {
            setButtonText("Show Not Completed");
          }}
          style={{ width: 150, height: 55 }}
          className="buttonEmp"
        >
          Show Not Completed
        </button>
        <button
          onClick={() => {
            setButtonText("Future Bookings");
          }}
          style={{ width: 150, height: 55 }}
          className="buttonEmp"
        >
          Future Bookings
        </button>
      </div>
      <div className="body3">
        <div className="containerCard">
          <div style={{ marginTop: 30 }}>
            <table
              id="booking"
              className="table table-hover table-stripped table bordered"
            >
              <thead>
                <tr>
                  <th>{t(`Dog Name`)}</th>
                  <th>{t("Walker Name")}</th>
                  <th>{t("Minutes of walk")}</th>
                  <th>{t("Date & Time for Booking")}</th>
                  {/* <th>{t("Date For Booking")}</th> */}
                  <th>{t("From Time")}</th>
                  <th>{t("To Time")}</th>
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

export default MyBookings;
