import React, { useEffect, useState } from "react";
import Header1 from "../../../components/Header1";
import axios from "axios";

function Management() {
  //To store all breeds fetched form database
  const [breed, setBreed] = useState([]);
  // To fetch data automatically after rendering
  useEffect(() => {
    fetch();
  }, []);
  //Method: To fetch data 
  const fetch = () => {
    axios
      .get("https://localhost:7072/api/Breed")
      .then((d) => {
        console.log(d.data);
        setBreed(d.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Header1 />
      <div className="row">
        <div className="col-4 ">
          <h2>Breed&nbsp;List</h2>
        </div>
        <div
          style={{ position: "absolute", marginLeft: 1000 }}
          className="col-lg-4"
        >
          <button className="btn btn-primary  form-control">
            Add New Breed
          </button>
        </div>
      </div>
      <div className="border">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default Management;
