import React, { useState, useEffect } from "react";

function LobbyPage({socket}) {
    const [currentMessage, setCurrentMessage] = useState(""); 
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                message: currentMessage,
            };
            await socket.emit("send_message", messageData);
        }
    }

    function handleClick() {
        console.log('send message to server');
        socket.emit('msg', {message: "Pre-set Message"});
        console.log('message sent');
    }
    
    useEffect(() => {
        const handleReceiveMessage = (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        };
    
        socket.on("receive_message", handleReceiveMessage);
    
        // Unsubscribe when component unmounts
        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    
    }, [socket]);
    


    return (
    <div>
        {/* Added navbar links, Rules page redirect to home page, are we having home page 
        to show rules? */}
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg justify-content-between">
            <a class="navbar-brand" href="/">Group Out of Town - Speed</a>

            <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/">Rules</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Top Score</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Logout</a>
                </li>
                </ul>
            </div>
        </nav>
        <p>This is lobby page, basic chat function</p>
        <div>
            {messageList.map((messageContent) => {
                return <p>{messageContent.message}</p>;
            })}
        </div>
        <input type="text" placeholder="Message" onChange={(event) => {
            setCurrentMessage(event.target.value);
        }}/>
        <button onClick={sendMessage}>Send custom message</button>
        <button onClick={handleClick}>Send pre-set message</button>

    </div>
)}

export default LobbyPage;
