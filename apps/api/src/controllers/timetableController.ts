import { Request, Response } from 'express';
import Timetable from '../models/Timetable';

export const getTimetable = async (req: Request, res: Response) => {
  const { classId, dayOfWeek } = req.query;
  const schoolId = req.user.schoolId;
  const where: any = { schoolId };
  if (classId) where.classId = classId;
  if (dayOfWeek) where.dayOfWeek = dayOfWeek;
  const records = await Timetable.findAll({ where, order: [['period', 'ASC']] });
  res.json(records);
};

export const getTimetableByClass = async (req: Request, res: Response) => {
  const classId = req.params.classId;
  const records = await Timetable.findAll({
    where: { classId, schoolId: req.user.schoolId },
    order: [['dayOfWeek', 'ASC'], ['period', 'ASC']]
  });
  res.json(records);
};

export const getTeacherTimetable = async (req: Request, res: Response) => {
  const teacherId = req.params.teacherId;
  const records = await Timetable.findAll({
    where: { teacherId, schoolId: req.user.schoolId },
    order: [['dayOfWeek', 'ASC'], ['period', 'ASC']]
  });
  res.json(records);
};

export const createTimetableEntry = async (req: Request, res: Response) => {
  const data = { ...req.body, schoolId: req.user.schoolId };
  // Check for conflicts (same class, day, period)
  const conflict = await Timetable.findOne({
    where: {
      classId: data.classId,
      dayOfWeek: data.dayOfWeek,
      period: data.period,
      schoolId: req.user.schoolId
    }
  });
  if (conflict) {
    return res.status(409).json({ error: 'Timeslot already occupied for this class' });
  }
  const entry = await Timetable.create(data);
  res.status(201).json(entry);
};

export const updateTimetableEntry = async (req: Request, res: Response) => {
  const entry = await Timetable.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  await entry.update(req.body);
  res.json(entry);
};

export const deleteTimetableEntry = async (req: Request, res: Response) => {
  const entry = await Timetable.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  await entry.destroy();
  res.status(204).send();
};