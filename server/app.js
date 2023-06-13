//import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");
const cookieParser = require('cookie-parser');

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
// const userRoute = require("./routes/user/userRoutes");
// const adminRoute = require("./routes/admin/adminRoutes");

app.use("/api/auth", authRoute);
// app.use("/api/user",userRoute)
// app.use("/api/admin",adminRoute)
//port
const port = process.env.port || 8080;

//listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);

/*The cors() function takes an object with two properties: origin and credentials. 
The origin property specifies which domains are allowed to make cross-origin requests to the application.
 Setting it to true allows requests from any domain. The credentials property indicates whether the server 
 should include any cookies or HTTP authentication information in the cross-origin request.
*/