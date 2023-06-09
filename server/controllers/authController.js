const User = require("../models/usersMdl");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const moment = require("moment");

// Registeration
const register = async (req, res) => {
  let { name, email, password, phone } = req.body;
  let profilePic = "";
  try {
    if (name && email && password && phone) {
      const isUser = await User.findOne({ email: email });
      if (isUser) {
        return res.status(400).json({ message: "User already exists !!" });
      } else {
        if (!req.file) {
          profilePic = "user.jpeg";
        } else {
          profilePic = req.file.filename;
        }
        const newUser = User({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          phone,
          profilePic,
          isAdmin: false,
          status : true,
          createdAt:  moment().format("YYYY-MM-DD")
        });
        const resUser = await newUser.save();
        if (resUser) {
          return res
            .status(201)
            .json({ message: "Registered Successfully", user: resUser });
        }
      }
    } else {
      return res.status(400).json({ message: "All fields are required !!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Login
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (email && password) {
//       const user = await User.findOne({ email: email });
//       console.log(user);
//       if (user) {
//         if (await bcrypt.compare(password, user.password)) {
//           //Gererate Token
//           const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
//             expiresIn: "1d",
//           });
//           if (user.isAdmin) {
//             const usersList = await User.find({isAdmin:false})
//             return res
//               .status(200)
//               .json({ message: "Login Successfully", token, users: usersList ,user:user});
//           } else {
//             return res
//               .status(200)
//               .json({ message: "Login Successfully", token, user: user });
//           }
//         } else {
//           return res.status(400).json({ message: "Invalid Credentials" });
//         }
//       } else {
//         return res.status(400).json({ message: "User not Registered" });
//       }
//     } else {
//       return res.status(400).json({ message: "All fields are required !!" });
//     }
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// const getData = async (req, res) => {
//   try {
//     return res.status(200).json(req.user);
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  register,
//   login,
//   getData,
};
