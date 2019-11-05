import React, { Component } from 'react';
import axios from 'axios';

export default class Account extends Component {
  constructor(props) {
      super(props)

      this.state = {
          transactionHistory: []
      }

      this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this)
  }

  fetchTransactionHistory() {
    axios.get(
        "https://petstash-backoffice.herokuapp.com/store/transactions",
        { withCredentials: true}
    ).then(response => {
        this.setState({
            transactionHistory: response.data
        })
        console.log(this.state.transactionHistory)
    }).catch(error => {
        console.log("There was an error in retrieving your cart items", error);
    })
  }

  componentDidMount() {
    this.fetchTransactionHistory();
  }

  render() {
      return (
          <div>
              <h1>The Account Page</h1>
          </div>
      )
  }
}