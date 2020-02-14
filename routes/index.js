var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", checkName, function(req, res, next) {
  res.status(200).send({ title: "Express" });
});

function checkName(req, res, next) {
  data = req.params.name;
  if (data == "tolu") {
    return res.status(400).send({
      error: "name not correct"
    });
  }

  next();
}

module.exports = router;
