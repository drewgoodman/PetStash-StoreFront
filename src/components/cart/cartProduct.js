import React, { Component } from 'react';

export default class CartProduct extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
  }


  render() {
      return (
          <div className="form__cart-item">
              <div className="form__order-summary-title">
              {this.props.product.shop_product_name}
              </div>
              <div className="form__order-summary-price">
                ${this.props.product.shop_product_price}
              </div>
              <div>
                  ( x{this.props.product.cart_qty} )
              </div>
              <a className="btn-delete form__cart-item__delete" onClick={() => this.props.deleteCartItem(this.props.product)}>Delete from Cart</a>
          </div>
      )
  }
}