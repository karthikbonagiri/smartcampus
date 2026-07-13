import { Request, Response } from 'express';
import { School } from '../models';

export const getSchools = async (req: Request, res: Response) => {
  const schools = await School.findAll();
  res.json(schools);
};
export const getSchool = async (req: Request, res: Response) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return res.status(404).json({ error: 'School not found' });
  res.json(school);
};
export const updateSchool = async (req: Request, res: Response) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return res.status(404).json({ error: 'School not found' });
  await school.update(req.body);
  res.json(school);
};
export const deleteSchool = async (req: Request, res: Response) => {
  const school = await School.findByPk(req.params.id);
  if (!school) return res.status(404).json({ error: 'School not found' });
  await school.destroy();
  res.status(204).send();
};// Placeholder: schoolController.ts
