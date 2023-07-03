import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import userSlice from "./slices/userSlice"
import workoutSlice from "./slices/workoutSlice"

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    loggedUser: userSlice,
    workoutDetails: workoutSlice
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