const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require('../models/User').getModel();
const Session = require('../models/Session').getModel();

module.exports = (req, res, next) => {
  const isModerator = req.user.role === 'moderator' && req.params.userId === req.user.userId;
  if (
    req.user.role === 'admin'
    || isModerator
  ) {
    if (!req.params.userId) {
      res.status(404).json({
        errors: [{
          _error: 'Invalid user ID',
        }],
        type: 'error',
        statusCode: 404,
      });
    }

    User.update(
      {
        username: req.body.username,
        email: req.body.email,
        ...(isModerator ? {} : { role: req.body.role }),
        status: req.body.status,
        colors: req.body.colors,
      },
      {
        returning: true,
        where: { userId: req.params.userId }
      }
    )
    // eslint-disable-next-line
      .then(async ([rowsUpdate, [updatedUser]]) => {
        if (req.body.dropSession) {
          await Session.destroy({
            where: {
              data: {
                [Op.like]: '%' + req.body.userId + '%'
              }
            }
          });
        }
        res.json(updatedUser);
      })
      .catch(next);
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
