import React from 'react';
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics';
import { Avatar, Tooltip } from '@chakra-ui/react';

function ScrollChatBox({ messages, user }) {
    return (
        <>
            <ScrollableFeed>
                { messages && messages.map((m, i) => (
                    <>
                        { m.sender._id === user.userId ?
                            (<>
                                <div style={ { display: "flex", justifyContent: "end" } } key={ i }>
                                    <span
                                        style={ {
                                            backgroundColor: "#166BE0",
                                            color: "white",
                                            borderRadius: "20px",
                                            padding: "5px 15px",
                                            maxWidth: "75%",
                                            marginTop: isSameUser(messages, m, i) ? 3 : 10
                                        } }
                                    >{ m?.content }</span>
                                    { messages[i + 1]?.sender._id !== m?.sender._id ? (<Avatar
                                        mt=".7rem"
                                        mr={ 1 }
                                        size="sm"
                                        cursor="pointer"
                                        name={ m?.sender?.name }
                                        src={ m?.sender?.imgSrc }
                                        marginLeft={ 1 }
                                    />) : (<>
                                        <span style={ { marginLeft: "2.5rem" } } />
                                    </>)
                                    }
                                </div>
                            </>)
                            :
                            (<>
                                <div style={ { display: "flex", justifyContent: "start" } } key={ i }>
                                    { messages[i + 1]?.sender._id !== m?.sender._id ? (<Avatar
                                        mt=".7rem"
                                        mr={ 1 }
                                        size="sm"
                                        cursor="pointer"
                                        name={ m?.sender?.name }
                                        src={ m?.sender?.imgSrc }
                                        marginLeft={ 1 }
                                    />) : (<>
                                        <span style={ { marginLeft: "2.5rem" } } />
                                    </>)
                                    }
                                    <span
                                        style={ {

                                            backgroundColor: "#FFFFFF",
                                            color: "black",
                                            borderRadius: "20px",
                                            padding: "5px 15px",
                                            maxWidth: "75%",
                                            marginTop: isSameUser(messages, m, i) ? 3 : 10
                                        } }
                                    >{ m?.content }</span>
                                </div>
                            </>) }
                    </>
                )) }

            </ScrollableFeed>
        </>
    )
}

export default ScrollChatBox
