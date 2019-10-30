require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passportConfig = require('./config/passport');
const sequelize = require('./utils/sequelize-singleton');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const compression = require('compression');
const auth = require('./middlewares/auth');

require('./models/User');
require('./models/Session');

const app = express();
// security filter
app.use(helmet());

// Compress all routes
app.use(compression());
app.use(logger('dev'));

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});
//  apply to all requests
app.use(limiter);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

const origin = process.env.FRONTEND_URL;
app.use(cors({ origin, credentials: true }));

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    secure: process.env.NODE_ENV === 'production',
  },
  store: new SequelizeStore({
    db: sequelize,
    table: 'Session',
  }),
});

passportConfig(passport);
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.post('/user/login', require('./routes/login'));
app.post('/user/register', require('./routes/sign-up'));
app.get('/user/authenticated', require('./routes/authenticated'));
app.get('/user/logout', require('./routes/logout'));
app.get('/user/all/:username?', auth, require('./routes/users'));
app.get('/user/:userId', auth, require('./routes/userById'));
app.put('/user/:userId', auth, require('./routes/userEdit'));

app.use((err, req, res) => {
  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).json({
    errors: [{
      message: err.message,
    }],
    type: 'error',
    statusCode: err.statusCode,
  });
});

module.exports = {
  app,
  sessionMiddleware,
};
