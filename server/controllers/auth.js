
/**
 * Creates a new user in the database
 */

const bcrypt = require('bcrypt')
const User = require("../models/users");

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
}

module.exports = { register };