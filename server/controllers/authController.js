const User = require("../models/usersMdl");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const moment = require("moment");

// Registeration
const register = async (req, res) => {
  let { firstName, lastName, email, password, role } = req.body;
  try {
    if (firstName && lastName && email && password && role) {
      const isUser = await User.findOne({ email: email });
      if (isUser) {
        return res.status(400).json({ message: "User already exists !!" });
      } else {
        const newUser = User({
          firstName,
          lastName,
          email,
          role,
          password: await bcrypt.hash(password, 10),
        });
        const resUser = await newUser.save();
        if (resUser) {
          return res
            .status(200)
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

//Profile Complete
const profileComplete = async (req, res) => {
  try {
    let { userBio, userLocation, userId } = req.body
    let { profilePic, coverPhoto } = req.files
    if (profilePic && coverPhoto && userBio && userLocation) {
      const profileImage = profilePic[0].filename;
      const coverImage = coverPhoto[0].filename;
      if (!userId) {
        return res.status(400).json({ message: "Invalid user" });
      }
      const user = await User.findOne({ _id: userId })
      const updateProfileUpdate = await User.findOneAndUpdate({ _id: userId },
        { $set: { profilePic: profileImage, coverPhoto: coverImage, userBio, userLocation, isActive: true } }, { new: true })
      if (!updateProfileUpdate) {
        return res.status(400).json({ message: "User not found !!" });
      }
      //Access Token
      const accessToken = jwt.sign(
        {
          "UserInfo": {
            "userId": user._id,
            "roles": user.role
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2s' }
      )
      //Refresh Token
      const refreshToken = jwt.sign(
        { "userId": user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      )
      // Create secure cookie with refresh token 
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // Send accessToken containing username and roles 
      return res.status(200).json({ message: "User profile updated successfully !!", accessToken, user: updateProfileUpdate });
    } else {
      return res.status(400).json({ message: "All fields are required !!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//Refresh Token
const refresh = (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.refreshToken);
  if (!cookies?.refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.refreshToken;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    const foundUser = await User.findOne({ _id: decoded.userId }).exec();

    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id,
          roles: foundUser.role
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // Set the refresh token as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  });
};

//Login
const login = async (req, res) => {
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
};

const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}
// const getData = async (req, res) => {
//   try {
//     return res.status(200).json(req.user);
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  register,
  profileComplete,
  refresh,
  login,
  logout
};
