const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

addUser = async (req, res) => {
    let newUser = {
        user_name: req.body.user_name,
        password: await bcrypt.hash(req.body.password, 10)
    };
    let sql = 'INSERT INTO users SET ?';

    db.query(sql, newUser, (err, result) => {
        if (err) {
            return res.status(500).send({
                status: 'error',
                message: err?.sqlMessage
            });
        }
        res.send({
            status: 'success',
            data: result
        });
    });
};

loginUser = (req, res) => {
    const { user_name, password } = req.body;

    let sql = 'SELECT * FROM users WHERE user_name = ?';
    db.query(sql, [user_name], async (err, results) => {
        if (err) {
            return res.status(500).send({
                status: 'error',
                message: err?.sqlMessage
            });
        }
        if (results.length === 0) {
            return res.status(400).send({
                status: 'error',
                message: 'Invalid username or password'
            });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                status: 'error',
                message: 'Invalid username or password'
            });
        }

        const token = jwt.sign({ id: user.id, user_name: user.user_name }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.send(
            {
                data: user,
                token,
                status: 'success',
            }
        );
    });
};

module.exports = { addUser, loginUser }