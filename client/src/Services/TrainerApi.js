import axios from "../config/axios"
import { TRAINER_BASE_URL } from "../constants/urls"

//Dashboard
export const fetchDashboardDetails = async (trainerId) => {
    const res = await axios.get(`${ TRAINER_BASE_URL }/dashboard/details?trainerId=${ trainerId }`)
    return res.data;
}

//Popular Workouts
export const popularWorkouts = async () => {
    const res = await axios.get(`api/auth/popular/workouts`)
    return res.data;
}

//Trainer Subscriber Users
export const fetchTrainerSubscribedUsers = async (trainerId) => {
    const res = await axios.get(`${ TRAINER_BASE_URL }/subscribedUsers?trainerId=${ trainerId }`)
    return res.data;
}
export const createSession = async (trainerId, data) => {
    const res = await axios.post(`${ TRAINER_BASE_URL }/create/session?trainerId=${ trainerId }`, { data })
    return res.data;
}

export const sessions = async (trainerId) => {
    const res = await axios.get(`${ TRAINER_BASE_URL }/sessions?userId=${ trainerId }`)
    return res.data;
}

export const changeSessionStatus = async (sessionId, data) => {
    const res = await axios.get(`${ TRAINER_BASE_URL }/change/session-status?sessionId=${ sessionId }`, { data })
    return res.data;
}