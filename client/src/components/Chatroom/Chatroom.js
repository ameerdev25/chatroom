import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatBubble from '../ChatBubble/ChatBubble';

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
        socket.on("announcement", (data) => {
            setChatData(arr => [...arr, {username: data.username, room: data.room, type: "connect"}])
        });

        socket.on("message", (data) => {
            setChatData(arr => [...arr, {username: data.username, room: data.room, message: data.message, time: data.time, type: "chat"}]);
            console.log("New data received");
        });   
        
        socket.on("userDisconnect", (data) => {
            setChatData(arr => [...arr, {username: data.username, room: data.room, type: "disconnect"}])
        });
    }      
  }

  return(
    <div className='flex flex-col h-full items-center justify-center'>
        <div className='flex flex-col bg-purple-800 h-full w-full p-3 lg:w-3/12 lg:my-3 lg:mx-3 lg:rounded-lg'>
            <div className='flex flex-col bg-white rounded-lg w-full grow p-1 overflow-auto'>
                {chatData.map((chat, index) => {
                    return <ChatBubble key={index} type={chat.type} sender={chat.username === username ? 'self':'others'} username={chat.username} message={chat.message} time={chat.time}/> 
                })} 
                             
            </div>
            <form className='flex mt-3' onSubmit={sendMessage}>
                <input type='text' className='text-xl rounded-lg pl-1 grow' value={message} onChange={e => setMessage(e.target.value)} placeholder='Message...'/>
                <button className='bg-white border text-purple-800 rounded-lg font-bold ml-3 py-1 px-4 hover:bg-purple-800 hover:text-white'>Send</button>
            </form>
        </div>
    </div>
  );
}

export default Chatroom;
