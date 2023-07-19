import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import Lottie from "lottie-react";
import io from "socket.io-client";
import { getSender, getSenderFull, getSenderImg } from '../../config/ChatLogics'
// import UpdateGorupChat from './UpdateGorupChat';
import { createNewMessage, fetchMessages } from '../../Services/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import ScrollChatBox from './ScrollChatBox';
import typingLoader from "./animations/typing.json";
// import VideoCall from '../videoCall/VideoCall';
// import { setNotifcations } from '../../../redux-toolkit/actionManagerSlice';

const ENDPOINT = "http://localhost:8080"
let socket, selectedChatCampare;

function SingleChat({ currentChat, setCurrentChat, user }) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [notification, setNotifcations] = useState([]);

    // const { notification } = useSelector((state) => state.post);

    // const dispatch = useDispatch();

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.on('connected', () => setSocketConnected(true));
        socket.emit("setup", user);
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, [user])


    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCampare || selectedChatCampare._id !== newMessageRecieved.chat._id) {
                // if (!notification.includes(newMessageRecieved)) {
                //     setNotifcations([newMessageRecieved, ...notification]);
                //     console.log(notification);
                // }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    }, [])

    useEffect(() => {
        fetchMessages({ currentChat, setLoading, setMessages, socket });
        selectedChatCampare = currentChat;
    }, [currentChat])

    const sendMessage = (e) => {
        if (e.key === "Enter" && newMessage) {
            socket.emit("stop typing", currentChat._id);
            createNewMessage({
                chatId: currentChat._id,
                content: newMessage,
                setNewMessage,
                messages,
                setMessages,
                socket
            })
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
        if (!socketConnected) return;
        if (!typing) {
            setTyping(true);
            socket.emit("typing", currentChat._id);
        }
        let lastTypingTime = new Date().getTime();
        const timeLength = 3000
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime
            if (timeDiff >= timeLength && typing) {
                socket.emit("stop typing", currentChat._id);
                setTyping(false);
            }
        }, timeLength)
    }

    return (
        <>
            { currentChat ?
                (<>
                    <Text
                        fontSize={ { base: "28px", md: "30px" } }
                        pb={ 3 }
                        px={ 2 }
                        w="100%"
                        style={ { display: "flex" } }
                        justifyContent={ { base: "space-between" } }
                        alignItems="center"
                    >
                        <IconButton
                            display={ { base: "flex", md: "none" } }
                            icon={ <FaRegTimesCircle /> }
                            onClick={ () => setCurrentChat(null) }
                        />
                        { !currentChat?.isGroupChat ?
                            (<>
                                <div style={ { display: "flex" } }>
                                    <div style={ { width: "50px", height: "50px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" } }>
                                        <img style={ { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" } } src={ getSenderImg(user, currentChat.users) } alt="user" />
                                    </div>
                                    { getSender(user, currentChat.users) }
                                </div>
                            </>)
                            :
                            (<>
                                {/* <span>{ currentChat?.chatName.toUpperCase() }</span>
                                <UpdateGorupChat currentChat={ currentChat } setCurrentChat={ setCurrentChat } user={ user } /> */}
                            </>)
                        }
                    </Text>
                    <Box
                        display={ "flex" }
                        flexDir="column"
                        justifyContent="flex-end"
                        p={ 3 }
                        bg="#E8E8E8"
                        w="100%"
                        h="75vh"
                        borderRadius="lg"
                        overflow="hidden"
                    >
                        { loading ?
                            (
                                <Spinner
                                    size="xl"
                                    h={ 20 }
                                    w={ 20 }
                                    alignSelf="center"
                                    margin="auto"
                                />
                            )
                            :
                            (
                                <div style={ { display: "flex", flexDirection: "column", overflowY: "scroll", scrollbarWidth: "none" } }>
                                    <ScrollChatBox messages={ messages } user={ user } />
                                </div>
                            ) }
                        <FormControl onKeyDown={ sendMessage } isRequired mt={ 3 }>
                            { isTyping && <div style={ { width: "50px", height: "50px" } }>
                                <Lottie animationData={ typingLoader } loop={ true } width={ 70 } style={ { marginBottom: 15, marginLeft: 0 } } />
                            </div>
                            }
                            <Input variant="filled" bg="E0E0E0" value={ newMessage } placeholder="Enter messages.." onChange={ typingHandler } />
                        </FormControl>
                    </Box>
                </>)
                :
                (<>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        h="100%"
                    >
                        <Text fontSize="3xl" pb={ 3 } >
                            Start chating
                        </Text>
                    </Box>
                </>)
            }
        </>
    )
}

export default SingleChat
