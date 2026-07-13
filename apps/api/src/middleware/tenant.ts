import { Request, Response, NextFunction } from 'express';
import { School } from '../models';

export const setTenant = async (req: Request, res: Response, next: NextFunction) => {
  // For subdomain-based multi-tenancy
  const host = req.get('host');
  const subdomain = host?.split('.')[0];
  if (subdomain) {
    const school = await School.findOne({ where: { subdomain } });
    if (!school) return res.status(404).json({ error: 'School not found' });
    req.school = school;
  }
  next();
};// Placeholder: tenant.ts
