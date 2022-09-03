const express = require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors")
app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}` )

//specifying the room your joining
//"join_room" is an event that was created on the front end
    socket.on("join_room", (data) => {
        //data is the room id
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})