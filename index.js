var twilio = require('twilio');
var query  = require('readline-sync').question;
var e      = require('events');
var events = new e.EventEmitter();
var server = require('./server');
var repo   = require('./repo');

var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;

var target = query('Who are we targetting? ');
var client = new twilio(accountSid, authToken);

// Initiate the web server
server(events);

var url = '';

events.on('init',       createCall);
events.on('connect',    handleConnect);
events.on('disconnect', handleDisconnect);

events.on('disconnect', createCall);

function handleCall(CallInstance) {
    console.log('Call created: ' + CallInstance.sid);
    repo.add(CallInstance);
}

function handleConnect(callSid) {
    console.log('Call Connected: ' + callSid);
}

function handleDisconnect(callSid) {
    console.log('Call Disconnected: ' + callSid);
    repo.remove(callSid);
}

function createCall() {
    debugger;

    client.calls.create({
        to: target,
        from: process.env.TWILIO_FROM,
        url: url + '/handler.xml',
        statusCallback: url + '/status/',
        statusCallbackEvent: [
            "completed",
            "answered"
        ]
    })
    .then((message) => handleCall(message))
    .catch((error)  => console.error(error.message));
}

events.emit('init');
