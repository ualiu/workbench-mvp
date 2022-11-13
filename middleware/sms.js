require('dotenv').config();

let sendSms = function (customersNumber) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const myTwilioNum = process.env.TWILIO_PHONE_NUMBER
  const client = require('twilio')(accountSid, authToken);

  client.messages
  .create({
    body: 'The status of your work-order has been updated!',
    from: myTwilioNum,
    to: customersNumber
  })
 .then(message => console.log(message.sid));
}
module.exports =  { sendSms };




