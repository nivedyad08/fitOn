const User = require("../models/usersMdl");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const moment = require("moment");
const nodemailer = require("nodemailer")

/****Registeration*****/
const register = async (req, res) => {
  let { firstName, lastName, email, password, role ,userLocation} = req.body;
  try {
    if (firstName && lastName && email && password && role && userLocation) {
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
          userLocation,
          isActive:true
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

/****Profile Complete*****/
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
      const { accessToken, refreshToken } = generateTokens(user);
      setRefreshTokenCookie(res, refreshToken);
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

/****Refresh Token*****/
const refresh = (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.refreshToken);
  if (!cookies?.refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.refreshToken;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    const foundUser = await User.findOne({ _id: decoded.userId }).exec();

    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

    const { accessToken } = generateTokens(foundUser);
    // Set the refresh token as an HTTP-only cookie
    setRefreshTokenCookie(res, refreshToken);
    res.json({ accessToken });
  });
};

/****Login*****/
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          //Gererate Token
          const { accessToken, refreshToken } = generateTokens(user);
          setRefreshTokenCookie(res, refreshToken);
          if (user.role === 'ADMIN') {
            return res
              .status(200)
              .json({ message: "Login Successfully", accessToken, user: user });
          } else {
            return res
              .status(200)
              .json({ message: "Login Successfully", accessToken, user: user });
          }
        } else {
          return res.status(400).json({ message: "Invalid Credentials" });
        }
      } else {
        return res.status(400).json({ message: "User not Registered" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required !!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Token generation
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "userId": user._id,
        "roles": user.role
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  )

  const refreshToken = jwt.sign(
    { "userId": user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  )
  return { accessToken, refreshToken }
}

/****forgotPassword*****/
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    if (email) {
      const user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({ message: "User not Found" });
      }
      sendEmailVerification(user.firstName, user.lastName, email)
      return res.status(200).json({ message: "Email sent successfully !!" });
      
    } else {
      return res.status(400).json({ message: "Email is required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

/****Send email verification*****/
const sendEmailVerification = async (firstname, lastname, email) => {
  return new Promise((resolve, reject) => {
    try {
      const emailTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: "neethus484@gmail.com",
          pass: "zydovfiqvduvldzq"
        }
      });

      const mailOptions = {
        from: 'neethus484@gmail.com',
        to: email,
        subject: 'Forgot Password',
        html: `<p>Hi ${ firstname } ${ lastname }, please click <a href=${ process.env.APP_URL }user/forgotPassword?email=${ email }>here</a> to create a new password.</p>`,
      };

      emailTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject("Failed to send email");
        } else {
          resolve("Email sent successfully");
        }
      });
    } catch (error) {
      console.error(error);
      reject("Failed to send email");
    }
  });
};


/****Update password*****/
const updatePassword = async (req, res) => {
  console.log(657890);
  try {
    const { newPassword, confirmPassword, email } = req.body
    if (!newPassword || !confirmPassword || !email)
      return res.status(400).json({ message: "All fields are required" });
    if (newPassword === confirmPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 10)
      const updatePassword = await User.updateOne({ email: email }, { $set: { newPassword: hashPassword } })
      res.status(200).json({ message: 'Password updated successfully !!!' })
    } else {
      res.status(400).json({ error: 'Password mismatch !!!' })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


/****Set refresh token as a cookie*****/

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

/****Logout*****/
const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}


module.exports = {
  register,
  profileComplete,
  refresh,
  login,
  forgotPassword,
  updatePassword,
  logout
};
