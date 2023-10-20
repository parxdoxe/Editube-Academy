const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

const passwordValidator = (value) => {
  return PASSWORD_REGEX.test(value);
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not correct`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [
      passwordValidator,
      "Password should have at least 8 characters, include an uppercase and lowercase letter, a number, and a special character",
    ],
  },
});

module.exports = model("User", userSchema);
