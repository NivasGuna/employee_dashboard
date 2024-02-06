import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <div>
        <div className="container-fluid">
          <div className="row">
            <Navbar />
          </div>
          <div className="row">
            <div className="col">
              <img
                src="../../assets/landingimg.jpg"
                width="100%"
                className="img-fluid"
                alt="..."
                style={{ float: "left" }}
              />
            </div>
            <div className="col mt-3">
              <h5 className="my-5 py-4 fs-1" >
                <span className="text-danger"> Enhance Productivity </span> with
                an Employee Management System
              </h5>
              <p className="my-2 fs-4 text-secondary">
                Get cutting-edge tools for managing employees with EMS
                <span className="text-danger d-block">
                  and motivate your team to perform at their highest level.
                </span>
              </p>
            
              <Link to="/login">
                <button type="button" className="btn btn-primary btn-lg ">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn btn-danger btn-lg  m-4">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React from "react";

// function LandingPage() {
//   const usenavigate = useNavigate();
//   return (
//     <div>
//       <div className="container">
//         <div className="row d-flex">
//         <div className="col">
//         <div>
//       <div className="container">
//         <div className="row">
//           <div className="col">
//           <img
//           src="../../assets/landingimg.jpg"
//           width="100%"
//           className="img-fluid"
//           alt="..."
//           style={{ float: "left" }}
//         />
//           </div>
//           <div className="col">

//           </div>
//         </div>

//       </div>
//     </div>
//           </div>
//           <div className="col">
//           <img
//           src="../../assets/landingimg.jpg"
//           width="100%"
//           className="img-fluid"
//           alt="..."
//           style={{ float: "left" }}
//         />
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default LandingPage;
