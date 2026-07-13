import { Request, Response } from 'express';
import Student from '../models/Student';
import { Op } from 'sequelize';

export const getStudents = async (req: Request, res: Response) => {
  const user = req.user as any;
  const { classId, status } = req.query;
  const schoolId = user.schoolId;
  const where: any = { schoolId };
  if (classId) where.classId = classId;
  if (status) where.status = status;
  const students = await Student.findAll({ where, order: [['firstName', 'ASC']] });
  res.json(students);
};

export const getStudent = async (req: Request, res: Response) => {
  const user = req.user as any;
  const student = await Student.findOne({
    where: { id: req.params.id, schoolId: user.schoolId },
  });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
};

export const createStudent = async (req: Request, res: Response) => {
  const user = req.user as any;
  const data = { ...req.body, schoolId: user.schoolId };
  const student = await Student.create(data);
  res.status(201).json(student);
};

export const updateStudent = async (req: Request, res: Response) => {
  const user = req.user as any;
  const student = await Student.findOne({
    where: { id: req.params.id, schoolId: user.schoolId },
  });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  await student.update(req.body);
  res.json(student);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const user = req.user as any;
  const student = await Student.findOne({
    where: { id: req.params.id, schoolId: user.schoolId },
  });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  await student.destroy();
  res.status(204).send();
};
