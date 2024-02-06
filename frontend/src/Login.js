import React from "react";
import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import Navbar from "./Navbar";
const Login = () => {
  const [username, usernameUpdate] = useState("");
  const [Password, passwordUpdate] = useState("");
  const [error, setError] = useState('');


  const usenavigate = useNavigate();
  

  const ProceedLogin =async (e) => {
    e.preventDefault();

     if (validate()) {
      try {
        const response = await axios.post('http://localhost:8080/login', {
          UserName: username,
          Password: Password,
        });
  
        if (response.status === 200) {
          // Handle successful login
          console.log('Login successful');
          toast.success("Logged successfully");
       usenavigate("/dashboard");
        }
      } catch (error) {
        setError('Invalid credentials');
        console.error('Login failed:', error.message);
      }
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter User Name");
    }
    if (Password === "" || Password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <div className="container-fluid">
      <div className="row ">
        <Navbar />
      </div>
      <div className="row">
        <div className="col-5">
          <img
            src="../../assets/signin.png"
            className="img-fluid"
            alt="..."
            style={{ float: "left", width: "100%" }}
          />
        </div>
     
      <div className=" col-6 text-center" style={{marginTop:'100px'}}>
        <form onSubmit={ProceedLogin} className="container ">
          <div className="card ">
            <div className="card-header text-center bg-primary text-light py-2">
              <h2 lassName="p-2 text-center headings">User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-gorup">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  className="form-control my-3"
                  value={username}
                  onChange={(e) => usernameUpdate(e.target.value)}
                ></input>
              </div>
              <div className="form-gorup">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  className="form-control my-3"
                  value={Password}
                  onChange={(e) => passwordUpdate(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="card-footer text-center p-4" style={{height:"70px"}}>
              <button type="submit" className="btn btn-primary mx-4">
                Login
              </button>
              
              <Link className="btn btn-success" to={"/register"}>
                Register
              </Link>
            </div>
            <div style={{fontSize:"20px", backgroundColor:"#00000008", height:"40px"}}>
              <p>or</p>
            </div>
            <div style={{backgroundColor: "#00000008"}}> 
            <button className="px-2 py-2 mb-4"> 
              <i class="bi bi-google"></i> < a style={{textDecoration:"none"}}href="http://localhost:8080/login">Login with Google</a> 
              </button>
            </div>
          </div>
        </form>
      </div>
    </div> </div>
  );
};

export default Login;
