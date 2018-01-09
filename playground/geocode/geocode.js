const request = require('request');





module.exports = {
    geoCodeAddress:function(address, callback) {
        request({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address,
            json: true
        }, function(error, response, body) {
            if(error) {
                callback("unable to find the address");
            } else if(body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude:body.results[0].geometry.location.lng,
                })
            } else {
                callback("unable to find the address");
            }
        })
    }   
}

// module.exports = function(address) {
//    request({
//             url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address,
//             json: true
//         }, function(error, response, body) {
//             if(error) {
//                 console.log('Unable to connect to google servers');
//             } else if(body.status === 'OK') {
//                 console.log(`Address: ${body.results[0].geometry.location.lat}`);
//                 console.log(`Address: ${body.results[0].geometry.location.lng}`);  
//             } else {
//                 console.log('unable to find the address');
//             }
//         })
// }

