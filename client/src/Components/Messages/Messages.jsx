import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import {
    getChats, createNewChat, fetchAllChats,
    sendMessage
} from "../../Services/UserApi"

const EndPoint = "http://localhost:8080";
var socket, selectedchatcompare;

function Messages({ setNotifications, notifications, selectedChat }) {
    const [socketConnected, setSocketConnected] = useState(false)
    const [istyping, setIsTyping] = useState(false);
    const [users, setUsers] = useState([]);
    const [chatId, setChatId] = useState({})
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const [updated, setUpdated] = useState(false);

    const chatContainerRef = useRef(null);

    const user = useSelector((state) => state.loggedUser.userInfo);

    useEffect(() => {
        socket = io(EndPoint);
        socket.emit("setup", user._id);

        socket.on("connected", () => {
            setSocketConnected(true);
        });

        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        return () => {
            socket.disconnect(); // Disconnect the socket when the component is unmounted.
        };
    }, [user._id]);

    useEffect(() => {
        console.log("selectedChat====", selectedChat);
        if (selectedChat) {
            createNewChat(selectedChat).then((res) => {
                if (res._id) {
                    const chatUser = res.users.filter((chatUser) => {
                        return (chatUser._id !== user._id)
                    });
                    setSelectedUser(chatUser[0].firstName)

                    setChatId(res._id);

                    const chatid = res._id

                    socket.emit("join chat", (chatid));
                    getChats().then((res) => {
                        console.log("res", res);
                        const chatUsers = res.map((item) => {
                            return (item.chats[0].users.filter((chatuser) => chatuser._id != user._id))
                        })
                        const chats = chatUsers.map((user) => (user[0]));

                        setUsers(res)
                        fetchAllChats(chatid).then((res) => {
                            setChatHistory(res.messages);
                        })
                    })
                }
            })
        } else {
            getChats().then((res) => {
                console.log(res);
                setUsers(res)
            })
        }

        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [selectedChat])

    useEffect(() => {
        selectedchatcompare = chatId
    }, [chatId])

    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            if (!selectedchatcompare || selectedchatcompare !== newMessageRecieved.chat._id) {
                if (!notifications.includes(newMessageRecieved)) {
                    setNotifications([newMessageRecieved, ...notifications]);
                    setUpdated(!updated)
                }

            } else {
                setChatHistory([...chatHistory, newMessageRecieved]);
            }
        })
    })

    const handleUserSelection = (users) => {
        setSelectedUser(users.firstName);

        createNewChat(users._id).then((res) => {
            if (res._id) {
                setChatId(res._id);

                const chatid = res._id

                socket.emit("set up", user._id);

                socket.emit("join chat", (chatid));

                fetchAllChats(chatid).then((res) => {
                    setChatHistory(res.messages);
                })
            }
        })
    };

    const handleSendMessage = (e) => {
        if (message) {
            e.preventDefault();
            socket.emit("stop typing", chatId);
            sendMessage({ content: message, chatId }).then((res) => {
                socket.emit('new message', res)
                setChatHistory([...chatHistory, res])
                setMessage('')
            })
        }
    };

    const typingHandler = (e) => {
        setMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", chatId);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 2000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", chatId);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            <div className="flex h-[450px]">
                {/* Sidebar (Users List) */ }
                <div className="custom-blue w-1/4 p-4">
                    <h2 className="text-2xl font-bold mb-4 text-white uppercase p-10">Users</h2>
                    <ul className="list-none p-10">
                        { users.map((user, index) => (
                            <li
                                key={ index }
                                className={ `cursor-pointer custom-blue-shade1 p-4 mb-10 rounded-md ${ selectedUser === user.firstName ? 'bg-gray-300' : 'bg-gray-100'
                                    } hover:bg-gray-200 transition-colors duration-300` }
                                onClick={ () => handleUserSelection(user) }
                            >
                                <div className="flex items-center">
                                    <img className="h-30 w-30 rounded-full object-cover" src={ user.profilePic } alt="" />
                                    <span>{ user.firstName }</span>
                                </div>
                            </li>
                        )) }
                    </ul>
                </div>

                {/* Chat Area */ }
                <div className="flex flex-grow flex-col bg-gradient-to-r from-gray-400 to-blue-300 rounded-lg shadow-md p-6">
                    <div className="chat-history flex-grow h-72 overflow-y-auto p-4 rounded-md bg-[#c6c6d5] shadow-md mb-4" ref={ chatContainerRef }>
                        {
                            selectedUser ? (
                                chatHistory.length > 0 ? (
                                    chatHistory.map((msg, index) => (
                                        <div
                                            key={ index }
                                            className={ `flex mb-4 ${ msg.sender.firstName === user.firstName ? 'flex-col-reverse items-end' : 'flex-col items-start'
                                                }` }
                                        >
                                            <div
                                                className={ `px-7 py-4 rounded-md ${ msg.sender.firstName === user.firstName ? 'bg-green-400 text-gray-100' : 'bg-gray-100'
                                                    }` }
                                                style={ { maxWidth: "60%" } }
                                            >
                                                <span >{ msg.content }</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='my-auto'>{ `No chat history available for ${ selectedUser }` }</p>
                                )
                            ) : (
                                <p className='my-auto'>Select a user to start chatting.</p>
                            )
                        }

                    </div>
                    <div className="message-input flex items-center">
                        { istyping ? <div className="text-blue-900">Typing...</div> : <></> }
                        <input
                            type="text"
                            value={ message }
                            onChange={ typingHandler }
                            className="p-10 flex-grow max-w-full rounded-l-md border border-gray-300 focus:outline-none"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={ handleSendMessage }
                            className="px-6 py-12 bg-blue-500 text-white rounded-r-md cursor-pointer transition-colors duration-300 hover:bg-blue-600"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages
