const userQueries = require('../queries/user');

module.exports = (req, res) => {
  if (
    req.user.role === 'admin'
    || req.user.role === 'moderator'
  ) {
    if (!req.params.userId) {
      res.status(404).json({
        errors: [{
          message: 'Invalid user ID',
        }],
        type: 'error',
        statusCode: 404,
      });
    }

    userQueries
      .getUserById(req.params.userId)
      .then(user => {
        res.json(user);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    res.status(403).json({
      errors: [
        {
          message: 'Not enough rights.',
        },
      ],
      type: 'error',
      statusCode: 403,
    });
  }
};
