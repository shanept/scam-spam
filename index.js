var twilio = require('twilio');
var query  = require('readline-sync').question;

var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;

var target = query('Who are we targetting? ');
var client = new twilio(accountSid, authToken);

client.calls.create({
    to: target,
    from: process.env.TWILIO_FROM,
    url: 'http://demo.twilio.com/docs/voice.xml'
})
.then((message) => console.log(message.sid));
