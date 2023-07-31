const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    //console.log(req.body.cityname);
    //console.log("post recived");

    const query = req.body.cityname;
    
    const apiKey = "d9fda4d6ba276aaf92390d95d96e77e5";

    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on('data',function(data){
            const wd = JSON.parse(data);
        // console.log(wd);
        // const object = {
        //     name: "kishor",
        //     food: "xyz",
        // }
        // console.log(JSON.stringify(object));

            const temp = wd.main.temp;
        //console.log(temp);
            const icon = wd.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/"+icon+"@2x.png";


        res.write("<h1>Temp in "+query+": " +temp+"°C</h1>");
        res.write("<img src="+image+">");
        
        res.send();

    });
    
});
});




app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running on port 3000');
});