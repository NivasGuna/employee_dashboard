import { useState } from "react";
import axios from 'axios';

import { Link, useNavigate } from "react-router-dom";

const EmpCreate = () => {


//  const [id, idchange] = useState();
   const [empid, empidChange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [role, rolechange] = useState("");
  const [experence, experencechange] = useState("");
  const [skill, skillchange] = useState("");
  const [company, companychange] = useState("")
  const [secskill, secskillchange] = useState("");
  const [phone, phonechange] = useState("");
  const [active, activechange] = useState(true);
 const [validation, valchange] = useState(false);


  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/todos", {
      name:name,
      empid:empid,
      role:role,
      email:email,
      company:company,
      experence:experence,
      skill:skill,
      secskill:secskill,
      phone:phone
  
    }
    )
    .then((res) => {
      alert("Saved successfully.");
      navigate("/dashboard");
     
    })
    
    .catch((err) => {
      console.log(err.message);
    });
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" >
            <div className="card" style={{ textAlign: "left", margin: "20px" }}>
              <div className="card-title">
                <h2 className="fs-2 text-center text-secondary my-2">
                  Add Employee Data
                </h2>
              </div>
              <div className="card-body">
                <div className="row">

                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <label>Employee ID</label>
                      <input
                        type="number"
                        required
                        value={empid}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => empidChange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter Employee ID</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control mb-3"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Role</label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => rolechange(e.target.value)}
                        className="form-control mb-3"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>experence</label>
                      <input
                        type="number"
                        value={experence}
                        onChange={(e) => experencechange(e.target.value)}
                        className="form-control mb-3"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => companychange(e.target.value)}
                        className="form-control mb-3"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>skill</label>
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => skillchange(e.target.value)}
                        className="form-control mb-3"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>secskill</label>
                      <input
                        type="text"
                        value={secskill}
                        onChange={(e) => secskillchange(e.target.value)}
                        className="form-control mb-3"
                      ></input>
                    </div>
                  </div>

                 

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => phonechange(e.target.value)}
                        className="form-control mb-3"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => activechange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input mb-3"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <div className="form-group">
                      <Link to="/dashboard">
                        <button onClick={handlesubmit} className="btn btn-success mx-3 px-3" type="submit">
                          Save
                        </button>
                      </Link>
                      <Link to="/dashboard" className="btn btn-danger mx-3 px-3">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpCreate;
