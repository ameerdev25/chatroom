import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Chatroom from "./components/Chatroom/Chatroom";
import Login from "./components/Login/Login";
import { io } from "socket.io-client";
import * as CONSTANTS from "./utility/Constants";

const Wrapper = styled.div`
      ${'' /* padding: 0 10px 0 10px; */}
      height: 100%;
    `;

function App() {

  const [socketio, setSocketio] = useState();

  useEffect(() => {
    const socket = io(CONSTANTS.ENDPOINT);
    setSocketio(socket);
  }, []);

  return (
    <Router>
      <Wrapper>
      <Routes>
        <Route exact path="/" element={<Login socket={socketio}/>} />
        <Route path="/chatroom" element={<Chatroom socket={socketio}/>} />
      </Routes>
      </Wrapper>
    </Router>
  )
}

export default App;
