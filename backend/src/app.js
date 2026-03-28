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

// Middleware files
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

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
app.use('/api', publicRoutes);

// Custom error handler
app.use(errorHandler);

module.exports = app;
