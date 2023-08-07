import "../chats.css";

import socket from "../socket";
import { useState, useEffect } from "react";
const UserChatComponent = ({ userName }) => {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

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

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        sender: userName,
        message: currentMessage,
      };
      await socket.emit("send_message", messageData);
      setCurrentMessage(""); // Clear the current message after sending
    }
  };

  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-right-text comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle badge border border-light rounded-circle bg-danger p-2">
          <span className="visually-hidden">unread messages</span>
        </span>
        <i className="bi bi-x-circle close"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Chat Room</h6>
        </div>
        <div className="chat-form">
          <div className="cht-msg">
            {messageList.map((msg, index) => (
              <div key={index}>
                <p
                  className={`bg-${
                    msg.sender === userName ? "secondary" : "primary"
                  } p-3 ms-4 text-light rounded-pill`}
                >
                  <b>{msg.sender === userName ? "You" : userName} wrote:</b>
                  {" " + msg.message}
                </p>
              </div>
            ))}
          </div>
          <div className="textarea-container">
            <textarea
              id="clientChatMsg"
              className="form-control"
              placeholder="Your Text Message"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary inside-textarea-btn"
              onClick={sendMessage}
            >
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChatComponent;
