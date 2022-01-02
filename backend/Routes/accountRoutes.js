const express = require("express");
const bcrypt = require("bcrypt");
const supabase = require("../Bases/supabaseBase");

const router = express.Router();

const valid = require("../Utils/valid");

router.post("/signup", (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!parseInt(phoneNumber) || phoneNumber.length !== 10) {
    return res.status(400).send("Invalid phone number. ");
  }
  if (!valid(password)) {
    return res
      .status(400)
      .send(
        "Invalid password. The password should be between 8 and 20 characters, have at least 1 digit, at least 1 symbol, and no spaces. "
      );
  }
  bcrypt.hash(password, parseInt(process.env.saltRounds), async (err, hash) => {
    if (err) return res.status(500).send("Internal server error. ");
    const { data, error } = await supabase.from("users").insert([
      {
        phoneNumber,
        password: hash,
      },
    ]);
    if (error)
      return error.message ==
        'duplicate key value violates unique constraint "users_phoneNumber_key"'
        ? res.status(400).send("Phone number already exists. ")
        : res.status(500).send("Internal server error. ");
    return res.status(201).send("Successfully created account! ");
  });
});

router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  const { data, error } = await supabase
    .from("users")
    .select("id, password")
    .eq("phoneNumber", phoneNumber);
  if (error) return res.status(500).send("Internal server error. ");
  else {
    if (data.length == 0) {
      return res.status(400).send("No user found with given phone number. ");
    }
    bcrypt.compare(password, data[0].password, (err, result) => {
      if (err) {
        return res.status(500).send("Internal server error. ");
      }
      if (result) {
        req.session.userID = data[0].id;

        return res.status(200).send("Successfully authenticated! ");
      }
      return res.status(401).send("Incorrect password. ");
    });
  }
});

router.post("/logout", (req, res) => {
  req.session.userID
    ? req.session.destroy((err) => {
        if (err) return res.status(500).send("Internal server error. ");
        res.clearCookie(process.env.cookieName);
        return res.status(200).send("Successfully logged out. ");
      })
    : res.status(400).send("Not logged in. ");
});

router.get("/getID", (req, res) => {
  return req.session.userID
    ? res.json({ userID: req.session.userID })
    : res.status(400).send("Not logged in. ");
});

router.get("/isLoggedIn", (req, res) => {
  return req.session.userID
    ? res.json({ msg: true })
    : res.json({ msg: false });
});

router.get("/userPoints", async (req, res) => {
  if (!req.session.userID) return res.status(403).send("Not logged in. ");
  const { data, error } = await supabase
    .from("users")
    .select("points")
    .eq("id", req.session.userID);
  if (error) return res.status(500).send("Internal server error. ");
  console.log(req.session.userID);
  return res.json({ msg: data[0].points });
});

router.get("/pointsRanking", async (req, res) => {
  if (!req.session.userID) return res.status(403).send("Not logged in. ");
  const { data, error } = await supabase
    .from("users")
    .select("points, id")
    .order("points", { ascending: false });
  if (error) return res.status(500).send("Internal server error. ");
  ranking = 0;
  data.forEach((acc, index) => {
    if (acc.id == req.session.userID) ranking = index;
  });
  return res.status(200).json({ ranking: ranking + 1, total: data.length });
});
module.exports = router;
