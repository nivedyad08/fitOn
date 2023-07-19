import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    Input,
    Box,
    Text
} from '@chakra-ui/react'
import { createNewChat, findMyChatFriends } from '../../Services/UserApi';
import { useDispatch, useSelector } from 'react-redux';

function SingleChatPopUp({ children, setChats, chats }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        findMyChatFriends({ searchQuery, setUsers });
    }, [searchQuery])

    const handleCreateMessage = (userId) => {
        createNewChat({ userId, onClose, setChats, chats, setUsers, dispatch })
    }

    return (
        <>
            <span onClick={ onOpen }>{ children }</span>

            <Modal isOpen={ isOpen } onClose={ onClose }>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input placeholder='Search Users' mb={ 1 }
                                onChange={ (e) => {
                                    setSearchQuery(e.target.value)
                                } }
                            />
                        </FormControl>
                        { users?.map((user, index) => (
                            <Box
                                key={ index }
                                cursor="pointer"
                                px={ 3 }
                                py={ 2 }
                                borderRadius="lg"
                                onClick={ () => handleCreateMessage(user._id) }
                                maxHeight="60vh"
                                overflow="auto"
                            >
                                <div style={ { display: "flex" } }>
                                    <div style={ { height: "30px", width: "30px", borderRadius: "50%" } }>
                                        <img style={ { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px", backgroundColor: "green" } } src={ user?.imgSrc } alt="" />
                                    </div>
                                    <Text px={ 2 } py={ 1 }>
                                        { user?.name }
                                    </Text>
                                </div>
                            </Box>
                        )) }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SingleChatPopUp
