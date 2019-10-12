const request = require('request');
function geocodes(location, callback){

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYmhhcmF0LWtlbmRyZSIsImEiOiJjazFhN3Q2dHIwaDhuM29xd2s1Z3l5Ym5xIn0.ZCAjaGlNdB18OVLC-GLgbg&limit=1`;

    request({url, json :true}, (error,{body}) => {

        console.log(body);
        if(error){
            callback('Unable to coonect to Geocode services');
        }else if(body.features.length === 0){
            callback('Unable to find location. Please try another search');
        }else{
            callback(error, {
                longitude : body.features[0].center[0],
                latitude :body.features[0].center[1],
                location : body.features[0].place_name
            });
        }
    });

}


module.exports = geocodes;