import styled from "styled-components";

const ChatBubbleWrapperSelf = styled.div`
width: 100%;
height: auto;
padding: 20px;
color: #fff;
box-sizing: border-box;
display: flex;
justify-content: flex-end;
`;

const ChatBubbleWrapperOthers = styled.div`
width: 100%;
height: auto;
padding: 20px;
color: #fff;
box-sizing: border-box;
display: flex;
`;

const ChatBubbleInner = styled.div`
display: flex;
flex-direction: column;
background: #9F3548;
width: fit-content;
height: fit-content;
padding: 10px;
border-radius: 10px;
`;

const UsernameLabel = styled.span`
font-size: 20px;
font-weight:bold;
`; 

const ChatMessage = styled.span`  
font-size: 25px;
line-height: 20px;
`; 

const ChatTime = styled.span`  
font-size: 20px;
align-self: end;
`;

function ChatBubble(props) {

    const selfChatBubble = () => {
        return(
            <ChatBubbleWrapperSelf>
                <ChatBubbleInner>
                    <UsernameLabel>{props.username}</UsernameLabel>
                    <ChatMessage>{props.message}</ChatMessage>
                    <ChatTime>{props.time}</ChatTime>
                </ChatBubbleInner>
            </ChatBubbleWrapperSelf>
        );
    }

    const otherChatBubble = () => {
        return(
            <ChatBubbleWrapperOthers>
                <ChatBubbleInner>
                    <UsernameLabel>{props.username}</UsernameLabel>
                    <ChatMessage>{props.message}</ChatMessage>
                    <ChatTime>{props.time}</ChatTime>
                </ChatBubbleInner>
            </ChatBubbleWrapperOthers>
        );
    }

    return(
        <div>
            {props.type === "self" ? selfChatBubble() : otherChatBubble()}
        </div>
    );
}

export default ChatBubble;