
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import "../stylesheets/signup.css";
import Loader from "./Loader";


import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux toolkit/user.slice";


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading, success } = useSelector(state => state.userSlice);

  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  }

  const registerSubmit = async(e) => {
      e.preventDefault();
      
      let formData = { displayName, password };
        
      dispatch(login(formData));
  };
  
  useEffect(() => {
    if (success) {
      toast.success(success);
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error);
    }
  },[ error, success])

     
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
                <h1>App Login</h1>
                    
                <div className="input">
                    <label htmlFor="displayName">Display Name</label>
                  <input
                    type="text"
                    placeholder="Social Media Handle"
                    required
                    id='displayName'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    autoComplete='true'
                />
                </div>
                        
                <div className="input">
                    <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='true'
                />
                </div>

                <input type="submit" value="Login" id="signup-btn" />
              </form>
       
          </div>  
        }
        </>
    )
}

export default Signup
