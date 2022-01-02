const passwordValidator = require("password-validator");

const schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .symbols(1)
  .has()
  .not()
  .spaces();

const validPassword = (password) => {
  return schema.validate(password);
};
module.exports = validPassword;
