import React from 'react';
import PropTypes from 'prop-types'

class Order extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentOrder: '',
      data: this.props.data
    }
  }

  static childContextTypes = {
    _order: PropTypes.shape({
      data: PropTypes.array,
      currentOrder: PropTypes.string.isRequired,
      onOrder: PropTypes.func.isRequired
    }).isRequired
  }

  onOrder (f, order){
    this.setState( { data: f(this.state.data)(order), currentOrder: order } )
  }

  getChildContext() {
    return {
      _order: {
        data: this.state.data,
        currentOrder: this.state.currentOrder,
        onOrder: (f, order) => this.onOrder(f, order)
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
      onOrder: PropTypes.func.isRequired,
    }).isRequired
  }

  handleOnOrder = (order) => {
    this.context._order.onOrder( this.props.onOrder, order )
  }

  render(){
    return this.props.render( this.handleOnOrder, this.context._order.currentOrder )
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

