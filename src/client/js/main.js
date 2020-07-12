import { spinnerMaker,Trip } from './trip';

const axios = require('axios')

const validDate = (dayDate) => {
    if (!dayDate.match(/\d{2}-\d{2}-\d{4}/)) {
        return false;
    }
    const [day, month, year] = dayDate.split('-').map(str => parseInt(str, 10));
    const currentYear = (new Date()).getFullYear();
    return ( day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= currentYear )
}

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
    // console.log(tripInfo);
    // console.log('departure : ', departure);

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
        // TODO : modal
    }    
}

addTripButton.addEventListener('click', ( e ) => {
    e.preventDefault();
    const destination = destinationInput.value;
    const departure = departureInput.value;
    clearInput();
    // create trip card with load spinner ; provide an id
    if (validDate(departure)) {
        spinnerMaker();
        axios.post(`${prefix}/trip`, {destination, departure})
        .then( (resp) => {
            updateUI(resp.data, departure);
        })
    } else {
        alert(`${dayDate} is not a valid date! Try again.`);
    }    
});





/* backdrop.addEventListener('click', () => {
    backdrop.style.display ='none';
}); */
