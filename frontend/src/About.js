import React from "react";
import Navbar from "./Navbar";
import "./App.css"

function About() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar />
      </div>
      <div className="row">
        <div className="col">
          <img
            src="../../assets/dashboard1.jpg"
            className="img-fluid m-4 p-3 rounded"
            alt="..."
            style={{ float: "left", width: "90%" }}
          />
        </div>
        <div className="col" style={{ marginTop:"40px"}}>
          <h1 className="text-danger mt-3">Employee Management System</h1>
          <p className="text-secondary pt-3 text-justify  fs-4">
            An employee management system is a software, that helps <br/> your
            employees to give their best efforts every day to achieve the goals
            of your organization.It guides and manages efforts in the
            right direction. It also securely stores and manages personal and
            other work-related details for your employees. That makes it easier
            to store and access the data when there is a need.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1 className="text-danger my-4 mx-5 ">Employee Self-Service Portal</h1>
          <p className="text-secondary pt-3 text-start  fs-4 mx-5">
            This portal has the most efficient and dedicated platform for
            employees to access information regarding their skills and manager
            details. This saves a lot of time for your staff as they do not need
            to approach the human resources team every time they need some kind
            of information.
          </p>
        </div>
        <div className="col"> <img src="../../assets/dashboard2.jpg" style={{ float: "right",marginTop:"55px", width: "90%" }} class="img-fluid rounded m-3 pb-4" alt="..." /></div>
      </div>
      {/* <div className="row">
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div className="col-4"></div>
      </div>
      <div className="row">
        <div className="col-4 d-flex">
          <div className="col">
           
          </div>
          <div className="col">
            <h3>Employee Engagement</h3>
            <p>
              With a self-service portal, employees are more engaged and feel
              more empowered in your organization
            </p>
          </div>
        </div>
        <div className="col-4"></div>
        <div className="col-4"></div>
      </div> */}
    </div>
  );
}

export default About;
