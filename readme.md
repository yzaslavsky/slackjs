Example of usage:

var api = require("slackjs");

var s =  new api.slack("PUT-HERE-YOUR-API-KEY");
s.channelByName(
    "MY-CHANNEL-TO-POST-ON", 
    function(channel) {
	s.postMessage(channel.id, "Hello slackjs!" , function(body) {
        });
    }
);
