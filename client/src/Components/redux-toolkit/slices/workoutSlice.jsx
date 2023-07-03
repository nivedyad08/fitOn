import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
    name: "workout",
    initialState: {
        workoutInfo: null
    },
    reducers: {
        workoutDetails(state, action) {
            state.workoutInfo = action.payload
        },
    }
})
export const { workoutDetails } = workoutSlice.actions
export default workoutSlice.reducer;