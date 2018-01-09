const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const api_key = "";

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address to fetch weather for',
            string: true,
        }
    })
    .help()
    .alias('help','h')
    .argv;

var address = encodeURIComponent(argv.address);


geocode.geoCodeAddress(address,
    function(errorMessage, results) {
        if(errorMessage) {
            console.log('error message');
        } else {
            console.log(results.longitude);
            console.log(results.latitude);
            var lng = results.longitude;
            var lat = results.latitude;
            weather.geoWeather(lat, lng, function(errorMessage, weatherResult) {
                if(error) {
                    console.log(error);
                } else {
                    console.log('Temperature is ' + result.temperature);
                }
            });
        }
    }
);


console.log('rquest initiated');