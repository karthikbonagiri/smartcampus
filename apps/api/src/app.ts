// ============= CORE IMPORTS =============
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { sequelize } from './config/database';

// ============= ROUTES IMPORTS =============
import authRoutes from './routes/auth';
import schoolRoutes from './routes/schools';
import studentRoutes from './routes/students';
import attendanceRoutes from './routes/attendance';
import feeRoutes from './routes/fees';
import paymentRoutes from './routes/payments';
import aiRoutes from './routes/ai';
import reportRoutes from './routes/reports';
import libraryRoutes from './routes/library';
import examRoutes from './routes/exam';
import timetableRoutes from './routes/timetable';

// ============= MIDDLEWARE IMPORTS =============
import { errorHandler } from './middleware/error';
import { authenticate } from './middleware/auth';

// ============= INIT APP =============
const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true
  }
});

// ============= GLOBAL MIDDLEWARE =============
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(morgan('combined'));

// Rate limiting (100 requests per 15 minutes)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
}));

// ============= HEALTH CHECK =============
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ============= PUBLIC ROUTES =============
app.use('/api/v1/auth', authRoutes);

// ============= PROTECTED ROUTES (All require authentication) =============
app.use('/api/v1/schools', authenticate, schoolRoutes);
app.use('/api/v1/students', authenticate, studentRoutes);
app.use('/api/v1/attendance', authenticate, attendanceRoutes);
app.use('/api/v1/fees', authenticate, feeRoutes);
app.use('/api/v1/payments', authenticate, paymentRoutes);
app.use('/api/v1/ai', authenticate, aiRoutes);
app.use('/api/v1/reports', authenticate, reportRoutes);

// ============= NEW MODULES (Added per request) =============
app.use('/api/v1/library', authenticate, libraryRoutes);
app.use('/api/v1/exams', authenticate, examRoutes);
app.use('/api/v1/timetable', authenticate, timetableRoutes);

// ============= WEBSOCKET EVENTS =============
io.on('connection', (socket) => {
  console.log(`🟢 New client connected: ${socket.id}`);

  // Join a school room for real-time updates (bus tracking, notifications)
  socket.on('join-school', (schoolId) => {
    socket.join(`school_${schoolId}`);
    console.log(`Socket ${socket.id} joined school ${schoolId}`);
  });

  // Bus tracking event
  socket.on('track-bus', (data) => {
    // data: { schoolId, busId, latitude, longitude }
    io.to(`school_${data.schoolId}`).emit('bus-location', data);
  });

  // Notification event
  socket.on('send-notification', (data) => {
    io.to(`school_${data.schoolId}`).emit('new-notification', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Client disconnected: ${socket.id}`);
  });
});

// ============= ERROR HANDLING =============
app.use(errorHandler);

// ============= START SERVER =============
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');
    console.log(`🚀 SmartCampus API running on port ${PORT}`);
    console.log(`📡 WebSocket server is ready for real-time events.`);
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  }
});

// ============= EXPORT IO FOR EXTERNAL USE =============
export { io };
export default app;// Placeholder: app.ts
