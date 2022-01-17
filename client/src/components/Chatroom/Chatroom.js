import React from 'react';
import styled from 'styled-components';


class Chatroom extends React.Component {
  render() {

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

    return(
     <Wrapper>
      <ChatAreaWrapper>
        <ChatArea></ChatArea>
        <Input placeholder='Message'/>
        <Button>Send</Button>
      </ChatAreaWrapper>
      <UserListWrapper>
        <UserListTitle>Users</UserListTitle>
        <UserList>
          
        </UserList>
      </UserListWrapper>
     </Wrapper>
    );
  }
}

export default Chatroom;
