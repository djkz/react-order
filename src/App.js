import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Order, OrderBy, Ordered} from './components/Order/index.js'
import { orderBy } from 'lodash'

const data = [
  {id: 1, name: "Deal id 1 o 3", order: 3 },
  {id: 2, name: "Deal id 2 o 2", order: 2 },
  {id: 3, name: "Deal id 3 o 1", order: 1 },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Order</h1>
        </header>
        <Order data={data}>
          Order by:
          <OrderBy name='order' onOrder={(data, order) => orderBy(data, d => d.order)}>
            { (onOrder, currentOrder) => (
              <a onClick={(e) => onOrder('order asc')}>order</a>
            )}
          </OrderBy>
          <br />
          <ul>
            <Ordered render={(data) => data.map(d => <li key={d.id}>{d.name}</li> )} />
          </ul>
        </Order>

      </div>
    );
  }
}

export default App;
