// @desc    Health check - verifies the server is alive
// @route   GET /health
// @access  Public
exports.getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
};
