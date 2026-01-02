import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import handleResponse from '../Utils/responseHandler.js';
import * as userModel from '../models/userModel.js';

const cookieOptions = {
    httpOnly: true, // cookie not accessible via client json
    secure: process.env.NODE_ENV === 'production', // send cookie over HTTPS only in production
    sameSite: 'Strict', // prevent CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days expiry
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

// Register new user
export const registerUser = async (req, res, next) => {
    try {
        const { username, password, firstName, lastName, email, roleId } = req.body;

        if (!username || !password || !firstName) {
            return handleResponse(res, 400, 'Username, password, and first name are required');
        }

        if (await userModel.getUserByEmail(email) || await userModel.getUserByUsername(username)) {
            return handleResponse(res, 409, 'User with this email or username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.createUser(username, hashedPassword, firstName, lastName, email);
        await userModel.addRoleToUser(newUser.user_id, roleId || 2); // Default to 'user' role if not specified

        const token = generateToken(newUser.user_id);
        res.cookie('token', token, cookieOptions); // Set cookie containing JWT in user's browser so they can stay logged in

        return handleResponse(res, 201, `User registered with ${username} successfully`, { newUser });
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
};