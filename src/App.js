import React, { Component } from 'react';
import './App.css';
import { getPriceDataAndComparison } from './services/stockPricesService'
import List from './components/List';
import PriceDetail from './components/PriceDetail';

class App extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      selected: null,
      business: [
        { symbol: 'FB', name: 'Facebook Inc.', imgURL: 'https://i.imgur.com/jOCc1ga.png' },
        { symbol: 'AAPL', name: 'Apple Inc.', imgURL: 'https://i.imgur.com/B2XVFSA.png' },
        { symbol: 'MSFT', name: 'Microsoft Corporation', imgURL: 'https://i.imgur.com/3XfdGl3.png' },
        { symbol: 'GOOGL', name: 'Alphabet Inc Class A', imgURL: 'https://i.imgur.com/Gi0ZZgh.png' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', imgURL: 'https://i.imgur.com/IzIhhlR.png' }]
    }
    this.getData = this.getData.bind(this);
  };

  getData(symbol) {
    const selected = this.state.business.find(x => x.symbol === symbol);
    this.setState({ selected, error: null });
    getPriceDataAndComparison(symbol)
      .then(response => {
        this.setState({ selected: { ...selected, prices: response } });
      }).catch(reason => {
        this.setState({ error: reason });
      });
  }


  render() {
    return (
      <div className="App">
        <List data={this.state.business} priceGetter={this.getData} />
        <PriceDetail item={this.state.selected} error={this.state.error} />
      </div>
    );
  }
}

export default App;
