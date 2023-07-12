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
    console.log(user.firstName);

    const handleLogout = () => {
        Cookies.remove("accessToken")
        dispatch(logoutUser)
        navigate("/login")
    }
    return (
        <header className="sidebar-blue text-white h-48 flex-end items-center px-6">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center ml-auto">
                    <div className="relative ml-16 cursor-pointer">
                        <div className="relative inline-flex items-center mt-8 justify-center w-36 h-36 overflow-hidden bg-yellow-500 rounded-full dark:bg-yellow-700" onClick={ toggleDropdown }>
                            <span className="font-medium text-gray-600 dark:text-gray-300">AD</span>
                        </div>
                        <div
                            className={ `absolute right-20 mt-2 py-2 w-80 h-90 bg-white rounded-md shadow-lg
                         ${ isDropdownOpen ? 'visible' : 'invisible'
                                }` }
                        >
                            <a
                                onClick={ handleLogout }
                                href=""
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                    <h2 className="text-lg font-bold ml-auto my-4 px-6 text-gray-600">{ user.email }</h2>
                </div>
            </div>
        </header>
    );
}

export default Header;
