const authService = require("../service/authService");

exports.signup = async (req, res) => {
  try {
    const user = await authService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
