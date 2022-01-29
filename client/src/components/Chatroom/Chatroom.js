import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatBubble from '../ChatBubble/ChatBubble';

const Wrapper = styled.div`
  height: 100%;
`;

const ChatAreaWrapper = styled.div`
  background: #9F3548;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  float:left;
`;

const ChatArea = styled.div`
  background: #fff;
  width: 100%;
  height: 95%;
  overflow: scroll;
`;

const Input = styled.input`
  height: 5%;
  width: 70%;
  margin-top: 8px;
  float: left;
  font-family: 'Dongle', sans-serif;
  font-size: 30px;
`;

const Button = styled.button`
  height: 5%;
  width: 20%;
  margin-top: 11px;
  float: right;
  font-family: 'Dongle', sans-serif; 
  font-size: 25px;   
  background: #9F3548;
  border: 1px solid #fff;
  color: #fff;  
  font-weight: bold;
  &:hover{
    background: #fff;
    color: #9F3548;
  }
`;

function Chatroom(props) {
  const location = useLocation();

  const navigate = useNavigate();

  const [username] = useState(location.state.username);
  const [room] = useState(location.state.room);
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState([]);

  useEffect(() => {    
    getSocketData(props.socket);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message !== "") {
      var time = new Date();      
      props.socket.emit('chat message', {username: username, room: room, message: message, time: time.toLocaleString([], {hour: '2-digit', minute: '2-digit', hour12:true})});
      setMessage("");
    }
  }

  const getSocketData = (socket) => {  
    if(props.socket === undefined) {
      navigate('/', {replace: false});
    } else {
      socket.on("message", (data) => {
        setChatData(arr => [...arr, {username: data.username, room: data.room, message: data.message, time: data.time}]);
        console.log("New data received");
      }); 
    }      
  }

  return(
    <Wrapper>
      <ChatAreaWrapper>
        <ChatArea>
          {chatData.map((chat, index) => {
          return <ChatBubble key={index} type={chat.username === username ? "self" : "others"} username={chat.username} message={chat.message} time={chat.time}/>
          })}
        </ChatArea>
        <form onSubmit={sendMessage}>
          <Input placeholder='Message' value={message} onChange={e => setMessage(e.target.value)}/>
          <Button>Send</Button>
        </form>        
      </ChatAreaWrapper>
    </Wrapper>
  );
}

export default Chatroom;
