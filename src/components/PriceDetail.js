import React, { Component } from 'react';

class PriceDetail extends Component {
  render() {
    const { item, error } = this.props;
    let prices = <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
    if (item && item.prices) {
      const difference = Math.abs(item.prices.lastPrice['4. close'] - item.prices.previousPrice['4. close']);
      const result = item.prices.lastPrice['4. close'] >= item.prices.previousPrice['4. close'];
      const percentaje = (difference / item.prices.previousPrice['4. close']) * 100;

      prices = <div className="explanation" >
        <div className="intro-text">
          El día de ayer, las acciones de <strong>{item.symbol}</strong> abrieron a <strong>USD{item.prices.lastPrice['1. open']}</strong>,
          tuvieron un tope a <strong>USD{item.prices.lastPrice['2. high']}</strong> y cerraron a <strong>USD{item.prices.lastPrice['4. close']}</strong>,
          a comparación con el día anterior, que cerraron a <strong>USD{item.prices.previousPrice['4. close']}</strong>.
        </div>

        {result ?
          <div className="gain">Es decir que <strong >aumentó</strong> un <strong >{percentaje.toFixed(2)}% (o USD{difference.toFixed(2)})</strong> respecto al día anterior.</div> :
          <div className="loss">Es decir que <strong >disminuyó</strong> un <strong >{percentaje.toFixed(2)}% (o USD{difference.toFixed(2)})</strong> respecto al día anterior.</div>
        }
      </div>;
    } else if (error) {
      prices = <h2>Ups, parece que hubo un error. Puede que haya superado el limite de pedidos por minuto.
      Espere unos segundos antes de intentarlo nuevamente</h2 >;
    }

    if (item) {
      return <div className="detail" >
        < h2 >
          {item.name}
        </h2 >
        <img alt={item.symbol + ' Logo'} src={item.imgURL} />
        {prices}
      </div>

    } else { return false; }

  };
}

export default PriceDetail;