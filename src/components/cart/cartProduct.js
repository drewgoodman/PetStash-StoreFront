import React, { Component } from 'react';

export default class CartProduct extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
  }


  render() {
      return (
          <div>
              {this.props.product.shop_product_name} {this.props.product.shop_product_price} (x{this.props.product.cart_qty})
              | <a className="btn-delete" onClick={() => this.props.deleteCartItem(this.props.product)}>Delete from Cart</a>
          </div>
      )
  }
}