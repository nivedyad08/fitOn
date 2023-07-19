import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        popUp: false,
        chatUpdated: false,
        Notification: []
    },
    reducers: {
        setPopUp: (state) => {
            state.popUp = true;
        },
        clearPopUp: (state) => {
            state.popUp = false;
        },
        setChatUpdate: (state) => {
            state.chatUpdated = true;
        },
        clearChatUpdate: (state) => {
            state.chatUpdated = false;
        },
        setNotifcations: (state, action) => {
            if (state.Notification.length > 0) {
                state.Notification = [action.payload, ...state.Notification]
            }
            state.Notification = action.payload
        }
    },
});

export const {
    incrementPostCount,
    setPostCount,
    setFollowCount,
    incrementFollowCount,
    setPopUp,
    clearPopUp,
    setYesButtonChoice,
    setPostId,
    setLiked,
    clearLiked,
    setFollowDetails,
    clearFollowDetails,
    setChatUpdate,
    clearChatUpdate,
    setNotifcations
} = postSlice.actions;
export default postSlice.reducer;
