import jwt from 'jsonwebtoken';
import db from '../db.js';
import handleResponse from '../Utils/responseHandler.js';

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return handleResponse(res, 401, 'Not authorized, token missing');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.query('SELECT user_id, username, first_name, last_name, email FROM users WHERE user_id = $1', [decoded.id]);

        if (user.rows.length === 0) {
            return handleResponse(res, 401, 'Not authorized, user not found');
        }

        req.user = user.rows[0];
        next();

    } catch (err) {
        handleResponse(res, 401, 'Not authorized, token missing');
        next(err);
    }
};

export default protect;