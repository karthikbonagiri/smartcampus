import { Request, Response } from 'express';
import { Student, Attendance, Fee } from '../models';

export const generateStudentReport = async (req: Request, res: Response) => {
  const studentId = req.params.studentId;
  // aggregate data and return JSON
  res.json({ studentId, report: 'PDF generation logic here' });
};

export const generateFeeReport = async (req: Request, res: Response) => {
  // similar
};