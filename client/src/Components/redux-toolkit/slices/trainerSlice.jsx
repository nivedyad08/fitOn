import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
    name: "trainer",
    initialState: {
        trainerInfo: null
    },
    reducers: {
        trainerDetails(state, action) {
            state.trainerInfo = action.payload
        },
    }
})
export const { trainerDetails } = trainerSlice.actions
export default trainerSlice.reducer;