import { Router } from 'express';
import { registerSchool, login, verifyOTP, refreshToken, logout } from '../controllers/authController';
const router = Router();
router.post('/register', registerSchool);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
export default router;// Placeholder: auth.ts
