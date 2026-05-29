const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Route files
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const doubtRoutes = require('./routes/doubtRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const publicRoutes = require('./routes/publicRoutes');
const healthRoutes = require('./routes/healthRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const batchRoutes = require('./routes/batchRoutes');
const liveClassRoutes = require('./routes/liveClassRoutes');
const path = require('path');

// Middleware files
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

const normalizeOrigin = (value) => (value ? value.trim().replace(/\/+$/, '') : value);

// Health check route — must be registered BEFORE CORS/auth middleware
// so it is reachable by external uptime monitors without credentials
app.use('/health', healthRoutes);

// Logging middleware for debugging requests
app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url} - Origin: ${req.headers.origin || 'N/A'}`);
  next();
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true if https
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Enable CORS
const allowedOrigins = [
  'https://www.codecuredev.com',
  'https://codecuredev.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:8081',
  'http://localhost:8082',
];

// Add FRONTEND_URL if set in environment
if (process.env.FRONTEND_URL) {
  const normalized = normalizeOrigin(process.env.FRONTEND_URL);
  if (normalized && !allowedOrigins.includes(normalized)) {
    allowedOrigins.push(normalized);
  }
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = normalizeOrigin(origin);
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      const normalizedAllowed = normalizeOrigin(allowed);
      return normalizedOrigin === normalizedAllowed;
    });
    
    // Allow local development and mobile app requests
    const isLocal =
      normalizedOrigin.startsWith('http://localhost') ||
      normalizedOrigin.startsWith('capacitor://') ||
      normalizedOrigin.startsWith('app://');

    if (isAllowed || isLocal) {
      return callback(null, true);
    }

    console.warn(`[CORS] Blocked Origin: ${origin}`);
    return callback(new Error(`CORS Policy: Origin ${origin} not allowed.`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware (automatically handles OPTIONS preflight requests)
app.use(cors(corsOptions));

// Static folder for file uploads mapping to \public\uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Health check
app.get('/api', (req, res) => {
  res.status(200).json({ success: true, message: 'CodeCure Academy API is running' });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/doubts', doubtRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/live-classes', liveClassRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', publicRoutes);

// Custom error handler
app.use(errorHandler);

module.exports = app;
