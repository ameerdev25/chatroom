import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import ChatBubble from '../ChatBubble/ChatBubble';
import { MdSend } from 'react-icons/md';
import { BsEmojiSmileFill } from 'react-icons/bs'
import { FiUserPlus } from 'react-icons/fi'
import EmojiPicker from 'emoji-picker-react';
import * as CONSTANTS from '../../utility/Constants';

function Chatroom() {
  const location = useLocation();

  const navigate = useNavigate();

  const [socket, setSocket] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState([]);
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const { id } = useParams();

  const scrollPoint = useRef();

  useEffect(() => {
    const socketio = io(CONSTANTS.ENDPOINT);
    setSocket(socketio);
    connectToRoom(socketio);
    getSocketData(socketio);
  }, []);  

  const connectToRoom = (socket) => {
    if (!location.state) {
      // User join from link, so there is no location username passed
      socket.emit("roomCheck", {roomid:id}, res => {
        if (res.status === 'success') {
          let newUsername = prompt("Key in username");
          if(newUsername === "") {
            newUsername = prompt("Username cannot be empty!");
          } else if (newUsername) {
            socket.emit("join room", {username: newUsername, roomid: id});
            setUsername(newUsername);
          } else {
            navigate('/', {replace: false});
          }            
        } else {
          alert("Room not exist");
          navigate('/', {replace: false});
        }
      });      
    } else {   
      // User create the room   
      setUsername(location.state.username);
      console.log(location.state.username);
      socket.emit("createRoom", {roomid:id, username:location.state.username});
      socket.emit("roomCheck", {roomid:id}, res => {
        if (res.status === 'success') {
          socket.emit("join room", {username: location.state.username, roomid: id});
        } else {
          alert("Room not exist");
          navigate('/', {replace: false});
        }
      });      
    }
       
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if (message !== "") {
      var time = new Date();      
      socket.emit('chat message', {username: username, room: id, message: message, time: time.toLocaleString([], {hour: '2-digit', minute: '2-digit', hour12:true})});
      setMessage("");
    }
  }

  const getSocketData = (socket) => {  
    if(socket === undefined) {
      navigate('/', {replace: false});
    } else {
        socket.on("announcement", (data) => {
            setChatData(arr => [...arr, {username: data.username, room: data.room, type: "connect"}])
            //Scroll to bottom
            scrollPoint.current.scrollIntoView({behavior: 'smooth'});
        });

        socket.on("message", (data) => {
            setChatData(arr => [...arr, {username: data.username, room: data.room, message: data.message, time: data.time, type: "chat"}]);
            console.log("New data received");
            //Scroll to bottom
            scrollPoint.current.scrollIntoView({behavior: 'smooth'});
        });   
        
        socket.on("userDisconnect", (data) => {
            setChatData(arr => [...arr, {username: data.username, room: data.room, type: "disconnect"}])
            //Scroll to bottom
            scrollPoint.current.scrollIntoView({behavior: 'smooth'});
        });
    }      
  }

  const emojiPicker = () => {
    if (emojiPickerShow === false) {
      setEmojiPickerShow(true);
    } else {
      setEmojiPickerShow(false);
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const inviteLink = () => {
    if (isInviteModalOpen) {
      setIsInviteModalOpen(false);
    } else {
      setIsInviteModalOpen(true);
    }
  }

  return(
    <div className='flex flex-col h-full items-center justify-center'>
        <div className='flex flex-col bg-purple-800 h-full w-full p-3'>            
            <div className='flex flex-col bg-white rounded-lg w-full grow p-1 overflow-auto'>
                {chatData.map((chat, index) => {
                    return <ChatBubble key={index} type={chat.type} sender={chat.username === username ? 'self':'others'} username={chat.username} message={chat.message} time={chat.time}/> 
                })} 
                <div ref={scrollPoint}></div>
            </div>
            <form className='flex mt-3 space-x-1' onSubmit={sendMessage}>
                <input type='text' className='text-xl h-6 sm:h-8 rounded-lg pl-1 grow' value={message} onChange={e => setMessage(e.target.value)} placeholder='Message...'/>
                <button type='button' onClick={inviteLink} className='bg-white border text-purple-800 text-sm rounded-lg font-bold py-1 px-2 hover:bg-purple-800 hover:text-white'>
                    <FiUserPlus />
                </button>
                <button type='button' onClick={emojiPicker} className='bg-white border text-yellow-500 text-sm rounded-lg font-bold py-1 px-2 hover:bg-purple-800 hover:text-white hidden xl:inline-block'><BsEmojiSmileFill /></button>
                <button type='submit' className='bg-white border text-purple-800 text-sm rounded-lg font-bold py-1 px-2 hover:bg-purple-800 hover:text-white'>
                    <MdSend />
                </button>
            </form>
            {emojiPickerShow ? <EmojiPicker onEmojiClick={onEmojiClick} pickerStyle={{alignSelf: 'end', marginTop: '0.75rem', width: '100%'}}/> : ""}
        </div>

        <div className={'absolute bg-purple-800 p-5 rounded-lg text-white xl:text-2xl lg:text-xl md:text-base sm:text-sm ' + (isInviteModalOpen ? '' : 'hidden')}>
          <p>Share the following link: </p>
          <div className='bg-white h-auto w-auto text-black p-1 overflow-hidden'>
            http://localhost:3000/chatroom/{id}
          </div>
        </div>        
    </div>
  );
}

export default Chatroom;
