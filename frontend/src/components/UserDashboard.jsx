import React from 'react';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", height: "100vh", justifyContent: "center" }}>
      
      <h1>User Dashboard</h1>
      <p>To see Admin Dashboard Login with these credentials.</p>
      <p>Display Name: @ankur-thapliyal</p>
      <p>Password: @ankur</p>
      <button style={{padding: "5px 10px", backgroundColor: "#347136", color: "white", border: "none", cursor: "pointer"}} onClick={() => navigate("/")}>HomePage</button>

    </div>
  )
}

export default UserDashboard
