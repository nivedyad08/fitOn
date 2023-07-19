import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    Input,
    Box,
    Text
} from '@chakra-ui/react'
import { createGroupChat, searchChatUsers } from '../../Services/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddedUserBadge from './AddedUserBadge';

function PopUp({ children, setChats, chats }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGruopChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();

    const submitHandler = () => {
        createGroupChat({
            groupChatName,
            selectedUsers,
            onClose, setChats,
            chats,
            setSelectedUsers,
            setUsers,
            dispatch
        });
    }

    const searchHandler = (searchQuery) => {
        if (searchQuery) {
            setSearchInput(searchQuery);
            searchChatUsers({ searchQuery, setUsers });

        } else {
            setUsers([]);
        }
    }

    const handleGroupUsers = (userId) => {
        if (selectedUsers.includes(userId)) {
            toast.warning("User alreday added");
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    }

    const handleDelete = (deleteUser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== deleteUser._id))
    }

    return (
        <>
            <span onClick={ onOpen }>{ children }</span>

            <Modal isOpen={ isOpen } onClose={ onClose }>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input placeholder='Chat name' mb={ 3 }
                                onChange={ (e) => setGruopChatName(e.target.value) }
                            />
                        </FormControl>
                        <FormControl>
                            <Input placeholder='Add users' mb={ 1 }
                                onChange={ (e) => searchHandler(e.target.value) }
                            />
                        </FormControl>
                        <Box style={ { width: "100%", display: "flex", flexWrap: "wrap" } }>
                            { selectedUsers?.map((user) => (
                                <AddedUserBadge key={ user._id } user={ user } handleFuntion={ () => handleDelete(user) } />
                            )) }
                        </Box>
                        { users?.slice(0, 4).map((user, index) => (
                            <Box
                                key={ index }
                                cursor="pointer"
                                px={ 3 }
                                py={ 2 }
                                borderRadius="lg"
                                onClick={ () => handleGroupUsers(user) }
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

                    <ModalFooter>
                        <Button colorScheme='blue' mr={ 3 } onClick={ submitHandler }>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PopUp
