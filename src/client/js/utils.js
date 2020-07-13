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

const getCurrentDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    return `${day}-${month}-${year}`;
}

const validDestination = (destination) => {
    return (/^[a-zA-Z ]+$/.test(destination) && destination.length > 2) ;
}

const validDate = (dayDate) => {
    if (!dayDate.match(/\d{2}-\d{2}-\d{4}/)) {
        return false;
    };
    if (diffDays(dayDate) < 0 ) {
        return false;
    };

    const [day, month, year] = dayDate.split('-').map(str => parseInt(str, 10));
    const currentYear = (new Date()).getFullYear();
    return ( day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= currentYear );
}

export { liMaker, diffDays, getCurrentDate, validDestination, validDate };
