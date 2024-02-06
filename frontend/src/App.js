import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import { ToastContainer } from "react-toastify";
import Register from "./Register";
import Dashboard from "./Dashboard";
import About from "./About";
import EmpCreate from "./dashboards/EmpCreate";
import EmpDetail from "./dashboards/EmpDetails";
import EmpListing from "./dashboards/EmpListing";
import EmpEdit from "./dashboards/EmpEdit";
function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>

          {/* <Route path="/" element={<EmpListing />}></Route> */}
          <Route path="/employee/create" element={<EmpCreate />}></Route>
          <Route path="/employee/detail/:empid" element={<EmpDetail />}></Route>
          <Route path="/employee/edit/:empid" element={<EmpEdit />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
