const request = require('request');



function forecast(longitude, latitude, callback){

    const url = `https://api.darksky.net/forecast/ec98466fb78ca3cc8e5bfec2f93e8143/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?exclude=minutely,hourly,daily`;

    request({url, json : true}, (error, response, body) =>{

        if(error){
            callback('Unable to connect Weather APIs');
        }else if(response.error){
            callback('Unble get the weather detail for provided location. Please try another search');
        }else{
            callback(error,`It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability} chance of raining`);
        }

    });
}

module.exports = forecast;