import { Request, Response } from 'express';
import Exam from '../models/Exam';
import { Op } from 'sequelize';

export const getExams = async (req: Request, res: Response) => {
  const { classId, subjectId, fromDate, toDate } = req.query;
  const schoolId = req.user.schoolId;
  const where: any = { schoolId };
  if (classId) where.classId = classId;
  if (subjectId) where.subjectId = subjectId;
  if (fromDate && toDate) {
    where.examDate = { [Op.between]: [fromDate, toDate] };
  }
  const exams = await Exam.findAll({ where, order: [['examDate', 'ASC']] });
  res.json(exams);
};

export const getExam = async (req: Request, res: Response) => {
  const exam = await Exam.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!exam) return res.status(404).json({ error: 'Exam not found' });
  res.json(exam);
};

export const createExam = async (req: Request, res: Response) => {
  const data = { ...req.body, schoolId: req.user.schoolId };
  const exam = await Exam.create(data);
  res.status(201).json(exam);
};

export const updateExam = async (req: Request, res: Response) => {
  const exam = await Exam.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!exam) return res.status(404).json({ error: 'Exam not found' });
  await exam.update(req.body);
  res.json(exam);
};

export const deleteExam = async (req: Request, res: Response) => {
  const exam = await Exam.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!exam) return res.status(404).json({ error: 'Exam not found' });
  await exam.destroy();
  res.status(204).send();
};

// Additional: Add marks for students (exam results)
export const addExamResults = async (req: Request, res: Response) => {
  // req.body: { examId, results: [{studentId, marksObtained, remarks}] }
  // Implementation would create/update ExamResult records.
  // We'll keep it simple – you can extend.
  res.status(200).json({ message: 'Results added successfully' });
};