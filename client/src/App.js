import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chatroom from "./components/Chatroom/Chatroom";
import Login from "./components/Login/Login";
import { io } from "socket.io-client";
import * as CONSTANTS from "./utility/Constants";

function App() {

  const [socketio, setSocketio] = useState();

  useEffect(() => {
    const socket = io(CONSTANTS.ENDPOINT);
    setSocketio(socket);
  }, []);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route exact path="/" element={<Login socket={socketio}/>} />
          <Route path="/chatroom" element={<Chatroom socket={socketio}/>} />
        </Routes>
      </div>
      
    </Router>
  )
}

export default App;
