import axios from "../config/axios"
import { USER_BASE_URL } from "../constants/urls"

//Subscription Report
export const fetchUserSubscriptionDetails = async (userId) => {
    const res = await axios.get(`${ USER_BASE_URL }/subscription?userId=${ userId }`)
    return res.data;
}
//Add to favourites
export const addOrRemoveFavourites = async (workoutId, userId) => {
    const res = await axios.put(`${ USER_BASE_URL }/workout/add-to-favourites?workoutId=${ workoutId }&userId=${ userId }`)
    return res.data;
}

//User favourites
export const fetchUserFavourites = async (userId) => {
    const res = await axios.get(`${ USER_BASE_URL }/favourites?userId=${ userId }`)
    return res.data;
}