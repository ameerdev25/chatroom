var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, {
    cors: {
        origin: ["http://localhost:3000", "http://192.168.1.103:3000", "http://192.168.1.107:3000"],
        methods: ["GET", "POST"],
        credentials: true
      }
});

//Handles the connection to the socket
//Connect to socket
io.on("connection", function(socket) {
    console.log("A user is connected");
    let username;
    let room;

    //Listening to "join room"
    socket.on("join room", (data) => {  
        username = data.username;
        room = data.roomid;      
        socket.join(data.roomid);
        io.to(data.roomid).emit("announcement", {username: data.username, room: data.roomid});
        console.log(data.username + " joined " + data.roomid + " room");
    });

    //Listening to "chat message"
    socket.on("chat message", (data) => {
        console.log(data.username + ": " + data.message + " (" + data.room + ")");
        io.to(data.room).emit("message", {username: data.username, room: data.room, message:data.message, time: data.time});
    });

    //Listening to "disconnect"
    socket.on("disconnect", (data) => {
        io.to(room).emit("userDisconnect", {username:username, room:room});
        console.log("A user disconnected");
    });
});

http.listen(3333);