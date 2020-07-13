import { spinnerMaker, removeSpinner, Trip } from './trip';
import { validDestination, validDate } from './utils';

const axios = require('axios')

const prefix = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8888' : '';
const addTripButton = document.querySelector('#add-trip');
const destinationInput =  document.querySelector('#destination');
const departureInput = document.querySelector('#departure');
const backdrop = document.querySelector('.backdrop');


const clearInput = () => {
    destinationInput.value = '';
    departureInput.value = '';
}

const updateUI = (tripInfo, departure,) => {

    if (tripInfo.ok) {
        const trip = new Trip (
            departure,
            tripInfo.destination,
            tripInfo.city,
            tripInfo.country,
            tripInfo.description,
            tripInfo.forecast,
            tripInfo.icon,
            tripInfo.img,
            tripInfo.lat,
            tripInfo.lng,
            tripInfo.temp,
            tripInfo.timezone,
            tripInfo.status, 
            tripInfo.msg
        );

        const removeButtonId = trip.render();
        const removeButton = document.querySelector(`#${removeButtonId}`);
        removeButton.addEventListener('click', ( e ) => {
            e.preventDefault();
            const tripForRemoval = removeButton.parentElement;
            document.querySelector('.trips').removeChild(tripForRemoval);
        });
    }
    else {
        removeSpinner();
        alert(`Could not find the location of your destination ${tripInfo.destination}`);
    }    
}

addTripButton.addEventListener('click', ( e ) => {
    e.preventDefault();
    const destination = destinationInput.value;
    const departure = departureInput.value;
    clearInput();

    if (validDate(departure) && validDestination(destination)) {
        spinnerMaker();
        axios.post(`${prefix}/trip`, {destination, departure})
        .then( (resp) => {
            updateUI(resp.data, departure);
        })
    } else {
        if (!validDate(departure)) {
            alert(`${departure} is not a valid date! Try again.`);
        } else {
            alert(`${destination} is not a valid city! Try again.`);
        }
    }    
});


