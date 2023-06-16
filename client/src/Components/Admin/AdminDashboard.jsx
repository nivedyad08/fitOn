import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import axios from "../../config/axios";
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';

function AdminDashboard() {
  const { userInfo } = useSelector((state) => {
    return state.loggedUser
  })
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */ }
        <Sidebar />

        {/* Content */ }
        <div className="flex-grow">
          {/* Header */ }
          <Header />
          {/* Body */ }
          <div className="p-4">
            {/* Add your main content here */ }
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>


    </>
  )
}

export default AdminDashboard