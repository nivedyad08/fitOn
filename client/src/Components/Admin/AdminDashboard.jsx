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
      <div className="grid md:grid-cols-4 gap-y-10 gap-x-24 px-32">
        <div className="rounded-lg mb-3 sm:mb-0 border border-gray-300">
          <div className="max-w-7xl mx-8 sm:mx-auto py-8 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block text-xl text-gray-500">TOTAL MEMBERS</span>
              <span className="block text-5xl font-bold text-gray-700">2</span>
            </h2>
          </div>
        </div>

        <div className="rounded-lg mb-3 sm:mb-0 border border-gray-300">
          <div className="max-w-7xl mx-8 sm:mx-auto py-8 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block text-xl text-gray-500">TOTAL USERS</span>
              <span className="block text-5xl font-bold text-gray-700">2</span>
            </h2>
          </div>
        </div>
        <div className="rounded-lg mb-3 sm:mb-0 border border-gray-300">
          <div className="max-w-7xl mx-8 sm:mx-auto py-8 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block text-xl text-gray-500">TOTAL TRAINERS</span>
              <span className="block text-5xl font-bold text-gray-700">2</span>
            </h2>
          </div>
        </div>
        <div className="rounded-lg mb-3 sm:mb-0 border border-gray-300">
          <div className="max-w-7xl mx-8 sm:mx-auto py-8 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block text-xl text-gray-500">TOTAL WORKOUTS</span>
              <span className="block text-5xl font-bold text-gray-700">2</span>
            </h2>
          </div>
        </div>
      </div>
      {/* Top 5 workouts */}
      <div className="relative mt-52 overflow-x-auto px-30">
        <h2 className='text-2xl mb-10 font-bold tracking-wide text-gray-700'>TOP 5 WORKOUTS</h2>
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
          <thead className="text-xs uppercase bg-[#EFEFF2] text-[#7D7E93] ">
            <tr>
              <th className="px-10 py-10">Workout Title</th>
              <th className="px-10 py-10">Level</th>
              <th className="px-10 py-10">Workout Category</th>
              <th className="px-10 py-10">Rating</th>
              <th className="px-10 py-10">Added to favourites</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border-[#FBFBFB]">
              <th className="px-10 py-20 font-normal text-gray-700 whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                  <img className="h-40 w-40 " src="/images/cover-placeholder.png" alt="" />
                  <h3 className="text-base leading-6 tracking-tight text-gray-700">Silver</h3>
                </div>
              </th>
              <td className="px-10 py-20">Silver</td>
              <td className="px-10 py-20">Laptop</td>
              <td className="px-10 py-20">$2999</td>
              <td className="px-10 py-20">$2999</td>
            </tr>
            <tr className="border-b border-border-[#FBFBFB]">
              <th className="px-10 py-10 font-medium text-gray-700 whitespace-nowrap">
                Microsoft Surface Pro
              </th>
              <td className="px-10 py-20">White</td>
              <td className="px-10 py-20">Laptop PC</td>
              <td className="px-10 py-20">$1999</td>
              <td className="px-10 py-20">$1999</td>
            </tr>
            <tr className="border-b border-border-[#FBFBFB]">
              <th className="px-10 py-10 font-medium text-gray-700 whitespace-nowrap">
                Magic Mouse 2
              </th>
              <td className="px-10 py-20">Black</td>
              <td className="px-10 py-20">Accessories</td>
              <td className="px-10 py-20">$99</td>
              <td className="px-10 py-20">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminDashboard