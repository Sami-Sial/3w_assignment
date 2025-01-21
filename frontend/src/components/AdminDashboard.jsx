import React, { useEffect } from 'react';
import "../stylesheets/adminDashboard.css"

import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers } from "../redux toolkit/admin.slice";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.adminSlice);
  console.log(users);

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [])

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1 style={{textAlign: "center", padding: "2rem", color: "#347136"}}>Admin Dashboard</h1>

      {users && <div id='table-header'>
        <p>Name</p>
        <p>Display Name</p>
        <p>Profile Pic</p></div>
      }

      {Array.isArray(users) && users
        && users.map((user) => 
          <div key={user._id} id="user-table-wrapper">
            
          <p>{user.name}</p>
          <p>{user.displayName}</p>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              
              {user.images.map((image) => 
                <div key={image.filename} style={{width:"50px", height: "50px"}}>
                  <Link to={image.url}>

                    <img src={image.url} style={{ width: "100%", height: "100%", cursor: "pointer", border: "1px solid #347136", borderRadius: "50%", marginRight: "10px" }} alt="" />
                    
                  </Link>
                </div>
              )}

          </div>
        </div>
      )
      }
    </div>
  )
}

export default AdminDashboard
