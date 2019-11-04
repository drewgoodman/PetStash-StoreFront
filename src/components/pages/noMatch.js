import React, { Component } from 'react';

export default class NoMatch extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
  }

  render() {
      return (
          <div>
              <h1>Whoops! Something went wrong!</h1>
              <h2>We couldn't find the page you were looking for. Please contact us if you believe this in error.</h2>
          </div>
      )
  }
}