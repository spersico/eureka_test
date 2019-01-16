import httpModule from './httpService';

const getPriceDataAndComparison = function (symbol) {
  return getDailyPrice(symbol).then(response => {
    const prices = response.data["Time Series (Daily)"];
    const listOfDates = Object.getOwnPropertyNames(prices).sort().reverse();
    const lastPrice = prices[listOfDates[0]];
    const previousPrice = prices[listOfDates[1]];

    return { lastPrice, previousPrice };
  }).catch(reason => {
    console.error('Error - getPriceDataAndComparison: ', reason);
    throw reason;
  })
};

const getDailyPrice = function (symbol) {
  return httpModule.get('https://www.alphavantage.co/query?', {
    params: {
      apikey: process.env.REACT_APP_API_KEY,
      function: 'TIME_SERIES_DAILY',
      symbol
    }
  });
};

export { getDailyPrice, getPriceDataAndComparison }