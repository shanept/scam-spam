var express = require('express');
var app     = express();
var bp      = require('body-parser');
var path    = require('path');

module.exports = (function(e) {
    var events = e;

    app.use(bp.urlencoded({ extended: true }));

    app.post('/handler.xml', (request, response) => {
        response.sendFile(path.resolve('./handler.xml'));
    });

    app.post('/status/', (request, response) => {
        switch (request.body.CallStatus) {
            case "completed":
                events.emit("disconnect", request.body.CallSid);
                break;
            case "answered":
            case "in-progress":
                events.emit("connect", request.body.CallSid);
                break;
            default:
                console.log(request.body.CallStatus + ": " + request.body.CallSid);
                break;
        }

        response.send('');
    });
    
    app.listen(3000, (err) => {
        if (err) {
            return console.error('Something went wrong!', err);
        }
    
        console.log('Server is listening on port 3000');
    });
});
