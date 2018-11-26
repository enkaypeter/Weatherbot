// Get process.stdin as the standard input object.
var standard_input = process.stdin;
require("dotenv").config();
const axios = require("axios");

let openWeatherUrl = process.env.OPENWEATHER_API_URL;
// Set input character encoding.
standard_input.setEncoding('utf-8');

// Prompt user to input data in console.
console.log("Enter your city");

// When user input data and click enter key.
standard_input.on('data', function (data) {
    // check = data.toLowerCase().indexOf("hi");
    // console.log(data.toLowerCase());
    // if(data.toLowerCase().indexOf("hi") !== -1){
    //     console.log("asass");
    // }
    get_forecast(data);
    
    // let check = data.toLowerCase().indexOf("/");
    // if(check){
    //     console.log(check);
    // }
    // User input exit.
    if(data === 'exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        // Print user input in console.
        console.log('User Input Data : ' + data);
    }
});

function get_forecast(city){
    let url = openWeatherUrl + city+"&appid="+process.env.OPENWEATHER_API_KEY;
    axios.get(url)
        .then(function (response){
            let temp = response.data.main.temp;
            temp = Math.round(temp - 273.15);
            let city_name = response.data.name;
            let reply = "It's "+temp+" degrees in "+city_name;
            console.log(reply);
        })
        .catch(function (error){
            console.log(error);
        });
}