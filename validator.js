const { validationResult } = require("express-validator");

// const userValidationRules = (req, res, next) => {
//   console.log("got here");
//   return [
//     body("firstname")
//       .isString()
//       .isLength({ min: 2 }),
//     body("lastname")
//       .isString()
//       .isLength({ min: 2 }),
//     body("email").isEmail(),
//     body("password").isLength({ min: 4 })
//   ];
// };

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      status: "fail",
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  validate
};
