import '../styles/trips.scss';

const liMaker = (parent, text) => {
    const li =  document.createElement('li');
    li.textContent = text;
    parent.appendChild(li);
}

const diffDays = (departure) => {
    const [day, month, year] = departure.split('-');
    const departureDate = new Date(`${month}/${day}/${year}`);
    const currentDate = new Date();
    const diffTime = departureDate - currentDate; // Math.abs not needed
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

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
    }

    render() {
        const trips = document.querySelector('.trips');
        
        const trip = document.createElement('div');
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
        tripSubtitle.textContent = `${diffDays(this.departure)} left before departure`;
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
        weatherTitle.textContent = this.forecast ? `Weather Forecast ${this.departure}`: `Current Weather ${this.departure}`;
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
        trips.appendChild(trip);
    }
}

export { Trip };