const userRepository = require("../repository/user.repository");

const { user } = require("../models/index.js");
const db = require("../models");
var bcrypt = require("bcrypt");
const User = db.users;

// const { verifySignUp } = require('../middleware/verifySignUp');


exports.signup = async (payload) => {
  try {
    
    const user = {
      role_name: payload.fields.role_name,
      email: payload.fields.email,
      password: bcrypt.hashSync(payload.fields.password, 8),
    };
    // if (condition) {
      
    // }
    return await userRepository.save(user);
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (payload) => {
  return await User.findOne({
    where: {
      email: payload.fields.email,
    },
  }).then((user) => {
    res.status(200).send({
      user: user,
    });
  });

};
