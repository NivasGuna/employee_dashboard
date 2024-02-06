import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import EmpCreate from './dashboards/EmpCreate';
import EmpListing from './dashboards/EmpListing';
import Navbar from './Navbar'
import "./App.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [logout, updatelogout] = useState(false);
  useEffect(() => {
    fetchData();
  
  }, []);
  const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/user');
        setUserData(response.data);
        // console.log(response)
    } catch (error) {
        console.error('Error fetching data:', error);
    }

  }
  return (
    <div>
      <div>
        <Navbar Logout={updatelogout} userData={userData} />
      </div>
      <EmpListing/>

     

    </div>
  )
}

export default Dashboard