const User = require("../model/userModel");

exports.create = async (data) => {
  const user = new User(data);
  return await user.save();
};
