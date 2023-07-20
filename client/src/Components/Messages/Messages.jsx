import React, { useEffect, useRef, useState } from 'react'
import './message.css'
import io from "socket.io-client";
import { useSelector } from "react-redux";
import {
    getChats, createNewChat, fetchAllChats,
    sendMessage
} from "../../Services/UserApi"

const EndPoint = "http://localhost:8080";
var socket, selectedchatcompare;

function Messages({ id }) {
    const [socketConnected, setSocketConnected] = useState(false)
    const [istyping, setIsTyping] = useState(false);
    const [users, setUsers] = useState([]);
    const [chatId, setChatId] = useState({})
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [typing, setTyping] = useState(false);

    const chatContainerRef = useRef(null);

    // var url_string = window.location.href;
    // console.log("url=>", url_string);
    // var url = new URL(url_string);
    // var id = url.searchParams.get("id");
    // id = "648d60f17da0339a54fd2de4"

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
        if (id) {
            console.log("id..........");
            createNewChat(id).then((res) => {
                if (res._id) {
                    const chatUser = res.users.filter((chatUser) => {
                        return (chatUser._id !== user._id)
                    });
                    setSelectedUser(chatUser[0].firstName)

                    setChatId(res._id);

                    const chatid = res._id

                    socket.emit("join chat", (chatid));
                    getChats().then((res) => {
                        const chatUsers = res.map((chat) => {
                            return (chat.users.filter((chatuser) => chatuser._id != user._id))
                        })
                        const chats = chatUsers.map((user) => (user[0]));

                        setUsers(chats)
                        fetchAllChats(chatid).then((res) => {
                            setChatHistory(res.messages);
                            console.log(res);
                        })
                    })
                }
            })
        } else {
            console.log("nooo id..........");
            getChats().then((res) => {
                console.log(res);
                // const chatUsers = res.map((chat) => {
                //     return (chat.users.filter((chatuser) => chatuser._id != user._id))
                // })

                // const chats = chatUsers.map((user) => (user[0]));
                // setUsers(chats);
                setUsers(res)
            })
        }

        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [])

    useEffect(() => {
        selectedchatcompare = chatId
    }, [chatId])

    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            if (!selectedchatcompare || selectedchatcompare !== newMessageRecieved.chat._id) {

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
        e.preventDefault();
        socket.emit("stop typing", chatId);
        sendMessage({ content: message, chatId }).then((res) => {
            socket.emit('new message', res)
            setChatHistory([...chatHistory, res])
            setMessage('')
        })
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
            <div className="msg">
                <div className="users-list">
                    <h2>Users</h2>
                    <ul>
                        { users.map((user, index) => (
                            <li
                                key={ index }
                                className={ selectedUser === user.firstName ? "selected" : "" }
                                onClick={ () => handleUserSelection(user) }
                            >
                                { user.firstName }
                            </li>
                        )) }
                    </ul>
                </div>
                <div className="chat">
                    <h2>Chat</h2>
                    { selectedUser ? (
                        <div>
                            <h3 style={ { color: "blue" } }>{ selectedUser }</h3>
                            <div className="chat-history" ref={ chatContainerRef }>
                                { chatHistory.map((msg, index) => (

                                    <div
                                        key={ index }
                                        className={ msg.sender.firstName === user.firstName ? "sent" : "received" }
                                    >
                                        <span style={ { color: 'red' } }>{ msg.sender.firstName }: </span>
                                        <span>{ msg.content }</span>
                                    </div>
                                )) }
                            </div>
                            <div className="message-input">
                                { istyping ? <div>Typing...</div> : <></> }
                                <input
                                    type="text"
                                    value={ message }
                                    onChange={ typingHandler }
                                />
                                <button onClick={ handleSendMessage }>Send</button>
                            </div>
                        </div>
                    ) : (
                        <p>Select a user to start chatting</p>
                    ) }
                </div>
            </div >
        </>
    )
}

export default Messages
