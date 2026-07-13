import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Payment } from '../models';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export const initiatePayment = async (req: Request, res: Response) => {
  const { amount, currency = 'INR', studentId } = req.body;
  const options = { amount: amount * 100, currency, receipt: `student_${studentId}` };
  const order = await razorpay.orders.create(options);
  res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
};

export const verifyPayment = async (req: Request, res: Response) => {
  const user = req.user as any;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET!)
    .update(body.toString())
    .digest('hex');
  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }
  await Payment.create({
    studentId: req.body.studentId,
    amount: req.body.amount / 100,
    mode: 'upi',
    transactionId: razorpay_payment_id,
    paymentDate: new Date(),
    schoolId: user.schoolId,
  });
  res.json({ success: true });
};

export const getPayments = async (req: Request, res: Response) => {
  const user = req.user as any;
  const payments = await Payment.findAll({ where: { schoolId: user.schoolId } });
  res.json(payments);
};
