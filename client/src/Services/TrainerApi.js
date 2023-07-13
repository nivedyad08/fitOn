import axios from "../config/axios"
import { TRAINER_BASE_URL } from "../constants/urls"


//Dashboard
export const fetchDashboardDetails = async (trainerId) => {
    const res = await axios.get(`${ TRAINER_BASE_URL }/dashboard/details?trainerId=${ trainerId }`)
    return res.data;
}

//Reports
// export const fetchUserTransactionDetails = async (trainerId) => {
//     const res = await axios.get(`${ TRAINER_BASE_URL }/transaction/reports?trainerId=${ trainerId }`)
//     return res.data;
// }