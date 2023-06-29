import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../redux-toolkit/slices/userSlice"

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.loggedUser.userInfo)

    const handleLogout = () => {
        Cookies.remove("accessToken")
        dispatch(logoutUser)
        navigate("/")
    }
    return (
        <header className="sidebar-blue text-white h-48 flex-end items-center px-6">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-bold ml-auto my-4 px-6">{ user.firstName }</h2>
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
                        className={ `absolute right-0 mt-2 py-2 w-80 h-90 bg-white rounded-md shadow-lg ${ isDropdownOpen ? 'visible' : 'invisible'
                            }` }
                    >
                        <a
                            onClick={ handleLogout }
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
