module.exports =
  (bodyKeysList = []) =>
  (req, res, next) => {
    if (bodyKeysList.some((key) => !req.body[key])) {
      return res.status(400).json({
        message:
          'Request body keys: ' + bodyKeysList.join(', ') + ' are required.',
      });
    }
    next();
  };
