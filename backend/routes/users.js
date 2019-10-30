const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const userQueries = require('../queries/user');

module.exports = (req, res) => {
  if (
    req.user.role === 'admin'
    || req.user.role === 'moderator'
  ) {
    let queryParams;
    if (req.params.username) {
      queryParams = {
        where: {
          username: {
            [Op.iLike]: req.params.username + '%'
          },
        },
      };
    }
    userQueries
      .getUsers(queryParams)
      .then(users => {
        res.json(users);
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
