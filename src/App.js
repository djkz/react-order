import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Order, OrderBy, Ordered} from './components/Order/index.js'
import { orderBy } from 'lodash'

const data = [
  {id: 2, name: "item 1", order: 2 },
  {id: 1, name: "item 2", order: 3 },
  {id: 3, name: "item 3", order: 1 },
  {id: 4, name: "item 4", order: 4 },
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
          <table>
            <thead>
              <tr>
                <th>
                  Order
                </th>
                <th>
                  <OrderBy onOrder={(data) => (order) => orderBy(data, order.split(' ')[0], order.split(' ')[1])}
                    render = { (onOrder, currentOrder) => {
                        if( currentOrder === 'id asc' ) return <a onClick={(e) => onOrder('id desc')}>id ^</a> 
                        if( currentOrder === 'id desc') return <a onClick={(e) => onOrder('id asc')}>id v</a> 
                        return <a onClick={(e) => onOrder('id desc')}>id x</a> 
                      } 
                    }
                  />
                </th>
                <th>
                  <OrderBy onOrder={(data) => (order) => orderBy(data, order.split(' ')[0], order.split(' ')[1])}
                    render = { (onOrder, currentOrder) => {
                        if( currentOrder === 'order asc' ) return <a onClick={(e) => onOrder('order desc')}>order ^</a> 
                        if( currentOrder === 'order desc') return <a onClick={(e) => onOrder('order asc')}>order v</a> 
                        return <a onClick={(e) => onOrder('order desc')}>order x</a> 
                      } 
                    }
                  />
                </th>
              </tr>
              </thead>
              <tbody>
                <Ordered render={(data) => data.map(d => (
                  <tr key={d.id}><td>{d.name}</td><td>{d.id}</td><td>{d.order}</td></tr>
                ) )} />
              </tbody>
          </table>
        </Order>

      </div>
    );
  }
}

export default App;
