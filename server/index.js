var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

let roomids = [];

//Handles the connection to the socket
//Connect to socket
io.on("connection", function(socket) {
    console.log("A user is connected");

    let username;
    let room;

    socket.on("createRoom", (data) => {
        const roomObj = {"roomid":data.roomid, "host":data.username}
        roomids.push(roomObj);
    });

    socket.on("roomCheck", (data, callback) => {
        let status = 'fail';
        let roomObj = roomids.filter(obj => {
            return obj.roomid === data.roomid;
        });
        
        if (roomObj.length > 0) {
            status = 'success';
        }
        callback({
            status: status
        });        
    });

    socket.on("join room", (data) => {  
        username = data.username;
        room = data.roomid;      
        socket.join(data.roomid);
        io.to(data.roomid).emit("announcement", {username: data.username, room: data.roomid});
        console.log(data.username + " joined " + data.roomid + " room");
    });

    socket.on("chat message", (data) => {
        console.log(data.username + ": " + data.message + " (" + data.room + ")");
        io.to(data.room).emit("message", {username: data.username, room: data.room, message:data.message, time: data.time});
    });

    socket.on("disconnect", (data) => {
        io.to(room).emit("userDisconnect", {username:username, room:room});
        
        let index = roomids.findIndex(obj => {
            return obj.roomid === room;
        });

        let roomObj = roomids.filter(obj => {
            return obj.roomid === room;
        });

        //Remove the room from array if the host leave
        //Check if the one leaving is the host username
        if(roomObj[0].host === username) {
            roomids.splice(index, 1);
            console.log("Room " + room + " removed");
        }        

        console.log("A user disconnected");
    });
});

http.listen(3333);