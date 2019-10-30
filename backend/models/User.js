const _ = require('lodash');
const bcrypt = require('bcrypt');
const Bluebird = require('bluebird');
const Sequelize = require('sequelize');

const sequelize = require('../utils/sequelize-singleton');

const mappings = {
  userId: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  role: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'admin', // todo
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  colors: {
    type: Sequelize.JSONB,
    allowNull: true,
  },
};

const User = sequelize.define('User', mappings, {
  indexes: [
    {
      name: 'user_userId_index',
      method: 'BTREE',
      fields: ['userId'],
    },
    {
      name: 'user_username_index',
      method: 'BTREE',
      fields: ['username'],
    },
    {
      name: 'user_email_index',
      method: 'BTREE',
      fields: ['email'],
    },
    {
      name: 'user_role_index',
      method: 'BTREE',
      fields: ['role'],
    },
    {
      name: 'user_status_index',
      method: 'BTREE',
      fields: ['status'],
    },
  ],
});

User.prototype.comparePassword = function (password) {
  return Bluebird.resolve()
    .then(() => bcrypt.compareSync(password, this.password))
    .catch(err => {
      console.log(err);

      return false;
    });
};

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

User.beforeSave(user => {
  user.username = _.trim(user.username);
  user.password = _.trim(user.password);
  user.email = _.trim(user.email);

  if (user.previous('password') !== user.password && !_.isEmpty(user.password)) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }

  return user;
});

if (process.env.FIRST_START === 'yes') {
  User.sync({ force: true });
}

exports.getMapping = () => mappings;

exports.getModel = () => User;
