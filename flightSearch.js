const axios = require('axios');
require('dotenv').config();


const getFlightPrices = async (source, destination, date) => {
  const url = `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/IN/INR/en-US/${source}-sky/${destination}-sky/${date}`;
  const options = {
    headers: {
      'X-RapidAPI-Key': process.env.SKYSCANNER_API_KEY,
    },
  };
  try {
    const response = await axios.get(url, options);
    const quotes = response.data.Quotes;
    const carriers = response.data.Carriers;
    const result = {};
    quotes.forEach((quote) => {
      const carrier = carriers.find((c) => c.CarrierId === quote.OutboundLeg.CarrierIds[0]);
      result[carrier.Name] = `₹${quote.MinPrice}`;
    });
    return result;
  } catch (error) {
    console.error(error);
    return {};
  }
};

module.exports = { getFlightPrices };