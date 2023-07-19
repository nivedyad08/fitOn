import { Box, Button, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getChats } from '../../Services/UserApi';
import PopUp from './Popup';
import SingleChatPopUp from './SingleChatPopUp';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { getSender, getSenderImg } from '../../config/ChatLogics';

function ChatSideBar({ setCurrentChat, currentChat, user }) {

    const [chats, setChats] = useState([]);

    // const { chatUpdated } = useSelector((state) => state.post);

    useEffect(() => {
        getChats({ setChats })
    }, [])

    return (
        <>
            <Box
                display={ { base: currentChat ? "none" : "flex", md: "flex" } }
                flexDir="column"
                alignItems="center"
                p={ 3 }
                bg="white"
                w={ { base: "100%", md: "31%" } }
                borderRadius="lg"
                borderWidth="1px"
                h='90vh'
                maxHeight="90vh"
            >
                <Box
                    pb={ 3 }
                    px={ 3 }
                    fontSize={ { base: "28px", md: "30px" } }
                    w="100%"
                    style={ { display: "flex", justifyContent: "space-between", alignItems: " center" } }
                >
                    MyChats
                    <div style={ { display: "flex" } }>
                        <PopUp setChats={ setChats } chats={ chats }>
                            <Button
                                style={ { display: "flex" } }
                                fontSize={ { base: "17px", md: "10px", lg: "17px" } }
                            // rightIcon={<AddIcon/>}
                            >
                                <FaUserFriends />
                            </Button>
                        </PopUp>
                        <SingleChatPopUp setChats={ setChats } chats={ chats }>
                            <Button
                                style={ { display: "flex" } }
                                fontSize={ { base: "17px", md: "10px", lg: "17px" } }
                                mx={ 1 }
                            >
                                <FaUserPlus />
                            </Button>
                        </SingleChatPopUp>
                    </div>
                </Box>
                <Box
                    d="flex"
                    flexDir="column"
                    p={ 3 }
                    bg="#F8F8F8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    maxHeight="90vh"
                    overflow="auto"
                >
                    <Stack overflowY="scroll">
                        { chats && <>
                            { chats?.map((chat, index) => (
                                <Box
                                    key={ index }
                                    onClick={ () => {
                                        setCurrentChat(chat)
                                    }
                                    }
                                    cursor="pointer"
                                    bg={ currentChat === chat ? "#38B2Ac" : "#E8E8E8" }
                                    color={ currentChat === chat ? "white" : "black" }
                                    px={ 3 }
                                    py={ 2 }
                                    borderRadius="lg"
                                    display={ "flex" }
                                >
                                    { chat.isGroupChat ?
                                        (<>
                                            <div style={ { width: "30px", height: "30px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" } }>
                                                <img style={ { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" } } src="https://static.vecteezy.com/system/resources/previews/021/631/109/original/low-poly-style-group-chat-logo-symbol-people-logo-sign-free-vector.jpg" alt="user" />
                                            </div>
                                        </>)
                                        :
                                        (<>
                                            <div style={ { width: "30px", height: "30px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" } }>
                                                <img style={ { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" } } src={ getSenderImg(user, chat.users) } alt="user" />
                                            </div>
                                        </>) }
                                    <Text>
                                        { !chat.isGroupChat ? (
                                            getSender(user, chat.users)
                                        ) : (chat.chatName) }
                                    </Text>
                                </Box>
                            )) }
                        </> }
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

export default ChatSideBar
