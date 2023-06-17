import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import userSlice from "./slices/userSlice"

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    loggedUser: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store);

export { store, persistor };