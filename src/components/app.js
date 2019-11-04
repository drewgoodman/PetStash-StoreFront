import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter, Switch, Route
} from 'react-router-dom';

import Header from './nav/header';
import NavBar from './nav/navbar';

import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';

import CartModal from './modals/cartModal';

import ShopCategory from './pages/shopCategory';
import FAQPage from './pages/faq';

import NoMatch from './pages/noMatch';

import Icons from './icons'
import AOS from 'aos';
import 'aos/dist/aos.css';


import GithubCorner from 'react-github-corner';

export default class extends Component {
  constructor(props) {
    super(props)
    Icons();

    this.state = {
      isLoading: true,
      loggedInStatus: "NOT_LOGGED_IN",
      categories: [],
      cartModalOpen: false
    }

    this.getLoginStatus = this.getLoginStatus.bind(this);
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.openCartModal = this.openCartModal.bind(this);
    this.closeCartModal = this.closeCartModal.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  getLoginStatus() {
    return axios.get("https://petstash-backoffice.herokuapp.com/store/login-status", { withCredentials: true }
    ).then(response => {
      let loginStatus = response.data.loginStatus;
      console.log(loginStatus)
      if (loginStatus) {
        this.handleSuccessfulLogin();
      } else {
        this.handleUnsuccessfulLogin();
      }
    }).catch(error => {
      console.log("There was an error when checking user authentication", error);
    })
  }

  openCartModal() {
    console.log("Open modal")
    this.setState({
      cartModalOpen: true
    })
  }

  closeCartModal() {
    this.setState({
      cartModalOpen: false
    })
  }

  componentDidMount() {

    this.getLoginStatus();

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
          id: category_data.shop_category_id,
          route: category_data.shop_category_route
        }
        categories_list.push(category)
      })
      this.setState({
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
        <BrowserRouter>
          <div>

            <GithubCorner href="https://github.com/drewgoodman/PetStash-StoreFront" direction='left' />
            <Header
              loggedInStatus={this.state.loggedInStatus}
              handleLogout={this.handleLogout}
              openCartModal={this.openCartModal}
            />
            <NavBar categories={this.state.categories} />
            
            <CartModal
              cartModalOpen={this.state.cartModalOpen}
              openCartModal={this.openCartModal}
              closeCartModal={this.closeCartModal}
            />

            <Switch>
              <Route exact path="/" render={props => (<Home categories={this.state.categories} />)} />
              <Route exact path="/register" component={Register} />

              <Route exact path="/login" render={props => (<Login handleSuccessfulLogin={this.handleSuccessfulLogin} />)} />
              {/* <Route exact path="/checkout" component={Checkout} /> */}
              
              <Route exact path="/shop/:slug" component={ShopCategory} />
              <Route exact path="/faq" component={FAQPage} />
              <Route component={NoMatch} />

            </Switch>

          </div>
          {/* TODO: Footer */}
        </BrowserRouter>
      </div >
    )
  }
}

