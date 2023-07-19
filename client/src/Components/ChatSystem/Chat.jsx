// App.js
import React, { useEffect, useRef, useState } from "react";
import './chat.css'
import io from "socket.io-client";

const EndPoint = "http://localhost:8080";
var socket;

const Message = () => {

    useEffect(() => {

        socket = io(EndPoint);
    }, [])


    return (
        <>
            <h1>Chats</h1>
        </>
    );
};

export default Message;
