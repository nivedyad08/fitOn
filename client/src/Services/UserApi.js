import axios from "../config/axios"
import { USER_BASE_URL } from "../constants/urls"


//Subscription Report
export const fetchUserSubscriptionDetails = async (userId) => {
    const res = await axios.get(`${ USER_BASE_URL }/subscription?userId=${userId}`)
    return res.data;
}