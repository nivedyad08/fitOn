// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: undefined,
    user: undefined,
    notification: [],
    chats: undefined,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
    },
});

export const {
    setSelectedChat,
    setUser,
    setNotification,
    setChats,
} = chatSlice.actions;

export default chatSlice.reducer;
