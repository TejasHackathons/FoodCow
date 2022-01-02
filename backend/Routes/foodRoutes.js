const express = require("express");
const router = express.Router();
const twilioBase = require("../Bases/twilioBase");
const supabase = require("../Bases/supabaseBase");

router.post("/foodDetected", async (req, res) => {
  const { detectedFood } = req.body;
  console.log(detectedFood);
  if (!req.session.userID) return res.status(403).send("Not logged in. ");
  const { data, error } = await supabase
    .from("users")
    .select("phoneNumber, points, unhealthyFoods")
    .eq("id", req.session.userID);
  if (error) return res.status(500).send("Internal server error. ");
  if (data.length == 0)
    return res.status(400).send("User logged in does not exist. ");
  if (data[0].unhealthyFoods.includes(detectedFood)) {
    const points = data[0].points;
    if (points == 0) {
      twilioBase.messages
        .create({
          body: `Caught eating a ${detectedFood}! You still have 0 points. `,
          messagingServiceSid: process.env.messagingServiceSID,
          to: data[0].phoneNumber,
        })
        .then(() => res.status(201).send("Successfully sent message. "))
        .done();
    } else {
      const { dataUpdate, errUpdate } = await supabase
        .from("users")
        .update({ points: data[0].points - 1 })
        .match({ id: req.session.userID });
      if (errUpdate) return res.status(500).send("Internal server error. ");
      twilioBase.messages
        .create({
          body: `Caught eating a ${detectedFood}! Points decreased by 1. You now have ${
            points - 1
          } points. `,
          messagingServiceSid: process.env.messagingServiceSID,
          to: data[0].phoneNumber,
        })
        .then(() => res.status(201).send("Successfully sent message. "))
        .done();
    }
  }
});

module.exports = router;
