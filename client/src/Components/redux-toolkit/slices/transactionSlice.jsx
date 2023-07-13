import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transactionInfo: null
    },
    reducers: {
        transactionDetails(state, action) {
            state.transactionInfo = action.payload
        },
    }
})
export const { transactionDetails } = transactionSlice.actions
export default transactionSlice.reducer;