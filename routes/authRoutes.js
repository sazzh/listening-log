import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { loginUser, registerUser, getCurrentUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', getCurrentUser);
router.get('/logout', logoutUser)

export default router;