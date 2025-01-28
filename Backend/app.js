const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');
const Chat = require('./models/Chat');

app.use(cors());

dotenv.config();

const port = process.env.PORT || 5000;

const mongoUrl = process.env.DB_CONNECT || mongoUrl;

require('./models/model');
require('./models/post');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/createPost'));
app.use(require('./routes/user'));
app.use(chatRoutes);
mongoose.connect(mongoUrl);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
})

mongoose.connection.on('error', () => {
    console.log('not connected to MongoDB');
})

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', async (msg) => {
        const chat = new Chat({ username: msg.username, message: msg.message });
        await chat.save();
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});