const { getFlightPrices } = require('./flightPrice');

const source = 'DEL';
const destination = 'JAI';
const date = '2023-04-15';

getFlightPrices(source, destination, date)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));