import express from 'express';
import { loginUser, registerUser, getCurrentUser, logoutUser } from '../controllers/authController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getCurrentUser); // protect middleware checks for valid JWT
router.get('/logout', logoutUser)

export default router;