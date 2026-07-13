import { Request, Response } from 'express';
import { Attendance } from '../models';
import { Op } from 'sequelize';

export const markAttendance = async (req: Request, res: Response) => {
  const user = req.user as any;
  const { studentId, date, status, classId, teacherId, remarks } = req.body;
  const schoolId = user.schoolId;
  const [record, created] = await Attendance.upsert({
    studentId,
    date,
    status,
    classId,
    teacherId,
    remarks,
    schoolId,
  });
  res.status(created ? 201 : 200).json(record);
};

export const getAttendance = async (req: Request, res: Response) => {
  const user = req.user as any;
  const { date, classId, studentId } = req.query;
  const schoolId = user.schoolId;
  const where: any = { schoolId };
  if (date) where.date = date;
  if (classId) where.classId = classId;
  if (studentId) where.studentId = studentId;
  const records = await Attendance.findAll({ where });
  res.json(records);
};

export const getAttendanceReport = async (req: Request, res: Response) => {
  res.json({ message: 'Report endpoint' });
};
