import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  // console.log(props.Logout);


  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid ">
          <Link className="navbar-brand text-white " href="#">
            <div className="mx-4 d-flex align-items-center fs-3 fw-bold" href="#"> <Link to={"/"} className="text-decoration-none text-info">LTI<span className="text-primary">M</span></Link> </div>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto p-2">
              <Link
                to="/"
                className="nav-link px-4 text-light "
                aria-current="page"
              >
                Home
              </Link>
              <Link to="/about" className="nav-link px-4 text-light">
                About
              </Link>
              {!props.Logout && (
                <Link to="/login" className="nav-link text-light  px-4 ">
                  Sign In
                </Link>
              )}
              {!props.Logout && (
                <Link to="/register" className="nav-link text-light px-4">
                  Sign Up
                </Link>
              )}
              {props.Logout && (
               
                <div>
                  <div class="btn-group">
                    <div class="btn-group dropleft">
                      <button type="button" class="btn text-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Profile
                      </button>
                     
                      {props.userData && (
                         <div class="dropdown-menu" style={{right:"1px", top:"55px"}}>
                          
                      <a class="dropdown-item" href="#"><span> <img src={props.userData.user.Profile}  width="25" height="25"/></span> {props.userData.user.Email}</a>
                      <a class="dropdown-item" href="#">{props.userData.user.Name}</a>
                      {/* <a class="dropdown-item" href="#"></a> */}
                      <div class="dropdown-divider"></div>
                      <Link class="dropdown-item nav-link  px-4 btn btn-primary" to="/login"> Signout</Link>
                    </div>
                     )}
                    </div>
                   
                   
                  </div>

                </div>
                
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

