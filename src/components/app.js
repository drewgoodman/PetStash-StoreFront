import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios.get("https://petstash-backoffice.herokuapp.com/store/get-categories"
    ).then(response => {
      const categories_list = []
      response.data.map(category_data => {
        let category = {
          name: category_data.shop_category_name,
          icon_url: category_data.shop_category_icon_url
        }
        categories_list.push(category)
      })
      this.setState ({
        categories: categories_list
      })
      console.log(this.state.categories)
    }).catch(error => {
      console.log("Error retrieving categories", error)
    })

  }

  render() {
    return (
      <div className='app'>
        <h1>PetStash Supply Co.</h1>
        <h2>Category List:</h2>
        {
          this.state.categories.map(category => {
            const icon_path = require.context('../../static/assets/images', true); 
            let icon_url = icon_path('./' + category.icon_url);
            return (
              <img src={icon_url}/>
            )
          })
        }
      </div>
    )
  }
}

