import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import axios from "../../config/axios";

function AdminDashboard() {
  const data = useEffect(() => {
    async function fetchData() {
      // You can await here
      const refreshToken = Cookies.get("refreshToken");
        console.log(refreshToken);
      const response = await axios.post("/api/auth/refresh");
      console.log(response);
    }
    fetchData();
  }, []);
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard