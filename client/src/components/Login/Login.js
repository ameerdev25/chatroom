import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    }
    // Need to bind the handle submit to enable setState
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      redirect: true,
    })
  }

  render() {
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

    return(
      <Wrapper>
        <LoginBoxWrapper>
          <Title>ChatRoom</Title>
          <LoginBox>
            {this.state.redirect ? <Navigate replace={this.setState({redirect: false})} to="/chatroom"/> : ''}
            <H1NoMargin>Join a room</H1NoMargin>
            <form onSubmit={this.handleSubmit}>
              <Label htmlFor='username'>Username</Label><br/>
              <Input type="text" name='username'/>
              <Label htmlFor='room'>Room name</Label>
              <Input type="text" name='room'/>
              <Button>Join</Button>
            </form>            
          </LoginBox>          
        </LoginBoxWrapper>        
      </Wrapper>
    );
  }
}

export default Login;
