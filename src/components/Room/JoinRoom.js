import React from "react";
import { useState } from "react";
import { useStateValue } from "../../utils/StateProvider";
import "./JoinRoom.css";

const defaultFormFields = {
  userName: "",
  roomNumber: "",
};

function JoinRoom({ socket }) {
  const [{}, dispatch] = useStateValue();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { userName, roomNumber } = formFields;

  // the line 14 & 15 make everything dynamic and we don't have to handle to onChange function
  //user InfoName
  // const [userName, setUserName] = useState("");
  //roomNumber state
  // const [roomNumber, setRoom] = useState("");
  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const joinRoom = () => {
    if (roomNumber !== "" && userName !== "") {
      socket.emit("join_room", { userName, roomNumber });
      dispatch({
        type: "JOIN_ROOM",
        room: roomNumber,
        user: userName,
        showChat: true,
      });
      dispatch({
        type: "CHECK_CASE",
      });

      // console.log(formFields);
      setFormFields(defaultFormFields);
    }
  };
  return (
    <div className="joinChatContainer">
      <h3>Join A Chat</h3>

      <input
        required
        type="text"
        value={userName}
        name="userName"
        placeholder="John Doe ..."
        onChange={handleChange}
      />
      <input
        required
        type="text"
        value={roomNumber}
        name="roomNumber"
        placeholder="Room ID  ..."
        onChange={handleChange}
      />
      <button onClick={joinRoom}> Join a Room</button>
    </div>
  );
}

export default JoinRoom;
