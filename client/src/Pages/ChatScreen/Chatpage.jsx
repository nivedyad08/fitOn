import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import "../../Components/ChatSystem/chat.css";
import Chatbox from "../../Components/ChatSystem/Chatbox";
// import MyChats from "../../Components/ChatSystem/MyChats";
// import SideDrawer from "../../Components/ChatSystem/miscellaneous/SideDrawer";
import { ChatState } from "../../Components/Context/ChatProvider";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={ { width: "100%" } }>
            {/* { user && <SideDrawer /> } */ }
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {/* { user && <MyChats fetchAgain={ fetchAgain } /> } */ }
                { user && (
                    <Chatbox fetchAgain={ fetchAgain } setFetchAgain={ setFetchAgain } />
                ) }
            </Box>
        </div>
    );
};

export default Chatpage;
