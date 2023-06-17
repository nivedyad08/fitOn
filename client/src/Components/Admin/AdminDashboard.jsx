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
      <h1>Dashboard</h1>
    </>
  )
}

export default AdminDashboard