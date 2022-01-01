const express = require("express");

const router = express.Router();

const valid = require("../Utils/valid");

router.post("/signup", (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!valid.validPhoneNumber(phoneNumber)) {
    return res.status(400).send("Invalid phone number. ");
  }
  if (!valid.validPassword(password)) {
    return res
      .status(400)
      .send(
        "Invalid password. The password should be between 8 and 11 characters, have at least 1 digit, at least 1 symbol, and no spaces. "
      );
  }
});
