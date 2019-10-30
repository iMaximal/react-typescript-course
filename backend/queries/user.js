const User = require('../models/User').getModel();

exports.getUserById = userId =>
  User.findOne({
    attributes: { exclude: ['password'] },
    where: { userId },
  });

exports.getUserByEmail = email =>
  User.findOne({
    where: { email },
  });

exports.getUserByUsername = username =>
  User.findOne({
    where: { username, status: 1 },
  });

exports.getUsers = (options) =>
  User.findAll({
    attributes: { exclude: ['password', 'colors'] },
    ...(options ? { ...options } : {})
  });
