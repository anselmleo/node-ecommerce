var express = require("express");
var router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

/* GET users listing. */
router.get("/user", function(req, res, next) {
  res.send("respond with a resource");
});

/* POST new user */
router.post('', userController.createUser);
router.get('/:id', auth, userController.getOneUser);
router.get('', auth, userController.getAllUsers);

module.exports = router;
