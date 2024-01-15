const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
     const query = req.body.cityName;
     const unit = "metric";
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + process.env.REACT_APP_API_KEY +"&units=" + unit; 

     https.get(url, function(response){
     console.log(response.statusCode);
     response.on("data", function(data){
     const weatherData = JSON.parse(data);
     const temp = weatherData.main.temp;
     console.log("Temperature: " + temp);
     const discription = weatherData.weather[0].description;
     console.log("Weather Discription: " + discription);
     const icon = weatherData.weather[0].icon;
     console.log(icon);
     const imageURL ="https://openweathermap.org/img/wn/" + icon + "@2x.png" ;
     res.write("<h1>The temperature in " + query + " is "  + temp + " degrees Celcius.</h1>");
     res.write("<h2>The weather is currently " + discription + ".</h2>");
     res.write("<img src =" + imageURL + ">");

     res.send();
     })
 });
})

app.listen(1000, function(){
    console.log("Server started on port 1000");
});
