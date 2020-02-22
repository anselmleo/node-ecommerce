var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const {check} = require('express-validator')
const { validate } = require("../validator.js");

/* GET users listing. */
router.get("/user", function(req, res, next) {
  res.send("respond with a resource");
});

/* POST new user */
router.post("/", [
  check('first_name', 'First name is required').notEmpty().isLength({min:2}),
  check('last_name', 'Last name is required').notEmpty().isLength({min:2}),
  check('email', 'Enter a valid email address').notEmpty().isLength({min:6}).isEmail(),
  check('password', 'Password should be minimum of 8 characters').notEmpty().isLength({min:8})
], validate, userController.createUser);
router.get("/:id", auth, userController.getOneUser);
router.get("/", auth, userController.getAllUsers);

module.exports = router;

// app.post('/user', userValidationRules(), validate, (req, res) => {
//   User.create({
//     username: req.body.username,
//     password: req.body.password,
//   }).then(user => res.json(user))
// })
