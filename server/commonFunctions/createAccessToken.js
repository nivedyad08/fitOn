const jwt = require("jsonwebtoken");

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