
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const secret = process.env.JWT_SECRET;

/**
 * Check if user is logged in by checking validity of token
 * from client
*/
const check_auth = async (req, res, next) => {
    try {
        const token = res.cookies.token;

        if(!token) {
            return res.status(401).json({ success: false, msg: "Unauthorised" });
        }

        const decoded = jwt.decode(token, secret);

        const user = await User.findOne({ where: { username: decoded.username }});

        if(!user) {
            return res.status(401).json({ success: false, msg: "Unauthorised" });
        }

        req.username = user.username;

        next();

    } catch (error) {
        console.error(`\n\nAuthorization error: ${error}\n\n`);

        if(error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorised"
            })
        }
        if(error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorised"
            })
        }
    }
};


module.exports = { check_auth };