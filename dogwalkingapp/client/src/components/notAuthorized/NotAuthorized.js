import React from "react";
import image from "../../images/brown-dog-sitting-with-tongue-out-removebg-preview.png"
import { useNavigate } from "react-router-dom";

function NotAuthorized() {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img src={image} alt="Not Authorized" />
        <h1>You Are Not Authorized To View This Content</h1>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Return To Home Page
        </button>
      </div>
    </div>
  );
}

export default NotAuthorized;
