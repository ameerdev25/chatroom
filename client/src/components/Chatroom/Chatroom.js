import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import ChatBubble from '../ChatBubble/ChatBubble';

const Wrapper = styled.div`
  height: 100%;
`;

const ChatAreaWrapper = styled.div`
  background: #9F3548;
  width: 80%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  float:left;
`;

const ChatArea = styled.div`
  background: #fff;
  width: 100%;
  height: 95%;
`;

const Input = styled.input`
  height: 5%;
  width: 90%;
  margin-top: 8px;
  float: left;
  font-family: 'Dongle', sans-serif;
  font-size: 30px;
`;

const Button = styled.button`
  height: 5%;
  width: 8%;
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

const UserListWrapper = styled.div`
  height: 100%;
  width: 20%;
  background: #9F3548;
  float: right;
  padding: 20px;
  padding-left: 0;
  box-sizing: border-box;
`;

const UserList = styled.div`
  color: #fff;
  background: #781426;
  height: 300px;
`;

const UserListTitle = styled.p`
  margin: 0;
  font-size: 35px;
  color: #fff;
`;

function Chatroom(props) {
  const location = useLocation();

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
    socket.on("message", (data) => {
      setChatData(arr => [...arr, {username: data.username, room: data.room, message: data.message, time: data.time}]);
      console.log("New data received");
    });  
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
    <UserListWrapper>
      <UserListTitle>Users</UserListTitle>
      <UserList>
        
      </UserList>
    </UserListWrapper>
    </Wrapper>
  );
}

export default Chatroom;
