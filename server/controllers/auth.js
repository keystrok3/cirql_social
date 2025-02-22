

const bcrypt = require('bcrypt')
const User = require("../models/users");
const { Op } = require('sequelize');
const { generate_token } = require('../utils/generate_token');

/**
 * Creates a new user in the database
 */
const register = async (req, res) => {
    const { 
        username, 
        firstName, 
        lastName,
        email,
        password
    } = req.body;

    
    try {
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        // create user 
        await User.create({ 
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashed_password
        });

        res.status(201).json({ success: true, msg: 'Registration Successful' });
    } catch (error) {
        console.error(`\n\nServer Error: ${error}\n\n`);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
};


/**
 * Log In user
 * */ 
const login = async (req, res) => {
    const { username_or_email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: username_or_email },
                    { username: username_or_email }
                ]
            }
        });

        if(user === null) {
            return res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if(isPassword === false) {
            return res.status(401).json({ success: false, msg: "Invalid credentials"});
        }

        // generate token
        const token = generate_token(user.username, '12h');

        // store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 12*60*60*1000
        });

        res.status(201).json({ 
            success: true, 
            user: { 
                username: user.username, 
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
}

module.exports = { register, login };