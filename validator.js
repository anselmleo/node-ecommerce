const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body('firstname').isString().isLength({min: 2}),
    body('lastname').isString().isLength({min: 2}),
    body('email').isEmail(),
    body('password').isLength({ min: 4 })
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next()
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
}

module.exports = {
  validate,
  userValidationRules
}