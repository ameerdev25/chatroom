import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Chatroom from "./components/Chatroom/Chatroom";
import Login from "./components/Login/Login";

class App extends React.Component {
  render() {

    const Wrapper = styled.div`
      ${'' /* padding: 0 10px 0 10px; */}
      height: 100%;
    `;

    return(
      <Router>
        <Wrapper>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/chatroom" element={<Chatroom/>} />
        </Routes>
        </Wrapper>
      </Router>
    );
  }
}

export default App;
