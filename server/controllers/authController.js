const User = require("../models/usersMdl");
const Level = require("../models/levelsMdl");
const Workout = require("../models/workoutMdl");
const Transaction = require("../models/transactionMdl");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const moment = require("moment");
const nodemailer = require("nodemailer")
const { TRAINER_ROLE } = require("../constants/roles")

/****Registeration*****/
const register = async (req, res) => {
  let { firstName, lastName, email, password, role, userLocation } = req.body;
  try {
    if (firstName && lastName && email && password && role && userLocation) {
      const isUser = await User.findOne({ email: email });
      if (isUser) {
        return res.status(400).json({ message: "User already exists !!" });
      } else {
        const otp = Math.floor(Math.random() * 9000 + 1000);
        const newUser = User({
          firstName,
          lastName,
          email,
          role,
          password: await bcrypt.hash(password, 10),
          userLocation,
          verificationCode: otp,
          isActive: false
        });
        const resUser = await newUser.save();
        if (resUser) {
          const message = `<p>Hey ${ resUser.firstName } ${ resUser.lastName },<br/> Please enter the following code on the page where you requested for an OTP.</p><br/><button type="button" class="mt-20 py-20 px-20 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-400 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">${ otp }</button>`;

          const subject = "Email Verification"

          sendEmailVerification(resUser.firstName, resUser.lastName, email, message)
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
    let { userBio, userId } = req.body
    let { profilePic, coverPhoto } = req.files
    if (profilePic && coverPhoto && userBio) {
      const profileImage = profilePic[0].filename;
      const coverImage = coverPhoto[0].filename;
      if (!userId) {
        return res.status(400).json({ message: "Invalid user" });
      }
      const user = await User.findOne({ _id: userId })
      const updateProfileUpdate = await User.findOneAndUpdate({ _id: userId },
        { $set: { profilePic: profileImage, coverPhoto: coverImage, userBio, isActive: true } }, { new: true })
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

const paymentUpdate = async (req, res) => {
  try {
    const { userId } = req.params;
    const { transactionId } = req.body;
    const user = await User.findById(userId)
    if (!userId)
      return res.status(400).json({ message: "User not found !!" });
    const userRoleUpdate = await User.findByIdAndUpdate(userId, {
      role: TRAINER_ROLE
    })
    const newTransaction = await Transaction({
      userId,
      role: TRAINER_ROLE,
      adminAmount: 1000.00,

    }).save()
    if (newTransaction) {
      return res
        .status(200)
        .json({ message: "Payment recieved", user: user });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

/****Refresh Token*****/
const refresh = (req, res) => {
  const cookies = req.cookies;
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
        if (!user.isActive)
          return res.status(400).json({ message: "Please contact administrator" });
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
      const message = `<p>Hi ${ user.firstName } ${ user.lastName }, please click <a href=${ process.env.APP_URL }user/forgotPassword?email=${ user.email }>here</a> to create a new password.</p>`
      const subject = "Forgot Password";
      sendEmailVerification(user.firstName, user.lastName, email, message, subject)
      return res.status(200).json({ message: "Email sent successfully !!" });

    } else {
      return res.status(400).json({ message: "Email is required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

/****Send email verification*****/
const sendEmailVerification = async (firstname, lastname, email, message, subject) => {
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
        subject: subject,
        html: message,
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

const validateOtp = async (req, res) => {
  try {
    const { otp } = req.body
    const { userId } = req.query
    const user = await User.findById(userId)
    if (!user)
      return res.status(400).json({ message: "Invalid user" });
    if (!user.verificationCode || user.verificationCode !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    await User.findByIdAndUpdate(userId, { verificationCode: null, isActive: true })
    return res.status(200).json({ message: 'Otp verified !!!' })
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

const popularWorkouts = async (req, res) => {
  try {
    const topWorkouts = await Workout.aggregate([
      {
        $unwind: "$userRatings" // Unwind the 'userRatings' array
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $lookup: {
          from: "levels",
          localField: "difficultyLevel",
          foreignField: "_id",
          as: "level"
        }
      },
      {
        $group: {
          _id: "$_id", // Group by workout ID
          totalRatingCount: { $sum: 1 }, // Count the number of ratings per workout
          workoutTitle: { $first: "$workoutTitle" },
          thumbnailImage: { $first: "$thumbnailImage" },
          favourites: { $first: "$favourites" },
          createdAt: { $first: "$createdAt" },
          category: { $first: "$category.name" },
          level: { $first: "$level.name" },
        }
      },
      {
        $sort: { totalRatingCount: -1 }
      },
      {
        $limit: 4
      }
    ]);

    return res.status(200).json({ topWorkouts: topWorkouts })
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const trainers = async (req, res) => {
  try {
    const level = await Level.findOne({ name: "Beginner" }, { _id: 1 })
    let trainersList = ""
    trainersList = await User.aggregate([
      { $match: { isActive: true, role: TRAINER_ROLE } },
      {
        $lookup: {
          from: "workouts",
          localField: "_id",
          foreignField: "trainerId",
          as: "workouts",
        }
      },
      { $limit: 10 },
      { $sort: { createdAt: -1 } }
    ])
    return res.status(200).json({ trainers: trainersList });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
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
  paymentUpdate,
  validateOtp,
  popularWorkouts,
  logout,
  trainers
};
