const request = require('request');

var geoWeather = function(lat, lng, callback) {
        request({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address,
            json: true
        }, function(error, response, body) {
            if(!error && response.statusCode === 200) {

                callback(undefined, {
                    temperature: body.currently.temperature 
                });

            } else {
                callback('unable to connect to the server');
            }
        });
    } 
    
module.exports.geoWeather = geoWeather;