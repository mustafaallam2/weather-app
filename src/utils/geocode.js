request = require('request');
const geocode = (address, callback) => {
    const locationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXVzdGFmYWFsbGFtIiwiYSI6ImNrNDB6bWVubzA0eHIza29hMDhiaHBpZXYifQ.hjmYfeOCEQvvuTQ8DknRLg&limit=1';
    request({
            url: locationUrl,
            json: true

        }, (error, {body}=response) => {
            if (error) {
                callback("something went wrong unable to process location service error code : " + error.code, undefined);
            } else if (body.features.length === 0) {
                callback("unable to find  location", undefined);

            } else {
                callback(undefined, {
                    lat: body.features[0].center[1],
                    lon: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }

        }


    );
}

module.exports={
    geocode: geocode
}