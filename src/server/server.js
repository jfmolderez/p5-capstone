const cors = require('cors');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');

const WEATHER_API_KEY = 'df841d8214ff4f23acda87f9ff8a331a'
const PIXABAY_API_KEY = '17137569-1cf0934b4fa10ceb0ecde5626'

const cities = { 'cairo': 'al qahirah', 'le caire' : 'al qahirah' }

const countryCodes = {
    'paris' : 'fr', 'moscow': 'ru', 'los angeles' : 'us',  'san francisco' : 'us'
}

const planes = [
    "https://pixabay.com/get/53e2dc4b4e57ae14f1dc84609629307f1638dbe35a4c704c7c2c79d39044c751_640.jpg",
    "https://pixabay.com/get/52e9d4424b54a414f1dc84609629307f1638dbe35a4c704c7c2c79d39044c751_640.jpg",
    "https://pixabay.com/get/53e1d04a4352a914f1dc84609629307f1638dbe35a4c704c7c2c79d39044c751_640.jpg",
    "https://pixabay.com/get/52e8d7434855ae14f1dc84609629307f1638dbe35a4c704c7c2c79d39044c751_640.jpg",
    "https://pixabay.com/get/52e5d5454c51ab14f1dc84609629307f1638dbe35a4c704c7c2c79d39044c751_640.jpg"
]

const getCoordinates = async (destination) => {
    let city = destination.toLowerCase();
    city = city in cities ? cities[city] : city ;
    const url = city in countryCodes ?
        `http://api.geonames.org/postalCodeSearch?country=${countryCodes[city]}&placename=${encodeURI(city)}&maxRows=10&username=jfmolderez&type=json`:
        `http://api.geonames.org/postalCodeSearch?placename=${encodeURI(city)}&maxRows=10&username=jfmolderez&type=json`;
    
    const response = await axios.get(url);

    if (response.data.postalCodes.length === 0) {
        return {
            destination,
            ok: false 
        }
    } 
    const response_item  = response.data.postalCodes[0];
    return {
        destination, 
        ok: true,
        lat: response_item.lat.toFixed(3) , 
        lng: response_item.lng.toFixed(3)   
    }
};

const getCurrentWeather = async (lat, lng, query) => {
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHER_API_KEY}`; 
    const response = await axios.get(url);
    const response_item = response.data.data[0];
    const city = response_item.city_name;
    const status = query.toLowerCase() === city.toLowerCase();
    const msg = status ?
        `Success : Current weather for ${city} has been successfully retrieved from Weatherbit API.`:
        `Warning : Forecast retrieved for station ${city} may not correspond to ${query}. Check the coordinates.`;
    
    return {

        temp: response_item.temp,
        timezone: response_item.timezone,
        country: response_item.country_code, 
        city: city, 
        //ob_time: response_item.ob_time,
        //pres: response_item.pres,
        //sunrise: response_item.sunrise,
        //sunset: response_item.sunset,
        icon: `https://www.weatherbit.io/static/img/icons/${response_item.weather.icon}.png`,
        description: response_item.weather.description,
        forecast: false,
        status: status,
        msg: msg,
    }
};

const getForecastWeather = async (lat, lng, query, dayDate) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHER_API_KEY}`;
    const response = await axios.get(url);
    const response_item = response.data.data.filter(record => record.datetime === dayDate);
    const city = response.data.city_name
    const status = query.toLowerCase() === city.toLowerCase();
    const msg = status ?
        `Success : Weather forecast for ${city} has been successfully retrieved from Weatherbit API.`:
        `Warning : Weather info retrieved for city ${city}. Check the coordinates.`;
    return {
        temp: response_item[0].temp,
        timezone: response.data.timezone,
        country: response.data.country_code, 
        city: city,
        icon: `https://www.weatherbit.io/static/img/icons/${response_item[0].weather.icon}.png`,
        description: response_item[0].weather.description,
        forecast: true,
        status: status,
        msg: msg
    }
}

const getPicture = async (city, countryCode) => {

    // fetch image corresponding to the city
    let url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${city}&image_type=photo`;
    let response = await axios.get(url);
    let nbHits = response.data.hits.length;
    let fullImg, img ;
    if (nbHits > 0) {
        fullImg = response.data.hits[Math.floor(Math.random() * nbHits)];
        img = fullImg.webformatURL;
        return { img };
    } 

    // fetch images corresponding to the country
    const countryUrl = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
    response = await axios.get(countryUrl);
    const country = response.data.name;
    url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURI(country)}&image_type=photo`;
    response = await axios.get(url);
    nbHits = response.data.hits.length;
    if (nbHits > 0) {
        fullImg = response.data.hits[Math.floor(Math.random() * nbHits)];
        img = fullImg.webformatURL;
        return { img };
    } 
    
    // get fallback image
    img = planes[Math.floor(Math.random() * planes.length)];
    return { img };
}

const isNearDate = (dayDate) => {
    const [day, month, year] = dayDate.split('-');
    const forecastDate = new Date(`${month}/${day}/${year}`);
    const currentDate = new Date();
    const diffTime = forecastDate - currentDate; // Math.abs not needed
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays >= 1 && diffDays < 16); 
}

const transformDate = (dayDate) => {
    const [day, month, year] = dayDate.split('-');
    return `${year}-${month}-${day}`;
}

const getTripInfo = async (destination, departure) => {
    const coords = await getCoordinates(destination);
    if ( coords.ok ) {
        let weather ;
        if (isNearDate(departure)) {
            weather = await getForecastWeather(coords.lat, coords.lng, coords.destination, transformDate(departure));
        } else {
            weather = await getCurrentWeather(coords.lat, coords.lng, coords.destination);
        }
        const picture = await getPicture(destination, weather.country);
        return {...picture, ...coords, ...weather}
    } else {
        return coords
    }
}

const app = express();

app.use(cors());
app.use(express.static('./dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../../dist/index.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.status(200).send(contentFromHtmlFile);
});

app.post('/trip', (req, res, next) => {
    destination = req.body.destination;
    departure = req.body.departure;
    getTripInfo(destination, departure)
    .then((tripInfo) => {
        res.status(200).send(tripInfo)
    });
});
    
const port = 8888;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}.`);
});