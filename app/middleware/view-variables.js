module.exports = function (req, res, next) {
  res.locals.url = req.url;
  next();
}