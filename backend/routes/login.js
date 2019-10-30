const Bluebird = require('bluebird');
const passport = require('passport');

/**
 * Authenticate with passport.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const authenticate = (req, res, next) =>
  new Bluebird((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return reject(err);
      }

      return resolve(user);
    })(req, res, next);
  });

/**
 * Login
 * @param {Object} req
 * @param {Object} user
 */
const login = (req, user) =>
  new Bluebird((resolve, reject) => {
    req.login(user, err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

/**
 * Regenerate user session.
 * @param {Object} req
 */
const regenerateSession = req =>
  new Bluebird((resolve, reject) => {
    req.session.regenerate(err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

/**
 * Save user session.
 * @param {Object} req
 */
const saveSession = req =>
  new Bluebird((resolve, reject) => {
    req.session.save(err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

/**
 * HTTP handler for sign in.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = (req, res, next) =>
  Bluebird.resolve()
    .then(async () => {
      const user = await authenticate(req, res, next);

      if (!user) {
        return res.status(401).json({
          errors: [
            {
              _error: 'Incorrect username or password',
            },
          ],
          type: 'error',
          statusCode: 401,
        });
      }

      await login(req, user);
      const temp = req.session.passport;

      await regenerateSession(req);
      req.session.passport = temp;

      await saveSession(req);

      return res.status(200).send(req.user);
    })
    .catch(next);
