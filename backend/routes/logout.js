/**
 * HTTP handler for sign out.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports = (req, res) => {
  req.logout();
  res.send();
};
