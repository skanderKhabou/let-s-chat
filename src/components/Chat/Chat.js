import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Chat.css";
import ChatBody from "./ChatBody/ChatBody";
import { useStateValue } from "../../utils/StateProvider";

function Chat({ socket }) {
  const [{ roomNumber, userName }] = useStateValue();
  // const [currentTime, setCurrentTime] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      // console.log(currentMessage, "the current message");
      const messageData = {
        room: roomNumber,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    } else {
      console.log("You should at least write more than two letters");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data, "this is the data from ");
      // setMessageList(messageList.push(currentMessage));
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        {" "}
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <ChatBody
                key={Math.floor(Math.random() * 100)}
                messageContent={messageContent}
              />
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          placeholder="Hey ..."
          type="text"
          name="currentMessage"
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

// import React, { useEffect, useState } from "react";

// import "./Chat.css";
// import { useStateValue } from "./StateProvider";

// function Chat({ socket }) {
//   const [{ roomNumber, userName, message, time }, dispatch] = useStateValue();
//   const [currentTime, setCurrentTime] = useState("");

//   const [currentMessage, setCurrentMessage] = useState("");

//   const sendMessage = async () => {
//     if (roomNumber !== "" && userName !== "" && currentMessage !== "") {
//       // console.log(currentMessage, "the current message");
//       await setCurrentTime(
//         new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes()
//       );
//       await dispatch({
//         type: "SEND_CHAT",
//         message: currentMessage,
//         time: currentTime,
//       });
//       await socket.emit("send_message", {
//         message,
//         roomNumber,
//         userName,
//         time,
//       });
//       setCurrentMessage("");
//     } else {
//       console.log("please join a room and register");
//     }
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       // console.log(data, "this is the data from ");
//     });
//   }, [socket]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         {" "}
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body"> </div>
//       <div className="chat-footer">
//         <input
//           placeholder="Hey ..."
//           type="text"
//           name="currentMessage"
//           value={currentMessage}
//           onChange={(event) => {
//             setCurrentMessage(event.target.value);
//           }}
//         />
//         <button onClick={sendMessage}>&#9658;</button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
