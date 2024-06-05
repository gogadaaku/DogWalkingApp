import React, { useEffect, useMemo, useState } from "react";
import Header1 from "../../../components/Header1";
import "./PetHistory.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
function PetHistory() {
  const [petHistoryData, setPetHistoryData] = useState({
    data: [],
    isLoading: true,
    error: null,
  });
  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };
  const queryParams = useQuery();
  const petId = queryParams.get("petId");
  const name = queryParams.get("name");
  useEffect(() => {
    const fetchPetHistory = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7072/api/EmployeeBooking/PetHistory/" + petId
        );
        setPetHistoryData({
          data: response.data,
          isLoading: false,
          error: null,
        });
        console.log(response.data);
      } catch (error) {
        setPetHistoryData({
          ...petHistoryData,
          isLoading: false,
          error: error.message,
        });
      }
    };
    fetchPetHistory();
  }, []);
  useEffect(() => {
    if (petHistoryData.data.length > 0) {
      $("#table").DataTable();
    }
  });
  const [petBookings, setPetBookings] = useState([]);
  const renderTable = () => {
    return petHistoryData.data?.map((items) => {
      const time12 = new Date(`2024-06-03 ${items.startTime}`).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }
      );

      return (
        <tr>
          <td style={{ width: "100px", textAlign: "center" }}>{items.id}</td>
          <td style={{ width: "300px", textAlign: "center" }}>
            {items.dateOfWalk}
          </td>
          <td style={{ width: "100px", textAlign: "center" }}>
            {items.walkerId}
          </td>
          <td style={{ width: "320px", textAlign: "center" }}>
            {time12}
          </td>
          <td style={{ width: "200px" }}>
            <button style={{ borderRadius: 10, padding: 10 }}>
              View Walk Detail
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <Header1 />

      <h1 className="text-center" style={{ fontWeight: "lighter" }}>
        Pet History
      </h1>
      <div className="card" style={{ width: "auto", margin: "auto" }}>
        <h3 className="text-center" style={{ fontWeight: "lighter" }}>
          Pet Name: {name}
        </h3>
        <h3 className="text-center" style={{ fontWeight: "lighter" }}>
          Pet Id: {petId}
        </h3>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="card55"
          style={{ padding: 30, margin: "auto", marginTop: 10 }}
        >
          <table
            id="table"
            className="table table-bordered table-hover table-stripped"
          >
            <thead>
              <tr>
                <th style={{ width: "100px", textAlign: "center" }}>
                  Walk Id{" "}
                </th>
                <th style={{ width: "300px", textAlign: "center" }}>
                  Date of Walks
                </th>
                <th style={{ width: "100px", textAlign: "center" }}>
                  Walker Id
                </th>
                <th style={{ width: "320px", textAlign: "center" }}>
                 Start Walk Time
                </th>
                <th style={{ width: "200px", textAlign: "center" }}>
                  Walk Details
                </th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PetHistory;
