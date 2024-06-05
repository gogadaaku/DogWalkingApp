import React from "react";
import Header1 from "../../../components/Header1";

function BookingHistory1() {
  return (
    <div>
      <Header1/>
      <h1 className="center" style={{fontWeight:"lighter"}}>Booking History</h1>
      <div className="container bg">
        <table style={{}} className="table table-striped table-hover table-bordered ">
            <thead>
                <tr>
                    <td>Booking Id</td>
                </tr>
            </thead>
        </table>
      </div>
    </div>
  );
}

export default BookingHistory1;
