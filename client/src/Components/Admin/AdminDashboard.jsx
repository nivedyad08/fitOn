import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import axios from "../../config/axios";
import { useSelector } from 'react-redux';

function AdminDashboard() {
  const { userInfo } = useSelector((state) => {
    return state.loggedUser
  })
  console.log(userInfo);
  return (
    <div>Test</div>
  )
}

export default AdminDashboard