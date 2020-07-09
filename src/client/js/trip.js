import {liMaker, diffDays, getCurrentDate} from './utils';

const spinnerMaker = () => {
    const trips = document.querySelector('.trips');
    const loadSpinner = document.createElement('div');
    loadSpinner.classList.add('loader');
    const spinner = `
        <div>
            <svg width="50" height="50">
            <path fill="#c779d0" d="M25,5A20,20,0,0,1,44.87,22.72,2.52,2.52,0,0,0,47.36,25h0a2.52,2.52,0,0,0,2.48-2.82,25,25,0,0,0-49.68,0A2.52,2.52,0,0,0,2.64,25h0a2.52,2.52,0,0,0,2.49-2.28A20,20,0,0,1,25,5Z">
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.5s" repeatCount="indefinite" />
            </path>
            </svg> 
        </div>   
    `;
    loadSpinner.insertAdjacentHTML('afterbegin', spinner);
    trips.appendChild(loadSpinner);
}

let tripIndex = 0;

class Trip {

    constructor(departure, destination, city, country, description, forecast, icon, img, lat, lng, temp, timezone, status, msg) {
        this.departure = departure;
        this.destination = destination,
        this.city = city;
        this.country = country;
        this.description = description;
        this.forecast = forecast;
        this.icon = icon;
        this.img = img;
        this.lat = lat;
        this.lng = lng;
        this.temp = temp;
        this.timezone = timezone;
        this.status = status? 'success' : 'warning';
        this.msg = msg;

        this.id = tripIndex;
        tripIndex = tripIndex + 1;
    }

    render() {

        const trips = document.querySelector('.trips');
        const tripCard = document.createElement('div', {'id': `trip_${this.id}`});
        tripCard.classList.add('tripCard');
        
        const trip = document.createElement('div')
        trip.classList.add('trip');

        const tripImg = document.createElement('div');
        tripImg.classList.add('trip__image');
        tripImg.style.backgroundImage = `url(${this.img})`; 
        trip.appendChild(tripImg);

        const tripInfo = document.createElement('div');
        tripInfo.classList.add('trip__info');

        const tripTitle = document.createElement('h1');
        tripTitle.classList.add('trip__title');
        tripTitle.textContent = `Your trip to ${this.destination}`;
        tripInfo.appendChild(tripTitle);

        const tripSubtitle = document.createElement('h3');
        tripSubtitle.classList.add('trip__subtitle');
        tripSubtitle.textContent = `${diffDays(this.departure)} days left before departure`;
        tripInfo.appendChild(tripSubtitle);

        const weatherItems = document.createElement('ul');
        weatherItems.classList.add('trip__infoItems');
        liMaker(weatherItems, `Destination: ${this.destination} (${this.country})`);
        liMaker(weatherItems, `Departure: ${this.departure}`);
        liMaker(weatherItems, `Latitude: ${this.lat}`);
        liMaker(weatherItems, `Longitude: ${this.lng}`);
        liMaker(weatherItems, `Timezone: ${this.timezone}`);
        tripInfo.appendChild(weatherItems);

        const weatherTitle = document.createElement('h4');
        weatherTitle.classList.add('weatherTitle');
        weatherTitle.textContent = this.forecast ? `Weather Forecast ${this.departure}`: `Current Weather ${getCurrentDate()}`;
        tripInfo.appendChild(weatherTitle);

        const weather = document.createElement('div');
        weather.classList.add('weather');
        const weatherInfo = document.createElement('ul');
        weatherInfo.classList.add('weather__info');
        liMaker(weatherInfo, `${this.temp} °C`);
        liMaker(weatherInfo, `${this.description}`);
        weather.appendChild(weatherInfo);
        const weatherImg = document.createElement('div');
        weatherImg.classList.add('weather__image');
        weatherImg.style.backgroundImage = `url(${this.icon})`; 
        weather.appendChild(weatherImg);
        tripInfo.appendChild(weather);

        trip.appendChild(tripInfo);

        const msg = document.createElement('div');
        msg.classList.add('message');
        msg.classList.add(this.status);
        const msgText = document.createElement('p');
        msgText.textContent = this.msg;
        msg.appendChild(msgText);

        trip.appendChild(msg);
        tripCard.appendChild(trip);

        const removeButton = document.createElement('button');
        removeButton.id = `remove_${this.id}`;
        removeButton.classList.add('remove');
        removeButton.textContent = 'Remove';
        tripCard.appendChild(removeButton);

        trips.removeChild(trips.lastChild);  // deletes the spinner
        trips.appendChild(tripCard);

        return removeButton.id ;
    }
}

export { spinnerMaker, Trip };