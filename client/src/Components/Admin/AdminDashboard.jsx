import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import axios from "../../config/axios";
import { useSelector } from 'react-redux';

function AdminDashboard() {
  const { userInfo } = useSelector((state) => {
    return state.loggedUser
  })
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */ }
        <aside
          className={ `${ isOpen ? 'w-1/12' : 'w-2/12' } sidebar-blue text-white flex-shrink-0 transition-all duration-300 relative` }
        >
          {/* Toggle Button */ }
          <button
            onClick={ toggleSidebar }
            className="bg-gray-800 text-white w-16 h-16 absolute top-4 right-4 flex items-center justify-center rounded-full focus:outline-none"
          >
            { isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className=""
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) }
          </button>

          {/* Brand */ }
          <div className="p-4 mt-36">
            <h1 className="text-2xl font-bold">Brand</h1>
          </div>

          {/* Sidebar Menu */ }
          <nav className="flex-grow">
            <ul className="p-4">
              <li className="mb-2">
                <a href="#" className="block leading-10 text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block leading-10 text-gray-300 hover:text-white">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block leading-10 text-gray-300 hover:text-white">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block leading-10 text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content */ }
        <div className="flex-grow">
          {/* Header */ }
          <header className="sidebar-blue text-white h-48 flex-end items-center px-4">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-bold ml-auto">Header</h2>
              {/* Add your header content here */ }
              <div className="relative">
                <button
                  className="text-white focus:outline-none"
                  onClick={ toggleDropdown }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-10 w-10"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 4 } d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={ `absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg ${ isDropdownOpen ? 'visible' : 'invisible'
                    }` }
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </header>


          {/* Body */ }
          <div className="p-4">
            {/* Add your main content here */ }
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>


    </>
  )
}

export default AdminDashboard