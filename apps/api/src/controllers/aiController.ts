import { Request, Response } from 'express';
import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://ai:8000';

export const predictPerformance = async (req: Request, res: Response) => {
  const { studentId, features } = req.body;
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/predict/performance`, { features });
    res.json({ studentId, prediction: response.data.predicted_score });
  } catch (err) {
    res.status(500).json({ error: 'AI service unavailable' });
  }
};

export const generateHomework = async (req: Request, res: Response) => {
  // similar
};
export const chatbot = async (req: Request, res: Response) => {
  // call AI service chatbot endpoint
};