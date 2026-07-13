import { Router } from 'express';
import { predictPerformance, generateHomework, chatbot } from '../controllers/aiController';
const router = Router();
router.post('/predict-performance', predictPerformance);
router.post('/generate-homework', generateHomework);
router.post('/chatbot', chatbot);
export default router;// Placeholder: ai.ts
