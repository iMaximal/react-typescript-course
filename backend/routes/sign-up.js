const User = require('../models/User').getModel();
const uuidv4 = require('uuid/v4');

/**
 * HTTP handler for sign out.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(409).json({
      errors: [{
        _error: 'Please, provide data',
      }],
      type: 'error',
      statusCode: 409,
    });
  } else {
    User.create({
      userId: uuidv4(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(async (user) => {
        req.login(user, function (err) {
          if (err) { return next(err); }
          res.status(201).send(user);
        });
      })
      .catch(error => {
        res.status(400).send(error);
      });
  }
};
