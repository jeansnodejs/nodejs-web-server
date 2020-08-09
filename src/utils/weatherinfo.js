const request = require('request')

const weatherinfo = (cityname, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=08e22e0adc0b56a9f93f506254f3ca21&query=" + cityname;
    
    request({url: url, json: true}, (error, response) => {
        console.log("weather:", response);

        if (!cityname) {
            return callback("city name is not provided!", cityname);            
        }
        
        if (response.body.error){           
            return callback(response.body.error, undefined)
        }else {            
            console.log(response.body);
   
            var info = {
                country: response.body.location.country,
                city: response.body.location.name,
                tempreture: response.body.current.temperature,
                observation_time: response.body.current.observation_time
            };
    
            console.log("=== extracted info: === ", JSON.stringify(info));
    
            callback(undefined, info);
            
        }

    })
}

module.exports = weatherinfo