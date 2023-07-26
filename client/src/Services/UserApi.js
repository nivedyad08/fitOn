import axios from "../config/axios"
import { USER_BASE_URL } from "../constants/urls"
import { CHAT_BASE_URL } from "../constants/urls"

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

//Workout rating
export const rateWorkout = async (userId, ratingDetails) => {
    const res = await axios.post(`${ USER_BASE_URL }/workout/rating?userId=${ userId }`, ratingDetails)
    return res.data;
}

//Popular Workouts
export const popularWorkouts = async () => {
    const res = await axios.get(`api/auth/popular/workouts`)
    return res.data;
}



//getting all chats of the user
export const getChats = async () => {
    const res = await axios.get(`${ CHAT_BASE_URL }`)
    return res.data;
}
//create a new chat
export const createNewChat = async (userId) => {
    const res = await axios.post(`${ CHAT_BASE_URL }?userId=${ userId }`)
    return res.data;
}
//get all chats
export const fetchAllChats = async (chatId) => {
    const res = await axios.get(`${ CHAT_BASE_URL }/allChats?chatId=${ chatId }`)
    return res.data;
}

//Send message
export const sendMessage = async ({ content, chatId }) => {
    const res = await axios.post(`${ CHAT_BASE_URL }/sendMessage`, { content, chatId })
    return res.data;
}

export const searchTrainer = async (search) => {
    const res = await axios.post(`${ USER_BASE_URL }/trainer/search`, { search })
    return res.data;
}