import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// styled-components
const Wrapper = styled.div`
height: 100%;
`;

const LoginBoxWrapper = styled.div`
display: flex;
height: 100%;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const Title = styled.h1`
font-size: 60px;
margin: 0;
color: #50000E;
`;

const LoginBox = styled.div`
background: #9F3548;
height: auto;
width: 250px;
padding: 20px 10px 20px 10px;
display: flex;
flex-direction: column;
color: #fff;
`;


const H1NoMargin = styled.p`
margin: 0;
color: #fff;
align-self: center;
font-weight: bold;
font-size: 40px;
margin-bottom: 10px;
`;

const Label = styled.label`
font-weight: bold;
font-size: 25px;
`;

const Input = styled.input`
width: 100%;
box-sizing: border-box;
`;

const Button = styled.button`
font-family: 'Dongle', sans-serif;
width: 100%;
height: 60px;
margin-top: 10px;
background: #9F3548;
border: 1px solid #fff;
color: #fff;
font-weight: bold;
font-size: 30px;
&:hover{
  background: #fff;
  color: #9F3548;
}
`;
// End styled-components

function Login(props) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "") {
      alert("Please key in username");
      return;
    }

    if (room === "") {
      alert("Please key in room");
      return;
    }

    props.socket.emit("join room", {username: username, room: room}, (response) => {
      if (response.status === 'ok') {
        navigate("/chatroom", {replace: false, state:{username: username, room: room}});
      }
    });
  }

  return(
    <Wrapper>
      <LoginBoxWrapper>
        <Title>ChatRoom</Title>
        <LoginBox>
          <H1NoMargin>Join a room</H1NoMargin>
          <form onSubmit={handleSubmit}>
            <Label>Username</Label><br/>
            <Input type="text" name='username' onChange={e => setUsername(e.target.value)} autoComplete='off'/>
            <Label>Room name</Label>
            <Input type="text" name='room' onChange={e => setRoom(e.target.value)} autoComplete='off'/>
            <Button>Join</Button>
          </form>            
        </LoginBox>          
      </LoginBoxWrapper>        
    </Wrapper>
  );
}

export default Login;
