import React, { Component } from 'react';

export default class ShopProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div>
                    
                {this.props.product.shop_product_name}
                <img src={this.props.product.shop_product_image_url} />
                ${this.props.product.shop_product_price}
                </div>
                <div>
                    {this.props.product.shop_product_onhand} in stock
                </div>
                <div>
                    <a>Add Product to cart</a>
                </div>
            </div>
        )
    }
}