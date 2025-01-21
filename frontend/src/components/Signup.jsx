import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import "../stylesheets/signup.css";
import Loader from "./Loader";


import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux toolkit/user.slice";


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, isLoading, success } = useSelector(state => state.userSlice);

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = useState([]);
  const [nameMsg, setNameMsg] = useState("");

  const registerSubmit = async(e) => {
    e.preventDefault();
   
    const formData = {name, displayName, password, images}
        
    dispatch(signup(formData));
  };
  
  useEffect(() => {
    if (success) {
      toast.success(success);
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error);
    }
  },[isAuthenticated, error, success])

     
    return (
        <>
        {isLoading ? <Loader/> :
           <div id='signup-form-wrapper'>            
            <form
                id='signup-form'
                method='post'
                className="signUpForm"
                onSubmit={registerSubmit}
              >
                <h1>App Signup</h1>
                    
               <div className="input">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='true'
                  />
                    </div>
                    
                <div className="input">
                    <label htmlFor="displayName">Unique Display Name</label>
                  <input
                    type="text"
                    placeholder="Social Media Handle"
                    required
                    id='displayName'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    autoComplete='true'
                />
                {nameMsg && <p>{ nameMsg }</p>}
                </div>

                <div className="input">
                    <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="input">
                    <label htmlFor="images">Gallery Images</label>
                  <input
                    type="file"
                    required
                    id='images'
                    accept='image/*'
                    name='images'
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                  />
                </div>

                <input type="submit" value="Register" id="signup-btn" />
              </form>
       
          </div>  
        }
        </>
    )
}

export default Signup
