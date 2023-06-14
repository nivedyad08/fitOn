import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null
    },
    reducers: {
        loggedUserDetails(state, action) {
            state.userInfo = action.payload
        }
    }
})
export const { loggedUserDetails } = userSlice.actions
export default userSlice.reducer;