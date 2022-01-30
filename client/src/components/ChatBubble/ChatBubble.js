function ChatBubble(props) {

    const chatDisplay = () => {
        if(props.type === "connect") {
            return connectAnnouncement();
        } else if(props.type === "disconnect") {
            return disconnectAnnouncement();
        } else if(props.type === "chat") {
            if (props.sender === "self") {
                return selfChatBubble();
            } else {
                return otherChatBubble();
            }
        }
    }

    const connectAnnouncement = () => {
        return(
            <span className="self-center text-stone-400 text-xl font-bold">
                {props.username} has joined the room
            </span>
        );
    }

    const disconnectAnnouncement = () => {
        return(
            <span className="self-center text-stone-400 text-xl font-bold">
                {props.username} has disconnected from the room
            </span>
        );
    }

    const selfChatBubble = () => {
        return(
            <div className="flex flex-col self-end p-2 mb-2 rounded-xl text-white bg-purple-800 h-fit max-w-xs">
                <span className='font-bold'>{props.username}</span>
                <span className='text-2xl leading-5'>{props.message}</span>
                <span className='self-end'>{props.time}</span>
            </div>
        );
    }

    const otherChatBubble = () => {
        return(
            <div className="flex flex-col p-2 mb-2 rounded-xl text-purple-800 border border-purple-800 h-fit w-fit max-w-xs">
                <span className='font-bold'>{props.username}</span>
                <span className='text-2xl leading-5'>{props.message}</span>
                <span className='self-end'>{props.time}</span>
            </div>
        );
    }

    return(
        <div className="flex flex-col">
            {chatDisplay()}
        </div>        
    );
}

export default ChatBubble;