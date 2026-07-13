import { Request, Response } from 'express';
import { Fee } from '../models';

export const getFees = async (req: Request, res: Response) => {
  const fees = await Fee.findAll({ where: { schoolId: req.user.schoolId } });
  res.json(fees);
};
export const getStudentFees = async (req: Request, res: Response) => {
  const fees = await Fee.findAll({ where: { studentId: req.params.studentId, schoolId: req.user.schoolId } });
  res.json(fees);
};
export const createFee = async (req: Request, res: Response) => {
  const data = { ...req.body, schoolId: req.user.schoolId };
  const fee = await Fee.create(data);
  res.status(201).json(fee);
};
export const updateFee = async (req: Request, res: Response) => {
  const fee = await Fee.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!fee) return res.status(404).json({ error: 'Fee not found' });
  await fee.update(req.body);
  res.json(fee);
};
export const deleteFee = async (req: Request, res: Response) => {
  const fee = await Fee.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!fee) return res.status(404).json({ error: 'Fee not found' });
  await fee.destroy();
  res.status(204).send();
};// Placeholder: feeController.ts
