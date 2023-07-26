import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { getDashboardDetails } from "../../Services/AdminApi"
import StarIcon from '@mui/icons-material/Star';

function AdminDashboard() {
  const { userInfo } = useSelector((state) => {
    return state.loggedUser
  })
  const [details, setDetails] = useState("")
  useEffect(() => {
    getDashboardDetails().then((response) => {
      setDetails(response)
    }).catch((error) => {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    })
  }, [])
  console.log(details);
  return (
    <>
      <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
        <h4 className="text-xl text-gray-900 font-bold">Dashboard</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <div className="px-6 py-20 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-indigo-600">TOTAL SUBSCRIBERS</span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div>
                <svg className="w-28 h-28 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div className="flex flex-col px-7">
                <div className="flex items-end">
                  <span className="text-2xl 2xl:text-3xl font-bold">{ details.totalSubscribers }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-20 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-green-600">TOTAL USERS</span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div>
                <svg className="w-28 h-28 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div className="flex flex-col px-7">
                <div className="flex items-end">
                  <span className="text-2xl 2xl:text-3xl font-bold">{ details.totalUsers }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-20 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-green-600">TOTAL TRAINERS</span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div>
                <svg className="w-28 h-28 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div className="flex flex-col px-7">
                <div className="flex items-end">
                  <span className="text-2xl 2xl:text-3xl font-bold">{ details.totalTrainers }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-20 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-blue-600">TOTAL WORKOUTS</span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div>
                <svg
                  className="w-28 h-28 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16.364 3.636l4.95 4.95L20 10.828 13.172 4l-4.95 4.95m-1.414 1.414L3.636 16.364l6.364 6.364L10.828 20l-6.364-6.364 6.364-6.364M10.828 20l3.536-3.536 3.536 3.536L20 13.172l-3.536-3.536 3.536-3.536L13.172 4l-3.536 3.536L6.364 3.636 3.636 6.364 10 12.728 6.364 16.364 3.636 13.636 10 7.272l3.536 3.536L10 14.142" />
                </svg>
              </div>
              <div className="flex flex-col px-7">
                <div className="flex items-end">
                  <span className="text-2xl 2xl:text-3xl font-bold">{ details.totalWorkouts }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Top 5 workouts */ }
        <div className="relative mt-32 pb-30 overflow-x-auto px-30">
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
              { details.topWorkouts && details.topWorkouts.map((workout, index) => (
                < tr className="border-b border-border-[#FBFBFB]" >
                  <th className="px-10 py-10 font-normal text-gray-700 whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                      <img className="h-32 w-32 " src={ workout.thumbnailImage } alt="" />
                      <h3 className="text-base leading-6 tracking-tight text-gray-700">{ workout.workoutTitle }</h3>
                    </div>
                  </th>
                  <td className="px-10 py-10">{ workout.category }</td>
                  <td className="px-10 py-10">{ workout.level }</td>
                  <td className="px-10 py-20">{ workout.averageRating.toFixed(2) }<span className='text-yellow-500 mr-6'><StarIcon /></span><span>({ workout.totalRatingsCount })</span></td>
                  <td className="px-10 py-20">{ workout.favourites }</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div >

    </>
  )
}

export default AdminDashboard