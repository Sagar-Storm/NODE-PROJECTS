const request = require('request');

var geocodeaddress = function(address) {
    return new Promise(function(resolve, reject) {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address,
            json: true
        }, function(error, response, body) {
            if(error) {
               reject('unable to fetch weather')
            } else if(body.status === 'OK') {
                    resolve({
                        address: body.results[0].formatted_address,
                        latitude: body.results[0].geometry.location.lat,
                        longitude:body.results[0].geometry.location.lng,
                    });
            } else {
               reject('unable to fetch weather');
            }
        })
    })

}


geocodeaddress('Hebbal, Bengaluru').then( function(location) {
    console.log(JSON.stringify(location, undefined, 2));
}, function(errorMessage) {
    console.log(errorMessage);
})