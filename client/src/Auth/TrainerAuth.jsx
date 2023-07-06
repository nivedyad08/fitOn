import Cookies from "js-cookie"
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { TRAINER_ROLE } from "../constants/roles"

function TrainerAuth() {
    const trainerToken = Cookies.get("accessToken")
    const user = useSelector((state) => state.loggedUser.userInfo)
    const location = useLocation();
    return (
        trainerToken && user.role === TRAINER_ROLE ? <Outlet /> : <Navigate to="/login" state={ { from: location } } replace />
    )
}

export default TrainerAuth;