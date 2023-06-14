import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"

const store = configureStore({
    reducer:{
        loggedUser : userSlice
    },
})

export default store;