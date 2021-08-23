let projectData = {};
  
const dotenv = require('dotenv');
dotenv.config();



const fetch = require('node-fetch');
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

// Start express
const app = express()

// Cors
const cors = require('cors');
app.use(cors());
// body-parper
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const weatherbitforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const pixabayURL = 'https://pixabay.com/api/?key=';

;


app.post('/addData', async(req, res) => {
    console.log(process.env.geiUsername);
    console.log(process.env.weatherbitkey);
    console.log(process.env.pixabayAPI);
    const myPlace = req.body.myPlace;
    const daysAfterToday = Number(req.body.daysAfterToday);
    //GET fetch data from geoAPI
    const response = await fetch(geoNamesURL + myPlace + '&maxRows=10&username=' + process.env.geiUsername)
    const receivedData = await response.json();
        console.log(receivedData);
        projectData['lat'] = receivedData.geonames[0].lat;
        projectData['lng'] = receivedData.geonames[0].lng;
        console.log(projectData);
    //GET fetch data from weatherbitforecastAPI
        const response2 = await fetch(weatherbitforecastURL + receivedData.geonames[0].lat + '&lon=' +receivedData.geonames[0].lng + '&key=' + process.env.weatherbitkey)
        const receivedData2 = await response2.json();
        console.log(receivedData2);
        projectData['highestTemp'] = receivedData2.data[daysAfterToday].max_temp;
        projectData['lowestTemp'] = receivedData2.data[daysAfterToday].min_temp;
        projectData['weather'] = receivedData2.data[daysAfterToday].weather.description;
        console.log(projectData);
    //GET fetch data from pixabayAPI   
        const response3 = await fetch(pixabayURL + process.env.pixabayAPI + '&q=' + myPlace + '&image_type=photo')  
        const receivedData3 = await response3.json();
        console.log(response3);
        projectData['cityImage'] = receivedData3.hits[0].webformatURL; 
        console.log(projectData);
        res.send(projectData);
    })

app.listen(8000, () =>{
    console.log("Hello, here's the port： 8000！");
})
