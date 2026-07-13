import { User } from '../../models'; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: User & { schoolId?: number };
      school?: any; // for tenant middleware
    }
  }
}
