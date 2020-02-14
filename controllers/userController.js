const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const User = require("../models/User");

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    //Ensure user doesn't already exist
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        status: "fail",
        message: "User already exists"
      });
    }

    //instantiate User model
    user = new User({
      firstName: first_name,
      lastName: last_name,
      email,
      password,
      role: "admin"
    });

    //create salt for user password hash
    const salt = await bcrypt.genSalt(10);

    //hash password and replace user password with the hashed password
    user.password = await bcrypt.hash(password, salt);

    // save user to db
    await user.save();

    // create token payload
    const payload = {
      user: {
        id: user._id,
        first_name: user.firstName,
        last_name: user.lastName,
        role: user.role
      }
    };

    //create token
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).send({
          status: "success",
          data: user,
          token: token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "fail",
      message: err.message
    });
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  //log user
  console.log(req.user);

  //check if user id matches request id
  if (req.user.id !== id && req.user.role !== "admin") {
    return res.status(403).send({
      status: "fail",
      message: "Unauthorized request"
    });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).send({
      status: "success",
      data: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: "fail",
      message: err.message
    });
  }
};

const getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({
      status: 'fail',
      message: 'Unauthorized request'                                 
    });
  }

  try {
    const users = await User.find({}).select('-password');
    res.status(200).send({
      status: 'success',
      data: users
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      status: 'fail',
      message:err.message
    })
  }
}

module.exports = {
  createUser,
  getOneUser,
  getAllUsers
};
