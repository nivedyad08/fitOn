import axios from "../config/axios"
import { ADMIN_BASE_URL } from "../constants/urls"


//Dashboard
export const getDashboardDetails = async () => {
    const res = await axios.get(`${ ADMIN_BASE_URL }/dashboard/details`)
    return res.data;
}