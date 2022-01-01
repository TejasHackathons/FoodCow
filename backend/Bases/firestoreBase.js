const firebase = require("firebase-admin");
const creds = require("./foodGeneralCreds.json");
firebase.initializeApp({
  credential: firebase.credential.cert(creds),
});

const db = firebase.firestore();
export default db;
