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

addTripButton = document.querySelector('#add-trip');
destinationInput =  document.querySelector('#destination');
departureInput = document.querySelector('#departure');

addTripButton.addEventListener('click', ( e ) => {
    e.preventDefault();
    const destination = destinationInput.value;
    const departure = departureInput.value;
    if (validDate(departure)) {
        axios.post('/trip', {destination, departure})
        .then( (resp) => {
            updateUI(resp.data);
        })
    } else {
        alert(`${dayDate} is not a valid date! Try again.`);
    }    
});


