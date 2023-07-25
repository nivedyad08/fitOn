import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import { USER_ROLE, TRAINER_ROLE } from "../constants/roles"
import { useSelector } from 'react-redux';

const FloatingButton = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.loggedUser.userInfo);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const floatingButtonRef = useRef(null);

    const handleDrag = (e, ui) => {
        setPosition({ x: ui.x, y: ui.y });
    };

    return (
        <Draggable
            handle=".handle"
            position={ position }
            onStop={ handleDrag }
            bounds="parent"
            nodeRef={ floatingButtonRef }
        >
            <Box
                ref={ floatingButtonRef }
                sx={ {
                    position: 'fixed',
                    bottom: '100px',
                    right: '20px',
                    zIndex: '9999', // Higher z-index to ensure it's visible over other elements
                    '& > :not(style)': { m: 1 },
                } }
            >
                <Fab
                    color="primary"
                    aria-label="add"
                    className="handle"
                    onClick={ () => navigate(`/${ (user.role).toLowerCase() }/chats`) }
                >
                    <ChatIcon />
                </Fab>
            </Box>
        </Draggable>
    );
};

export default FloatingButton;
