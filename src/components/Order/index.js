import React from 'react';
import PropTypes from 'prop-types'

class Order extends React.Component {
  state = {
    currentOrder: '',
    func: (data) => (data)
  }

  static childContextTypes = {
    _order: PropTypes.shape({
      data: PropTypes.array,
      currentOrder: PropTypes.string.isRequired,
      setOrderFunc: PropTypes.func.isRequired
    }).isRequired
  }

  getChildContext() {
    return {
      _order: {
        data: this.state.func(this.props.data),
        currentOrder: this.state.currentOrder,
        setOrderFunc: (f) => this.setState( { func: f } )
      }
    }
  }

  render() {
    return this.props.children
  }
}

class OrderBy extends React.Component {
  static contextTypes = {
    _order: PropTypes.shape({
      currentOrder: PropTypes.string.isRequired,
      setOrderFunc: PropTypes.func.isRequired
    }).isRequired
  }

  handleOnOrder = (order) => {
    console.log('order by ' + order)
    this.context._order.setOrderFunc( this.props.onOrder )
  }

  render(){
    return this.props.children( this.handleOnOrder, this.context._order.currentOrder )
  }
}

class Ordered extends React.Component {
  static contextTypes = {
    _order: PropTypes.shape({
      data: PropTypes.array.isRequired
    }).isRequired
  }

  render(){
    return this.props.render( this.context._order.data );
  }
}

export {Order, OrderBy, Ordered}

