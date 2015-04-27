/**********************************************************************************************
 * Slack.js wrapper for JS
 *---------------------------------------------------------------------------------------------
 * Author: Yair Zaslavsky, yzaslavsky@aconex.com, yair.zaslavsky.github@gmail.com
***********************************************************************************************/

var querystring = require('querystring');
var https = require('https');

/** slack.js main object **/
function slack(token) {
    this.token = token;
    this.host = "slack.com";
    this.apiURI = "/api";
    this.chatAPI = this.apiURI + "/" + "chat";
    this.channelsAPI = this.apiURI + "/" + "channels";

    /** Public functions **/
   
    this.postMessage = function(channel, message, callback) {
        var callbackToUse = arguments.length > 2 ? callback : function(result) {
            console.log("postMessage on channel: " + channel + " with message " + message + " has ended with result " + result.ok);
        };
        this._httpGetCall(this.chatAPI + ".postMessage?token=" + this.token + "&pretty=1&as_user=true&channel=" + channel + "&text=" + querystring.escape(message), callbackToUse);
    }

    this.listChannels = function(callback) {
        this._httpGetCall(this.channelsAPI + ".list?token=" + this.token + "&pretty=1", callback);
    }

    this.channelByName = function(channelName, callback, errorHandler) {
	var _errorHandlerInUse = arguments.length > 2 ? errorHandler : function() {
	    throw "Error in calling channelByName for channel " + channelName;
        };
        var self = this;
        this.listChannels(function(result) {
	    var channelsResult = self._channelsResponse(result);
	    if (channelsResult.ok == true) {
                callback(channelsResult.channels[channelName]);
            } else {
                _errorHandlerInUse();
            }
        });
    }

    /** Private functions section **/
    this._httpGetCall = function(callPath, callback) {
        var body = "";
    	var getOptions = {
	    hostname: this.host,
            path: callPath
        };
       
        https.request(getOptions, function(res) {
            res.on('data', function(d) {
                body = body + d;
            });
            res.on('end', function() {
               callback(JSON.parse(body));
            });
        }).on('error', function(e) {
            console.error(e);
        }).end();
    };

    this._channelsResponse = function(body) {
       var result = new Object();
       result.ok = body.ok;
       result.channels = new Object();
       for (var counter = 0; counter < body.channels.length; counter++) {
           result.channels[body.channels[counter]["name"]] = body.channels[counter];
       }
       return result;
    }
	
};

/** Exports section **/
exports.slack = slack;


