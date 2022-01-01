const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "../.env" });
export default {
  accountSID: process.env.accountSID,
  authToken: process.env.authToken,
};
