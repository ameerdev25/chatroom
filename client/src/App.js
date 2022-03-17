import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Chatroom from "./components/Chatroom/Chatroom";
import Login from "./components/Login/Login";

function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/chatroom/:id" element={<Chatroom/>} />
        </Routes>
      </div>
      
    </Router>
  )
}

export default App;
