request = require('request');
const getWeather = (lat,lon, callback) => {
    const weatherUrl = 'https://api.darksky.net/forecast/961ddec50630898b038060c9911a3e89/'+encodeURIComponent(lat)+','+encodeURIComponent(lon)+'?units=si';

    request({
            url: weatherUrl,
            json: true

        }, (error, {body}=response) => {
          if(error){
            callback("something went wrong unable to process weather error code : " +error.code,undefined);
          } else if (body.error) {
            callback('unable to find weather fot location location',undefined);
          } else{
            callback(undefined,{
              summary: body.daily.data[0].summary,
                
              temperature: body.currently.temperature
            });
          }

        }


    );

    
}

module.exports = {
    getWeather: getWeather
}