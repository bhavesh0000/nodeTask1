const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const dbURI = require('./db')
const userRoutes = require('./routes/user')
const http =  require('http')
const socketIo = require('socket.io')
const app = express()
const path = require('path')
const server = http.createServer(app)
const io =  socketIo(server)

dotenv.config({path:'./.env'})
const port = process.env.PORT || 3000


dbURI()
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

const connectedUsers = {}
io.on("connection", function(socket){
    console.log("a user connected:" + socket.id)
     socket.on("userConnected", function(user){
        // Add the user to the connectedUsers object
        connectedUsers[socket.id] = user;
        socket.join("live users");
        io.to("live users").emit("userListUpdated", Object.values(connectedUsers));
    });

    // Handle disconnection
    socket.on("disconnect", function(){
        // Remove the user from the connectedUsers object
        delete connectedUsers[socket.id];
        io.to("live users").emit("userListUpdated", Object.values(connectedUsers));
    })
})
app.use('/api/user',(req, res, next) =>{
    req.app.set('io', io)
    next()
}, userRoutes)
server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})