const formidable = require('formidable');

const multiData = () => (req, res, next) => {
  const form = formidable({ muliples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    req.body = fields;
    req.files = files;
    next();
  });
};

module.exports = multiData;
