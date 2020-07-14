# Plan Your Trip (Capstone Project)
## Overview
This Web application allows you to plan a trip in the future and to get some weather info about your destination, i.e. a weather forecast if the your trip is planed in the near future (below 16 days from the current date) or the current weather otherwise.
The application backend connects to various API's to collect various data about your trip : 
  - geonames to get the location : longitude and latitude
  - weatherbit to get the current weather or a weather forecast for the provided location
  - pixabay to get an image related to the destination city or country of the trip
  - restcountries to get the code of the destination country if an image could not be found for the city
The application frontend allows the user to plan a trip at any date in the future or to remove any planned trip.  
## Instructions
These instructions assume that node.js and npm are installed.
Cd to the project directory where `package.json`is located and type `npm install` in order to install all the dependencies. The application can be configured either in development mode or in production mode .
To run the application in development mode:  
  - start the back-end server (express server running on port 8888) in one terminal window: `npm start`
  - build and start the application using the webpack-dev-server (running on port 9000) in another terminal window: `npm run dev`
  - go to the URL `localhost:9000` in your browser to experiment the app ;
  
To run the application in production mode:
  - build the application in one terminal window : `npm run build`
  - start the express server in the same terminal window (or in another, is does not matter here): `npm start`
  - go to the URL `localhost:8888` in your browser to experiment the app ;
  - you can check that due to the service worker, the application is still rendered when the server stops : type CTRL-C in the terminal window to interrupt the server and reload the page in your browser; 

## Tests
Some unit tests are included to try Jest, a JavaScript Testing Framework. To check that these tests pass, cd to the project directory where `package.json`is located and type `npm test`.
You can also check that the application is responsive by varying the width of your browser window. The CSS code is written following the mobile-first paradigm with full column display in the width range 300px - 650px. Media queries are applied for displays that have above 650px and 960px width.

## Usage
Enter the destination city and the departure date (format dd-mm-yyyy) in the form at the top of the page and press the add trip button. A card corresponding to the trip containing a weather forecast or the current weather for your destination should appear below within less than 1 or 2 seconds. A remove button is attached to each card.  

## Notes to reviewer
The service worker is attached only in production mode. When the page index.html is served in development, the code for this service worker cannot be fetched and it generates a 404 error. <br/>
Extend  options : 
  - An image for the country is pulled from Pixabay when an image for the city cannot be found 
  - A remove button is attached to each trip card
  - An icon is incorporated in the forecast


