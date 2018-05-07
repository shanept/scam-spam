# Scam Spammer

## Setup

1. Install ngrok and node. Install NPM dependencies for repository.
2. Forward port 3000 with ngrok.
`ngrok http 3000`
3. Grab the URL forwarded by ngrok, and add it to index.js, as follows:
`var url = 'http://1234a56b.ngrok.io';`
4. Define the following environmental variables:
```
TWILIO_SID  - Account SID
TWILIO_AUTH - Account AUTH token
TWILIO_FROM - The phone number off which you wish to make calls
```
5. Call away! Ensure you use international phone numbers.
```
> node index.js
Who are we targetting? +123456789
Server is listening on port 3000
```
