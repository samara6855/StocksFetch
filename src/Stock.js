import React from 'react';
import Plot from 'react-plotly.js';
import './Stock.css';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'qJPaAInVeAWrlpdK67fyLZ8FPEUALmUL';
    let StockSymbol = 'AAPL';
    let startDate = '2023-11-01';
    let endDate = '2023-11-01';

    let API_Call = `https://api.polygon.io/v2/aggs/ticker/${StockSymbol}/range/1/minute/${startDate}/${endDate}?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`;
    
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);

          for (var result of data.results) {
            stockChartXValuesFunction.push(new Date(result.t).toLocaleTimeString());
            stockChartYValuesFunction.push(result.o);
          }

          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }

  render() {
    return (
      <div className='stock-container'>
        <h1 className='stock-title'>Stocks Intraday</h1>
        <div className='plot-container'>
          <Plot
            className='plot'
            data={[
              {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'blue'},
              }
            ]}
            layout={{width: '100%', height: '100%', title: 'AAPL'}}
          />
        </div>
      </div>
    )
  }
}

export default Stock;
