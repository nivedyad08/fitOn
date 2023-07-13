// import Cookies from "js-cookie";
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { USER_ROLE, TRAINER_ROLE } from "../constants/roles"

// function ProtectedAuth({ children }) {
//     const isAuth = Cookies.get("accessToken");
//     const curr = window.location.pathname;
//     const isLoginPage = curr === "/login";
//     const isSignupPage = curr === "/register";
//     const user = useSelector((state) => state.loggedUser.userInfo)

//     if (isAuth && (isLoginPage || isSignupPage)) {
//         if (user.role === USER_ROLE)
//             return <Navigate to="/user/dashboard" />;
//         else if (user.role === TRAINER_ROLE)
//             return <Navigate to="/trainer/dashboard" />;
//     } else if (!isAuth && !isLoginPage && !isSignupPage) {
//         return <Navigate to="/login" />;
//     } else {
//         return <>{ children }</>;
//     }
// }

// export default ProtectedAuth;


import Cookies from "js-cookie"
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ADMIN_ROLE, TRAINER_ROLE, USER_ROLE } from "../constants/roles"

function AdminAuth() {
    const user = useSelector((state) => state.loggedUser.userInfo)
    const accessToken = Cookies.get("accessToken")
    const location = useLocation();

    if (!accessToken) {
        return <Outlet />
    } else {
        if (user.role === USER_ROLE) {
            return <Navigate to="/user/dashboard" state={ { from: location } } replace />
        } else if (user.role === TRAINER_ROLE) {
            return <Navigate to="/trainer/dashboard" state={ { from: location } } replace />
        } else if (user.role === ADMIN_ROLE) {
            return <Navigate to="/admin/dashboard" state={ { from: location } } replace />
        }
    }

}

export default AdminAuth;