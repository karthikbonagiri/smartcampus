import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, School, Subscription } from '../models';
import { sendOTP } from '../services/emailService';

export const registerSchool = async (req: Request, res: Response) => {
  const { schoolName, subdomain, adminEmail, adminPassword } = req.body;
  // Check subdomain uniqueness
  const existing = await School.findOne({ where: { subdomain } });
  if (existing) return res.status(400).json({ error: 'Subdomain already taken' });

  // Create school
  const school = await School.create({ name: schoolName, subdomain, status: 'pending' });
  // Create admin user
  const hashed = await bcrypt.hash(adminPassword, 10);
  const user = await User.create({
    email: adminEmail,
    password: hashed,
    role: 'school_admin',
    schoolId: school.id
  });
  // Create trial subscription
  await Subscription.create({
    schoolId: school.id,
    plan: 'trial',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
    paymentGateway: 'razorpay',
  });
  // Send OTP for verification
  await sendOTP(adminEmail);
  res.status(201).json({ message: 'School registered. Please verify OTP sent to email.' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
};

export const verifyOTP = async (req: Request, res: Response) => { /* ... */ };
export const refreshToken = async (req: Request, res: Response) => { /* ... */ };
export const logout = async (req: Request, res: Response) => { /* ... */ };// Placeholder: authController.ts
