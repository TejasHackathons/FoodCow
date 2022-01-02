const accountSID = process.env.accountSID;
const authToken = process.env.authToken;
const client = require("twilio")(accountSID, authToken);
module.exports = client;
