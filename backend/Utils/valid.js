const passwordValidator = require("password-validator");

const validPhoneNumber = (phoneNum) => {
  if (phoneNum.length == 10 && Number(phoneNum)) return true;
  return false;
};

const schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(11)
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
export { validPhoneNumber as validPhoneNumber, validPassword as validPassword };
