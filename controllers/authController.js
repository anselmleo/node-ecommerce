const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid Credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid Credentials'
      });
    
    const payload = {
      user: {
        id: user._id,
        first_name: user.firstName,
        last_name: user.lastName,
        role: user.role
      }
    };

    jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.send({
        status: 'success',
        data: user,
        token: token
      });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: 'fail',
      message: err.message
    });
  }
}

module.exports = {
  loginUser
}

