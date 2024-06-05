import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigations/Routes";
import $ from "jquery"
function EmployeeHistory() {
  const [employeeHistoryData, setEmployeeHistoryData] = useState({
    data: [],
    isLoading: true,
    error: null,
  });
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  const queryparams = useQuery();
  const id = queryparams.get("id");
  const name = queryparams.get("name");
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(id);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7072/api/EmployeeBooking/employeeClientHistory/" +
            id
        );
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

          const time2 = new Date(`2024-06-03 ${time1}`).toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          );
          console.log(date, time);
          console.log("date1", date1, "time1", time1);
          return {
            ...data,
            dateAndTimeOfBooking: date,
            dateForBooking: date1,
            timeForBooking: time2,
            timeOfBooking: time12,
          };
        });
        console.log(transformedData);

        setEmployeeHistoryData({
          data: transformedData,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setEmployeeHistoryData({
          data: [],
          isLoading: false,
          error: error.message,
        });
      }
    };
    fetchData();
  }, [id]);
  useEffect(()=>{
if(employeeHistoryData.data.length>0){
$("#table").DataTable();
}
  },[employeeHistoryData.data.length])
  const renderTable = () => {
    return employeeHistoryData.data.map((item) => {
      let timeofbook = item.timeOfBooking;
      if (timeofbook.length > 0) {
        const time12Hour = new Date(
          `2024-06-03 ${timeofbook}`
        ).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
        console.log("timeofbook", time12Hour);
      }
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.clientId}</td>
          <td>{item.dateAndTimeOfBooking}</td>
          <td>{item.timeOfBooking}</td>
          <td>{item.dateForBooking}</td>
          <td>{item.timeForBooking}</td>
          {item.completed ? (
            <td>Completed</td>
          ) : (
            <td>
              <p>Not Completed</p>
            </td>
          )}
          {item.transactionId ? <td>Paid</td> : <td>Not Paid</td>}
          {item.completed ? (
            <td>
              <button
                onClick={() => {navigate(ROUTES.employeeWalkDetail.name+"?bookingId="+item.id)}}
                style={{ height: 50 }}
                className="buttonEmp"
              >
                View Detail
              </button>
            </td>
          ) : (
            <td>
              <div className="center">
                <button style={{ height: 50 }} className="buttonEmp">
                  No Details
                </button>
              </div>
            </td>
          )}
        </tr>
      );
    });
  };
  return (
    <div>
      <Header1 />
      <div className="center">
        {/* {image && <img src={`data:image/png;base64,${image}`} />} */}
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1 style={{ marginTop: 30, fontWeight: "lighter" }}>
          Employee History
        </h1>
        <h1 style={{ marginTop: 30, fontWeight: "lighter" }}>{name}</h1>
        <h1 style={{ marginTop: 30, fontWeight: "lighter" }}>{id}</h1>
      </div>
      <div className="divstyleadmin">
        <div className="card11">
          <table id="table"
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
}

export default EmployeeHistory;
