const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

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
const publicRoutes = require('./routes/publicRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');

// Middleware files
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL,
  process.env.PROD_FRONTEND_URL,
  'https://your-frontend.vercel.app', // Replace with your actual Vercel domain
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

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
app.use('/api/upload', uploadRoutes);
app.use('/api', publicRoutes);

// Custom error handler
app.use(errorHandler);

module.exports = app;
