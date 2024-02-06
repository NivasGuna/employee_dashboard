import {  useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const location = useLocation();
  const res = location.state && location.state.data;

   const [id, idchange] = useState(res.id);
   const [empid, empidChange] = useState(res.empid);
  const [name, namechange] = useState(res.name);
  const [email, emailchange] = useState(res.email);
  const [role, rolechange] = useState(res.role);
  const [experence, experencechange] = useState(res.experence);
  const [skill, skillchange] = useState(res.skill);
  const [company, companychange] = useState(res.company)
  const [secskill, secskillchange] = useState(res.secskill);
  const [phone, phonechange] = useState(res.phone);
   const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = {
      id,
      empid,
      name,
      email,
      role,
      experence,
      skill,
      secskill,
      phone,
      company
    };
    axios.put(`http://localhost:8080/todos/${id}`, {
    name:name,
    empid:empid,
    company:company,
    email:email,
    role:role,
    experence:experence,
    skill:skill,
    secskill:secskill,
    phone:phone

  })
    .then(() => {
      alert("Saved successfully.");
      navigate("/dashboard");
      console.log(empdata)
    })
    .catch((error) => {
      console.error(error.message);
    });
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={res.id}
                        disabled="disabled"
                        className="form-control mb-2"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                  <div className="form-group">
                      <label>Employee ID</label>
                      <input
                        value={res.empid}
                        disabled="disabled"
                        className="form-control mb-2"
                      ></input>
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control mb-2"
                      ></input>
                      {name.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control mb-2"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Role</label>
                      <input
                        value={role}
                        onChange={(e) => rolechange(e.target.value)}
                        className="form-control mb-2"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Experience</label>
                      <input
                        value={experence}
                        onChange={(e) => experencechange(e.target.value)}
                        className="form-control mb-2"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>PrimarySkill</label>
                      <input
                        value={skill}
                        onChange={(e) => skillchange(e.target.value)}
                        className="form-control mb-2"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>SecondarySkill</label>
                      <input
                        value={secskill}
                        onChange={(e) => secskillchange(e.target.value)}
                        className="form-control mb-2"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        value={company}
                        onChange={(e) => companychange(e.target.value)}
                        className="form-control mb-2"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => phonechange(e.target.value)}
                        className="form-control mb-2"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => activechange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input mb-2"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <div className="form-group ">
                      <button className="btn btn-success mx-4" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
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

export default EmpEdit;
