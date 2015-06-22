Example of usage:

```
var api = require("slackwrapper");

var s =  new api.slack("PUT-YOUR-API-KEY-HERE");
s.channelByName(
    "MY-CHANNEL-TO-POST-ON", 
    function(channel) {
	s.postMessage(channel.id, "Hello slackjs!" , function(body) {
        });
    }
);
```
