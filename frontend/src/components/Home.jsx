import React from 'react';
import "../stylesheets/home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

  return (
    <>
        <div id="home-wrapper">
              <h1>Homepage</h1>
              <div>
                  <button onClick={() => navigate("/signup")}>Sign Up</button>
                  <button onClick={() => navigate("/login")}>Login</button>
              </div>
      </div>
    </>
  )
}

export default Home
