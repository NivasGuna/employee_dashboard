import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const EmpListing = () => {
  const [empdata, empdatachange] = useState(null);
  // const [searchValid, searchValidchange] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const LoadDetail = (item) => {
    // setDetailpath("/employee/detail/" + id);
    navigate("/employee/detail/" + item.id,{state: { data: item }});
  };
  const LoadEdit = (item) => {
    // setEditpath("/employee/edit/" + id);
    navigate("/employee/edit/" + item.id,{state: { data: item }});
  };
  const Removefunction =async (id) => {
      if (window.confirm("Do you want to remove?")) {
        try {
          const response = await axios.delete(`http://localhost:8080/todos/${id}`);
          if (response.status === 200) {
            alert("Removed successfully.");
            window.location.reload();
          } else {
            console.log(`Unexpected status code: ${response.status}`);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    
  };

  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
        console.log(resp);

      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card text-center ">
        <div className="card-title">
          <h2 className="fs-2 mt-3 text-secondary">Employee Management System</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-7"></div>
            <div className="col-5">
              <input
                className="mx-3"
                type="text"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
                placeholder="Enter Name "
              />
              <Link
                to={"/employee/create"}
                className="btn btn-success my-4 mx-2"
              >
                Add New (+)
              </Link>
            </div>
          </div>

          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Employe ID</td>
                <td>Name</td>
                <td>Role</td>
                <td>Email</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>

                            {empdata &&
                                empdata.map (item=>(
                                    <tr key={item.id}>
                                        <td><div className="mt-3"> {item.id}</div>
                                         </td>
                                         <td><div className="mt-3">{item.empid}</div></td>
                                        <td><div className="mt-3">{item.name}</div></td>
                                        <td><div className="mt-3">{item.role}</div></td>
                                        <td><div className="mt-3">{item.email}</div></td>
                                        <td><div className=""><a onClick={() => { LoadEdit(item) }} className="btn btn-primary ml-5 m-3"><i class="bi bi-pencil-square me-2 mt-1"></i>Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger mx-2"><i class="bi bi-x-circle me-2"></i>Remove</a>
                                            <a  onClick={() => { LoadDetail(item) }} className="btn btn-info mx-2 text-dark"><i class="bi bi-info-circle  me-2"></i>More Details</a>
                                            </div></td>
                                    </tr>
                                ))
                            }

                        </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
