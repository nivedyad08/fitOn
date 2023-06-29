import Cookies from "js-cookie"
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { USER_ROLE } from "../constants/roles"

function UserAuth() {
    const userToken = Cookies.get("accessToken")
    const user = useSelector((state) => state.loggedUser.userInfo)
    const location = useLocation();
    return (
        userToken && user.role === USER_ROLE ? <Outlet /> : <Navigate to="/" state={ { from: location } } replace />
    )
}

export default UserAuth;