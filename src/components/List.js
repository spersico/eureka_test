import React, { Component } from 'react';

class List extends Component {
  render() {
    const { data, priceGetter } = this.props;
    return (
      <div className="list">
      <h3> Seleccione una empresa</h3>
        {data.map(item =>
          <div key={item.symbol} className="item" onClick={() => priceGetter(item.symbol)}>
            <img alt={item.symbol + ' Logo'} src={item.imgURL} />
            <span>{item.name}</span>
          </div>
        )}
      </div>
    );
  }
};

export default List;