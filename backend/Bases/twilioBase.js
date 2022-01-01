const accountSID = process.env.accountSID;
const authToken = process.env.authToken;

const client = twilio(accountSID, authToken);
export default client;
