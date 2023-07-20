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
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//db
require("./config/database").connectDb();

//middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

//routes
const authRoute = require("./routes/authRoutes");
const adminRoute = require("./routes/admin/adminRoutes");
const trainerRoute = require("./routes/trainer/trainerRoutes");
const userRoute = require("./routes/user/userRoutes");
const chatRoute = require("./routes/chats/chatRoute");

const server = app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000"
  }
})

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (user) => {
    socket.join(user);
    console.log('user setupped');
    socket.emit('connected');
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined in room " + room);
  })

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on('new message', (newMessageRecieved) => {
    console.log(newMessageRecieved);
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("no users");
    chat.users.forEach(user => {
      if (user._id == newMessageRecieved.sender._id)
        console.log("message received");
      return socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  })

  socket.off("setup", () => {
    console.log("User disconned");
    socket.leave(user._id);
  })
})

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/trainer", trainerRoute);
app.use("/api/user", userRoute);
app.use("/api/chats", chatRoute);

//port
const port = process.env.port || 8080;

//listener
// const server = app.listen(port, () =>
//   console.log(`Server is running on port ${ port }`)
// );


/*The cors() function takes an object with two properties: origin and credentials. 
The origin property specifies which domains are allowed to make cross-origin requests to the application.
 Setting it to true allows requests from any domain. The credentials property indicates whether the server 
 should include any cookies or HTTP authentication information in the cross-origin request.
*/