module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    errors: [
      {
        message: 'Access denied.'
      }
    ],
    type: 'error',
    statusCode: 401
  });
};
