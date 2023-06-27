import Cookies from "js-cookie"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function TrainerAuth() {
    const trainerToken = Cookies.get("accessToken")
    const location = useLocation();
    return (
        trainerToken ? <Outlet /> : <Navigate to="/" state={ { from: location } } replace />
    )
}

export default TrainerAuth;