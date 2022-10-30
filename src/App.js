import "./App.css";
import JoinRoom from "./components/Room/JoinRoom";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
import { useStateValue } from "./utils/StateProvider";

const socket = io.connect("http://localhost:3001");

function App() {
  const [{ showChat }] = useStateValue();

  return (
    <div className="App">
      {showChat ? (
        <Chat socket={socket} />
      ) : (
        <JoinRoom socket={socket} showChat={showChat} />
      )}
    </div>
  );
}

export default App;

// import "./App.css";
// import JoinRoom from "./JoinRoom";
// import io from "socket.io-client";
// import { useEffect, useState } from "react";
// import MessageFromServer from "./MessageFromServer";
// import { useStateValue } from "./StateProvider";
// import Chat from "./Chat";

// const socket = io.connect("http://localhost:3001");

// function App() {
//   const [{ showChat, message }, dispatch] = useStateValue();
//   // boolean state

//   // messages State
//   const [messageFromServer, setMessageFromServer] = useState(
//     "Futur Message Will Appear Here"
//   );

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       console.log(data, "this is the data final");
//       setMessageFromServer(data.message);
//     });
//   }, [socket]);

//   useEffect(() => {
//     console.log(showChat);
//   }, []);

//   return (
//     <div className="App">
//       <JoinRoom socket={socket} showChat={showChat} />
//       {showChat && <Chat socket={socket} />}

//       <h1> Message:</h1>
//       {messageFromServer}
//       {/*<MessageFromServer dataToServer={messageFromServer} />*/}
//     </div>
//   );
// }

// export default App;
