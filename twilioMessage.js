// sending sms with twilio twillio
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSMS = (messageToSend) => {
    client.messages
    .create({
      body: `${messageToSend}`,
      from: "+12082188536",
      to: "+14162624439",
    })
    .then((message) => console.log(message.sid));
}

module.exports = sendSMS