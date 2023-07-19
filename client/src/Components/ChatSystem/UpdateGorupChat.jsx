import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    useDisclosure,
    Button,
    Box,
    FormControl,
    Input,
    Text,
    useToast
} from '@chakra-ui/react'
import { FaEllipsisV } from 'react-icons/fa';
import AddedUserBadge from './AddedUserBadge';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserToGruop, changeGroupName, removeUserFromGroup, searchChatUsers } from '../../../functionalities/userApiFunctionalities';

function UpdateGorupChat({ currentChat, setCurrentChat, user }) {

    const loggedUser = user;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState();
    const [users, setUsers] = useState();
    const [groupChatName, setGroupChatName] = useState();
    const [renameloafing, setRenameloading] = useState(false);

    const toast = useToast()
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);

    const searchHandler = (searchQuery) => {
        if (searchQuery) {
            setSearch(searchQuery);
            searchChatUsers({ token, searchQuery, setUsers });

        } else {
            setUsers([]);
        }
    }

    const handleRemove = (removeUser) => {

        if (removeUser === loggedUser.userId) {
            console.log("am here am leaving the group");
            removeUserFromGroup({ token, dispatch, chatId: currentChat._id, userId: removeUser, setCurrentChat })
            return
        }

        if (currentChat.groupAdmin._id !== loggedUser.userId) {
            toast({
                title: "Only admin can remove someone.!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return
        }
        removeUserFromGroup({ token, dispatch, chatId: currentChat._id, userId: removeUser, setCurrentChat })
    }
    const handleAddUsers = (addedUser) => {
        if (currentChat.users.find((u) => u._id === addedUser._id)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return
        }

        if (currentChat.groupAdmin._id !== loggedUser.userId) {
            toast({
                title: "Only admin can add someone.!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return
        }

        addNewUserToGruop({
            token,
            chatId: currentChat._id,
            userId: addedUser._id,
            setCurrentChat,
            setSearch,
            setUsers
        })

    }

    const handleRename = () => {
        if (groupChatName) {
            changeGroupName({
                token,
                groupChatName,
                chatId: currentChat._id,
                onClose,
                dispatch,
                setCurrentChat
            })
            setGroupChatName('');
        }
    }

    return (
        <>
            <IconButton display={ { base: "flex" } } icon={ <FaEllipsisV /> } onClick={ onOpen } />

            <Modal isOpen={ isOpen } onClose={ onClose }>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{ currentChat?.chatName }</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex">
                            { currentChat?.users?.map((user) => (
                                <AddedUserBadge key={ user._id } user={ user } handleFuntion={ () => handleRemove(user._id) } />
                            )) }
                        </Box>
                        <FormControl display={ "flex" }>
                            <Input
                                placeholder='Chat name'
                                mb={ 3 }
                                value={ groupChatName }
                                onChange={ (e) => setGroupChatName(e.target.value) }
                            />
                            <Button
                                variant="solid"
                                colorScheme='teal'
                                ml={ 1 }
                                isLoading={ renameloafing }
                                onClick={ handleRename }
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl display={ "flex" }>
                            <Input
                                placeholder='Chat name'
                                mb={ 3 }
                                onChange={ (e) => searchHandler(e.target.value) }
                            />
                        </FormControl>
                        { users?.map((usr, index) => (
                            <Box
                                key={ index }
                                cursor="pointer"
                                px={ 3 }
                                py={ 2 }
                                borderRadius="lg"
                                onClick={ () => handleAddUsers(usr) }
                            >
                                <div style={ { display: "flex" } }>
                                    <div style={ { height: "30px", width: "30px", borderRadius: "50%" } }>
                                        <img style={ { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px", backgroundColor: "green" } } src={ usr?.imgSrc } alt="" />
                                    </div>
                                    <Text px={ 2 } py={ 1 }>
                                        { usr?.name }
                                    </Text>
                                </div>
                            </Box>
                        )) }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={ 3 } onClick={ () => handleRemove(user.userId) }>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGorupChat
