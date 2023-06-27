const jwt = require("jsonwebtoken");
const User = require("../models/usersMdl");
const { TRAINER_ROLE } = require("../constants/roles")

const checkIsUserAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403).json({ message: 'You are not authenticated' })
                req.user = decoded.UserInfo.userId
                req.roles = decoded.UserInfo.roles
                const userInfo = User.findById(req.user)
                if (!userInfo && req.roles != 'TRAINER_ROLE')
                    return res.status(401).json({ message: 'Invalid User' })
                next()
            }
        )
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = checkIsUserAuthenticated
