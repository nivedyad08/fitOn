import Cookies from "js-cookie"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function AdminAuth() {
    const adminToken = Cookies.get("accessToken")
    const location = useLocation();
    return (
        adminToken ? <Outlet /> : <Navigate to="/" state={ { from: location } } replace />
    )
}

export default AdminAuth;