const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
    
})
// api.openweathermap.org/data/2.5/weather
app.post("/", (req, res)=>{

    const city = req.body.cityName;
    const apiKey = "a7e69196cfedeca35e5d8ad417db0d23"
    // const apiKey = "a7e69196cfedeca35e5d8ad417db0d23&unit=standard";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+ apiKey +"&unit="+ unit

    https.get(url, (response)=>{
        console.log(response.statusCode);

        response.on("data", (data)=>{
            // console.log(data) //hexa-decaimal format me print hoga

            //convert the hexadecimal format to JSON
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            // console.log(temp);
            // console.log(desc);
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            //printing or sending the data from weatherAPI to my own server
            res.write("<h1>The weather description is " + desc + ".</h1>") 
            res.write("<h1>The Temperature in " + city + " is " + temp + " degree celcies</h1>");
            res.write("<img src="+ imageURL + ">")
            res.send();
        })
    })
})

app.listen(3000, ()=>{
    console.log("Server is listening");
})