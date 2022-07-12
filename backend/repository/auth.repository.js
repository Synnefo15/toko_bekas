const db = require("../models/index.js");
const User = db.users;

exports.save = async (user) => {
  return await User.create(user);
};
