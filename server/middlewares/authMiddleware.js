const jwt = require("jsonwebtoken");
const User = require("../models/usersMdl");

const checkIsUserAuthenticated = async (req, res, next) => {
  console.log(4567890);
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      //verify token
      const { userId } = jwt.verify(token, process.env.SECRET_KEY,{});
      //Get User from Token
      req.user = await User.findById(userId);
      req.userId = userId;
      next();
    } catch (error) {
      res.status(401).json("You are not authenticated !!");
    }
  } else {
    res.status(401).json("You are not authenticated !!");
  }
};

module.exports = checkIsUserAuthenticated
