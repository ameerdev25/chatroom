import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Login() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "") {
      alert("Please key in username");
      return;
    }

    const roomId = uuidv4();

    navigate("/chatroom/" + roomId, {replace: false, state:{username: username, roomid: roomId}});
  }

  return(
    <div className='flex flex-col h-full items-center justify-center'>
      <div className='flex flex-col'>
        <h1 className='self-center text-7xl font-bold'>ChatRoom</h1>
        <div className='bg-purple-800 h-fit w-fit flex flex-col text-white p-5 rounded-lg'>
          <h1 className='self-center text-4xl font-bold'>Create a room</h1>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <label className='text-2xl'>Username</label>
            <input className='text-2xl text-black pl-1 rounded-lg' type='text' onChange={e => setUsername(e.target.value)} autoComplete='off'/>
            <button className='border border-white text-white mt-4 h-16 text-2xl font-bold rounded-lg hover:bg-white hover:text-purple-800'>Create</button>
          </form>
        </div>
      </div>    
    </div>
    
    
  );
}

export default Login;
