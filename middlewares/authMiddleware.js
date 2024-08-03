const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).send({
            status: 'error',
            message: 'Access denied. No token provided.'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({
            status: 'error',
            message: 'Access denied. Invalid token format.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({
            status: 'error',
            message: 'Invalid token'
        });
    }
};
