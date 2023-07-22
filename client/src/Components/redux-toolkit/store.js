import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import userSlice from "./slices/userSlice"
import workoutSlice from "./slices/workoutSlice"
import trainerSlice from "./slices/trainerSlice"
import transactionSlice from "./slices/transactionSlice"
import signupSlice from "./slices/signupSlice"
import alertSlice from "./slices/alertSlice"

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    loggedUser: userSlice,
    workoutDetails: workoutSlice,
    trainerDetails: trainerSlice,
    transactionDetails: transactionSlice,
    signupUserDetails: signupSlice,
    createAlert: alertSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable strict serializability checks
        }),
})

const persistor = persistStore(store);

export { store, persistor };