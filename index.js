"use strict";

var request = require('request');
var htmlparser = require("htmlparser2");

module.exports = {
    getAlerts: getAlerts
};

var tr_count = 0;
var alert_count = 0;
var alert_start = false;

function getAlerts(callback) {
    var data = [];
    request.get("http://www.tri-rail.com/vip.mobile/mobile_vip_message.asp", function(err, res, body) {
        var parser = new htmlparser.Parser({
                onopentag: function(name, attribs){
                    if(name === "tr"){
                        alert_start = true;
                    }
                },
                ontext: function(text){
                    if ( alert_start !== false ) {
                        switch(tr_count) {
                            case 0: 
                                data[alert_count] = {
                                    "text": text,
                                    "time": undefined
                                };
                                tr_count = 1;
                                break;
                            case 1: 
                                data[alert_count].time = text;
                                tr_count = 0;
                                break;
                        }
                    }
                },
                onclosetag: function(tagname){
                    if(tagname === "tr"){
                        alert_start = false;
                        alert_count++;
                    }
                }
        }, {decodeEntities: true});
        parser.write(body);
        parser.end();
        alert_count = 0;
        callback(data);
    });
};
