import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
// import { zoomIn } from "../../utils/motions"
import { useSelector } from 'react-redux';
import { Button, ChakraProvider } from '@chakra-ui/react'
import ChatBox from './ChatBox';
import { FaRegListAlt, FaRegTimesCircle } from 'react-icons/fa';
import ChatSideBar from './ChatSideBar';

function ChatScreen() {

    const [user, setUser] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [navigator, setNavigator] = useState(false)

    const userDetails = useSelector((state) => state.loggedUser.userInfo);

    useEffect(() => {
        setUser(userDetails);
    }, [])
    return (
        <>
            <motion.div
                // variants={ zoomIn(0.5, 0.5) }
                initial="hidden"
                whileInView="show"
                viewport={ { once: false, amount: 0.25 } }
            >
                <div className="gradient01" style={ { height: "60px", width: "100%", position: "absolute" } } />
                <header style={ { top: 5, width: "90%", zIndex: 10, height: "50px", backgroundColor: "transparent" } }>
                    { navigator ? (
                        <Button onClick={ () => setNavigator(false) } style={ { maxWidth: "45px", height: "45px", zIndex: 7, position: "absolute", margin: "5px" } }><FaRegTimesCircle size={ 20 } /></Button>
                    ) : (
                        <Button onClick={ () => setNavigator(true) } style={ { maxWidth: "45px", height: "45px", zIndex: 7, position: "absolute", margin: "5px" } }><FaRegListAlt size={ 20 } /></Button>
                    ) }
                </header>
            </motion.div>
            <div className="container-fluid gedf-wrapper" style={ { backgroundColor: "#EDEDED" } }>
                <div className="row px-10">
                    { navigator && <div style={ { position: "absolute", zIndex: 5, marginTop: "1rem", background: "rgba(0, 0, 0, 0.437)" } }>
                        { user.firstName }
                        {/* <Leftsidebar data={ user } /> */ }
                    </div>
                    }
                    <ChakraProvider>
                        <div style={ { display: "flex", paddingTop: "1rem" } }>
                            <ChatSideBar setCurrentChat={ setCurrentChat } currentChat={ currentChat } user={ user } />
                            <ChatBox currentChat={ currentChat } setCurrentChat={ setCurrentChat } user={ user } />
                        </div>
                    </ChakraProvider>
                </div>
            </div>
        </>
    )
}

export default ChatScreen;
