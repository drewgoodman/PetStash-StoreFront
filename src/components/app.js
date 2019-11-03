import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter, Switch, Route
} from 'react-router-dom';

import Header from './nav/header';
import NavBar from './nav/navbar';

import Icons from './icons'
import AOS from 'aos';
import 'aos/dist/aos.css';


import GithubCorner from 'react-github-corner';

export default class extends Component {
  constructor(props) {
    super(props)
    Icons();

    this.state = {
      categories: []
    }
  }

  componentDidMount() {

    AOS.init({
      duration: 500
    });


    axios.get("https://petstash-backoffice.herokuapp.com/store/get-categories",
    ).then(response => {
      const categories_list = []
      response.data.map(category_data => {
        let category = {
          name: category_data.shop_category_name,
          icon_url: category_data.shop_category_icon_url,
          id: category_data.shop_category_id
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
        <GithubCorner href="https://github.com/drewgoodman/PetStash-StoreFront" direction='left'/>
        <Header />
        <NavBar />


        <h1>PetStash Supply Co.</h1>
        <h2>Category List:</h2>
        <div className="categories">
        {
          this.state.categories.map(category => {
            const icon_path = require.context('../../static/assets/images', true); 
            let icon_url = icon_path('./' + category.icon_url);
            return (
              <img key={category.id} src={icon_url} data-aos="fade-up"/>
            )
          })
        }

        </div>
        {/* TODO: Footer */}
      </div>
    )
  }
}

