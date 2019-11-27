import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Loader extends Component {
  constructor(props) {
      super(props)

      this.state = {
          
      }
  }

  render() {
    if(this.props.isLoading) {
      return (
        <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
        </div>
      )
    } else {
      return null
    }
  }
}
