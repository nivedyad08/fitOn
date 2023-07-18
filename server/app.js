//import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const { checkSubscriptionStatus } = require("./cronJobs/subscriptionCron")
cron.schedule('0 0 * * *', async () => {
  const result = await checkSubscriptionStatus();
});


//app
const app = express();

//Socket IO
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});
let users = [];

socketIO.on('connection', (socket) => {
  console.log(7777);
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('newUser', (data) => {
    console.log(66666);
    users.push(data);
    console.log(users);

    socketIO.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));



//db
require("./config/database").connectDb();

//routes
const authRoute = require("./routes/authRoutes");
const adminRoute = require("./routes/admin/adminRoutes");
const trainerRoute = require("./routes/trainer/trainerRoutes");
const userRoute = require("./routes/user/userRoutes");

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute)
app.use("/api/trainer", trainerRoute)
app.use("/api/user", userRoute)

//port
const port = process.env.port || 8080;

//listener
http.listen(port, () =>
  console.log(`Server is running on port ${ port }`)
);

/*The cors() function takes an object with two properties: origin and credentials. 
The origin property specifies which domains are allowed to make cross-origin requests to the application.
 Setting it to true allows requests from any domain. The credentials property indicates whether the server 
 should include any cookies or HTTP authentication information in the cross-origin request.
*/