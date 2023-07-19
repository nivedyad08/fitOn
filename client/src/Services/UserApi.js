import axios from "../config/axios"
import { USER_BASE_URL } from "../constants/urls"
import { CHAT_BASE_URL } from "../constants/urls"
import { toast } from "react-toastify";

//Subscription Report
export const fetchUserSubscriptionDetails = async (userId) => {
    const res = await axios.get(`${ USER_BASE_URL }/subscription?userId=${ userId }`)
    return res.data;
}
//Add to favourites
export const addOrRemoveFavourites = async (workoutId, userId) => {
    const res = await axios.put(`${ USER_BASE_URL }/workout/add-to-favourites?workoutId=${ workoutId }&userId=${ userId }`)
    return res.data;
}

//User favourites
export const fetchUserFavourites = async (userId) => {
    const res = await axios.get(`${ USER_BASE_URL }/favourites?userId=${ userId }`)
    return res.data;
}

//Workout rating
export const rateWorkout = async (userId, ratingDetails) => {
    const res = await axios.post(`${ USER_BASE_URL }/workout/rating?userId=${ userId }`, ratingDetails)
    return res.data;
}

//Popular Workouts
export const popularWorkouts = async () => {
    const res = await axios.get(`api/auth/popular/workouts`)
    return res.data;
}



//getting all chats of the user
export const getChats = ({ setChats, dispatch }) => {
    axios.get(`${ CHAT_BASE_URL }`, {
    }).then((res) => {
        setChats(res.data);
        // dispatch(clearChatUpdate());
    }).catch((err) => {
    })
}

//create a new chat
export const createNewChat = ({ userId, onClose, setChats, chats, setUsers }) => {
    // dispatch(setLoading());
    axios.post(`${ CHAT_BASE_URL }`, { userId }, {
    }).then((res) => {
        setChats([res.data, ...chats]);
        onClose();
        setUsers([]);
        // dispatch(clearLoading());
    }).catch((err) => {
        toast.error("Oops.! Something went wrong");
        // dispatch(clearLoading());
    })
}

// find my current frinends and seach user on chat box
export const findMyChatFriends = ({ searchQuery, setUsers }) => {
    axios.get(`${ CHAT_BASE_URL }/chats/users/find`, {
        params: {
            searchQuery
        },
    }).then((res) => {
        setUsers(res.data);
    }).catch((err) => {
        toast.error("Oops.! Something went wrong");
    })
}

//messegings
export const createNewMessage = ({
    chatId,
    content,
    setNewMessage,
    messages,
    setMessages,
    socket
}) => {
    setNewMessage('');
    axios.post(`${ CHAT_BASE_URL }/message`, {
        content,
        chatId
    }, {
    })
        .then((res) => {
            const newMessage = res.data; // Store the newly created message
            setMessages([...messages, newMessage]);
            socket.emit("new message", newMessage);
        })
        .catch((err) => {
            toast.error("Oops! Something went wrong");
        });
};

//fetching al chats 
export const fetchMessages = ({ currentChat, setLoading, setMessages, socket }) => {
    if (!currentChat) {
        return;
    }
    setLoading(true);
    axios
        .get(`${ CHAT_BASE_URL }/message`, {
            params: {
                chatId: currentChat._id,
            },
        })
        .then((res) => {
            setMessages(res.data);
            setLoading(false);
            socket.emit("join chat", currentChat._id)
        })
        .catch((err) => {
            toast.error("Oops! Something went wrong");
        });
};

// create new group chat
export const createGroupChat = ({
    token,
    groupChatName,
    selectedUsers,
    onClose,
    setChats,
    chats,
    setSelectedUsers,
    setUsers,
    // dispatch
}) => {
    // dispatch(setLoading())
    if (!groupChatName || !selectedUsers) {
        toast.error("Please fill the require feilds");
        // dispatch(clearLoading());
        return
    }
    onClose();
    axios.post(`${ CHAT_BASE_URL } /chats/group`, {
        name: groupChatName,
        users: selectedUsers.map((user) => user._id)
    }, {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    }).then((res) => {
        setChats([res.data, ...chats]);
        setSelectedUsers([]);
        setUsers([]);
        // dispatch(clearLoading());
    }).catch((err) => {
        // dispatch(clearLoading());
        toast.error("Something went wrong");
    });
}

//searching users
export const searchChatUsers = ({ searchQuery, setUsers }) => {
    axios.get(`${ CHAT_BASE_URL }/chats/users`, {
        params: {
            searchQuery
        },
    }).then((res) => {
        setUsers(res.data)
    }).catch((err) => {
        toast.error("Something went wrong");
    })
}