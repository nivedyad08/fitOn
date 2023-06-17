const jwt = require("jsonwebtoken");

const verifyJWt = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'You are not authenticated' })
            req.user = decoded.UserInfo.userId
            req.roles = decoded.UserInfo.roles
            console.log(req.roles);
            next()
        }
    )
}

module.exports = verifyJWt