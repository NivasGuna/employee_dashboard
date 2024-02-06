import React from "react";
import axios from 'axios';
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
const Register = () => {
  const usenavigate = useNavigate();
  //  const [id, idChange] = useState();
  const [username, usernameChange] = useState("");
  const [password, passwordChange] = useState("");
  const [cnfpss, cnfpssChange] = useState("");
  const [email, emailChange] = useState("");
  const [name, nameChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [check, setCheck] = useState(false);
  const [gender, genderChange] = useState("");
  const isValidate = () => {
    let isProceed = true;
    let errormessage = "Please enter the value in ";
    if (username === null || username === "") {
      isProceed = false;
      errormessage += "Username";
    }
    if (password === null || password === "") {
      isProceed = false;
      errormessage += "password";
    }
    if (password !== cnfpss) {
      isProceed = false;
      errormessage = "password and confirm Password should be same";
    }
    if (cnfpss === null || cnfpss === "") {
      isProceed = false;
      errormessage += "Confirm Password";
    }
    if (name === null || name === "") {
      isProceed = false;
      errormessage += "Full Name";
    }
    if (email === null || email === "") {
      isProceed = false;
      errormessage += "Email";
    }

    if (!isProceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isProceed = false;
        toast.warning("please enter the valid email ");
      }
    }
    return isProceed;
  };
  const handleSubmit = async (e) => {
  e.preventDefault();


  if (isValidate()) {
    try {
      const response = await axios.post('http://localhost:8080/register', {
        name:name,
        cnfpss:cnfpss,
        password:password,
        email:email,
        gender:gender,
         phone:phone,
         username:username
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Registered Successfully');
       usenavigate("/login");

      } else {
        toast.error('Registration Failed');
      }
    } catch (error) {
      toast.error('Failed: ' + error.message);
    }
  }
};

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
      </div>

      <div className="row">
        <div className="col-5 mt-5">
          <img
            src="../../assets/signup.png"
            width="150%%"
            className="img-fluid img"
            alt="..."
            style={{ float: "left" }}
          />
        </div>

        <div className="col mt-3">
          <form className="container " onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header  bg-danger text-light text-light ">
                <h3 className="p-1 text-center headings">User Registration</h3>
              </div>
              <div className="card-body">
                <div className="row p-2">
                  <div className="col-lg-6">
                    <div className="form-group ">
                      <label>
                        User Name
                        <span className="errmsg text-danger my-4">*</span>
                      </label>
                      <input
                        className="form-control border-2 mt-2"
                        value={username}
                        onChange={(e) => usernameChange(e.target.value)}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Full Name
                        <span className="errmsg text-danger">*</span>
                      </label>
                      <input
                        className="form-control my-2"
                        value={name}
                        onChange={(e) => nameChange(e.target.value)}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Password
                        <span className="errmsg text-danger mb-3">*</span>
                      </label>
                      <input
                        className="form-control my-2"
                        value={password}
                        onChange={(e) => passwordChange(e.target.value)}
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Confirm Password
                        <span className="errmsg text-danger">*</span>
                      </label>
                      <input
                        value={cnfpss}
                        onChange={(e) => cnfpssChange(e.target.value)}
                        className="form-control my-2"
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Email <span className="errmsg text-danger">*</span>
                      </label>
                      <input
                        value={email}
                        onChange={(e) => emailChange(e.target.value)}
                        className="form-control my-2"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                    <label>Phone</label>
                      <input
                        // type="text"
                        value={phone}
                        onChange={(e) => phoneChange(e.target.value)}
                        className="form-control mb-3"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group ">
                      <label className="my-1">
                        Gender<span className="errmsg text-danger">*</span>
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        checked={gender === "male"}
                        onChange={(e) => genderChange(e.target.value)}
                        name="gender"
                        value="male"
                        className="app-check my-1"
                        required
                      ></input>

                      <label className="mx-2">Male</label>
                      <input
                        checked={gender === "female"}
                        onChange={(e) => genderChange(e.target.value)}
                        type="radio"
                        name="gender"
                        value="female"
                        className="app-check pt-2 mb-2"
                        required
                      ></input>
                      <label className="mx-2">Female</label>
                    </div>
                  </div>
                  <div class="form-check mt-2 " style={{ marginLeft: "10px" }}>
                    <input
                      className="form-check-input "
                      type="checkbox"
                      checked={check}
                      onChange={(e) => setCheck(e.target.checked)}
                      id="flexCheckDefault"
                      required
                    />
                    <label class="form-check-label ml-2" for="flexCheckDefault">
                      <Link className="text-decoration-none text-dark mb-0">
                        I Agree with Terms & Conditions
                      </Link>
                    </label>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-primary  ">
                  Register
                </button>
                <Link to={"/login"} className="btn btn-danger mx-4 px-4">
                  Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Register;
