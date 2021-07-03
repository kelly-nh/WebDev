//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
});

// Use bodyParser to parser POSR Requests to the server
app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "4d677dbe5352f5a11b064dd74b29e7e1";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units=" + unit;

  https.get(url, function(response) { //HTTPS GET request: fetch data from URL

    console.log(response.statusCode); //get back statusCode -- 200-299 is successful

    response.on("data", function(data) { // Parse JSON -- use to retrieve data/get response in form of JSON
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The weather is currently " + description + ".</h1>");
      res.write("<h1>The temperature in " + query +" is " + temperature + " degress Celcius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });

  });
});



app.listen(5000, function() {
  console.log("Server is running on port 5000");
});
// const query = req.body.cityName;
// const apiKey = "4d677dbe5352f5a11b064dd74b29e7e1";
// const unit = "metric";
//
// const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units=" + unit;
//
// https.get(url, function(response) { //HTTPS GET request: fetch data from URL
//   console.log(response.statusCode); //get back statusCode -- 200-299 is successful
//
//   response.on("data", function(data) { // Parse JSON -- use to retrieve data/get response in form of JSON
//     const weatherData = JSON.parse(data);
//     const temperature = weatherData.main.temp;
//     const description = weatherData.weather[0].description;
//
//     const icon = weatherData.weather[0].icon;
//     const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//
//     res.write("<h1>The weather is currently " + description + ".</h1>");
//     res.write("<h1>The temperature in Dayton, OH is " + temperature + " degress Celcius</h1>");
//     res.write("<img src=" + imageURL + ">");
//     res.send();
//   });
//
// });
