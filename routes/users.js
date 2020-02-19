var express = require("express");
var router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { userValidationRules, validate } = require('../validator.js');


/* GET users listing. */
router.get("/user", function(req, res, next) {
  res.send("respond with a resource");
});

/* POST new user */
router.post('', userValidationRules(), validate, userController.createUser);
router.get('/:id', auth, userController.getOneUser);
router.get('', auth, userController.getAllUsers);

module.exports = router;


// app.post('/user', userValidationRules(), validate, (req, res) => {
//   User.create({
//     username: req.body.username,
//     password: req.body.password,
//   }).then(user => res.json(user))
// })