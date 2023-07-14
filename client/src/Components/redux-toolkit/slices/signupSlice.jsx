import { createSlice } from "@reduxjs/toolkit";

const signupSlice = createSlice({
    name: "user",
    initialState: {
        signupInfo: null
    },
    reducers: {
        signupUserDetails(state, action) {
            state.signupInfo = action.payload
        },
    }
})
export const { signupUserDetails } = signupSlice.actions
export default signupSlice.reducer;