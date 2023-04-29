require("dotenv").config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const  {createServer} = require('http');
const  {Server} = require("socket.io")


const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "https://videochatbyjassi.onrender.com",  
      methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

app.use((req,res,next) => {
    req.io = io;
    next();
})

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
app.use(
    cors({
        origin: "https://videochatbyjassi.onrender.com",
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);



httpServer.listen(process.env.PORT || '8000', () => {
    console.log(`Server started at port ${process.env.PORT || '8000'}`);
});
// module.exports = app;
