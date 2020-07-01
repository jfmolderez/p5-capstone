import '../styles/main.css';

const axios = require('axios')

const validDate = (dayDate) => {
    if (!dayDate.match(/\d{2}-\d{2}-\d{4}/)) {
        return false;
    }
    const [day, month, year] = dayDate.split('-').map(str => parseInt(str, 10));
    const currentYear = (new Date()).getFullYear();
    return ( day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= currentYear )
}

const updateUI = (tripInfo) => {
    console.log(tripInfo);
}

const addTripButton = document.querySelector('#add-trip');
const destinationInput =  document.querySelector('#destination');
const departureInput = document.querySelector('#departure');

const prefix = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8888' : '';

addTripButton.addEventListener('click', ( e ) => {
    e.preventDefault();
    const destination = destinationInput.value;
    const departure = departureInput.value;
    if (validDate(departure)) {
        axios.post(`${prefix}/trip`, {destination, departure})
        .then( (resp) => {
            updateUI(resp.data);
        })
    } else {
        alert(`${dayDate} is not a valid date! Try again.`);
    }    
});


