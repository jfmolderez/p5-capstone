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

export { liMaker, diffDays }
