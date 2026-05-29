const app = require('./app');
const http = require('http');
const { startKeepAlive } = require('./utils/keepAlive');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  startKeepAlive();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('[Unhandled Rejection] at:', promise, 'reason:', err);
  if (err.stack) console.error(err.stack);
  // In production, we might want to exit, but let's just log for now to identify the crash
  // server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]:', err.message);
  if (err.stack) console.error(err.stack);
  // server.close(() => process.exit(1));
});
