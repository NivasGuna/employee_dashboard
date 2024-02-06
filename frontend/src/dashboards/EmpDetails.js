import { Link} from "react-router-dom";
import { useLocation } from 'react-router-dom';


const EmpDetail = () => {
  const location = useLocation();
  const res = location.state && location.state.data;
  return (
    <div>
      <div className="container">
        <div className="card row  mt-5 pt-3 ps-4 ">
          <div className="card-title text-secondary">
            <h2 className="text-center pt-2">Employee Details</h2>
          </div>
          <div className="card-body"></div>

          {res && (
            <div>
              <h3 className="text-start">
                The Employee name is : <b>{res.name}</b>
              </h3>
              <h3 className="text-start mt-2">Contact Details</h3>
              <div>
              <h5 className="my-3">Employee Id : {res.empid}</h5>
                <h5 className="my-3">Email Id : {res.email}</h5>
                <h5 className="mb-3">Role of the employee : {res.role}</h5>
                <h5 className="mb-3">Experience of the employee: {res.experence}</h5>
                <h5 className="mb-3">primarySkill of the employee : {res.skill}</h5>
                <h5 className="mb-3">secondarySkill of the employee : {res.secskill}</h5>
        
                <h5 className="mb-3">Phone number : {res.phone}</h5>
              </div>
              <Link to="/dashboard" className="btn btn-danger my-3 mx-5">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpDetail;
