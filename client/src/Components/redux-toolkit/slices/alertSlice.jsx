import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: "alert",
    initialState: {
        alerts: []
    },
    reducers: {
        createAlert: (state, action) => {
            state.alerts.push({
                message: action.payload.message,
                type: action.payload.type
            });
        }
    }
})
export const { createAlert } = alertSlice.actions
export default alertSlice.reducer;