import '../styles/trips.scss';

class Trip {
    constructor(departure, destination, city, country, description, forecast, icon, img, lat, lng, temp, timezone) {
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
    }

    render() {
        const trips = document.querySelector('.trips');
        const ul = document.createElement('ul');
        
        const departure = document.createElement('li');
        departure.innerHTML = `Departure : ${this.departure}`;
        ul.appendChild(departure);

        const destination = document.createElement('li');
        departure.innerHTML = `Destination : ${this.destination}`;
        ul.appendChild(departure);

        const city = document.createElement('li');
        city.innerHTML = `Weather Station : ${this.city}`;
        ul.appendChild(departure);

        const forecast = document.createElement('li');
        forecast.innerHTML = this.forecast ? 'Weather Forecast' : 'Current Weather';
        ul.appendChild(forecast);

        const icon = document.createElement('li');
        icon.innerHTML = `${this.icon}`;
        ul.appendChild(icon);

        const img = document.createElement('li');
        img.innerHTML = `${this.img}`;
        ul.appendChild(img);

        const lat = document.createElement('li');
        lat.innerHTML = `Latitude : ${this.lat}`;
        ul.appendChild(lat);

        const lng = document.createElement('li');
        lng.innerHTML = `Longitude : ${this.lng}`;
        ul.appendChild(lng);

        const temp = document.createElement('li');
        temp.innerHTML = `Weather Station : ${this.city}`;
        ul.appendChild(temp);

        const timezone = document.createElement('li');
        timezone.innerHTML = `Timezone : ${this.timezone}`;
        ul.appendChild(timezone);

        trips.appendChild(ul);
    }
}

const renderMsg = ( msgInfo ) => {
    const message = document.querySelector('.msg');
    message.innerText = msgInfo.text;

}

export { Trip, renderMsg };