
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

/**
 * Generates jwt token
*/
const generate_token = (username, expiresIn) => {
    const token = jwt.sign({ username: username }, secret, { expiresIn: expiresIn });
    return token;
};

module.exports = { generate_token };


