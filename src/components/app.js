import React, { Component } from 'react';
import axios from 'axios';
import {
  Router, Switch, Route
} from 'react-router-dom';

import Header from './nav/header';
import NavBar from './nav/navbar';

import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';
import Account from './pages/account';
import Checkout from './pages/checkout';

import CartModal from './modals/cartModal';

import ShopCategory from './pages/shopCategory';
import FAQPage from './pages/faq';

import NoMatch from './pages/noMatch';

import Icons from './icons'
import AOS from 'aos';
import 'aos/dist/aos.css';

import history from '../history';


import GithubCorner from 'react-github-corner';

export default class extends Component {
  constructor(props) {
    super(props)
    Icons();

    this.state = {
      isLoading: true,
      loggedInStatus: "NOT_LOGGED_IN",
      categories: [],
      cartModalOpen: false,
      cartModalEnabled: true
    }

    this.getLoginStatus = this.getLoginStatus.bind(this);
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.openCartModal = this.openCartModal.bind(this);
    this.closeCartModal = this.closeCartModal.bind(this);
    this.enableCartModal = this.enableCartModal.bind(this);
    this.disableCartModal = this.disableCartModal.bind(this);
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
    this.setState({
      cartModalOpen: true
    })
  }

  closeCartModal() {
    this.setState({
      cartModalOpen: false
    })
  }

  enableCartModal() {
    this.setState({
      cartModalEnabled: true
    })
  }

  disableCartModal() {
    this.setState({
      cartModalEnabled: false
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
          route: category_data.shop_category_route,
          banner_url: category_data.shop_category_banner_url,
          banner_caption: category_data.shop_category_banner_caption,
          banner_button: category_data.shop_category_banner_button,
        }
        categories_list.push(category)
      })
      this.setState({
        categories: categories_list
      })
    }).catch(error => {
      console.log("Error retrieving categories", error)
    })

  }

  authorizedPages() {
    return [
      <Route key="account" exact path="/account" component={Account} />,
      <Route key="checkout" exact path="/checkout" render={props => (<Checkout
        enableCartModal={this.enableCartModal}
        disableCartModal={this.disableCartModal} />)} />
    ];
  }

  render() {
    return (
      <div className='app'>
        <Router history={history}>
          <div>

            {/* <GithubCorner href="https://github.com/drewgoodman/PetStash-StoreFront" direction='left' /> */}
            <Header
              loggedInStatus={this.state.loggedInStatus}
              handleLogout={this.handleLogout}
              openCartModal={this.openCartModal}
              cartModalEnabled={this.state.cartModalEnabled}
            />
            <NavBar categories={this.state.categories} />

            <CartModal
              cartModalOpen={this.state.cartModalOpen}
              openCartModal={this.openCartModal}
              closeCartModal={this.closeCartModal}
            />

            <div className="page-container">
              <Switch>
                <Route exact path="/" render={props => (<Home categories={this.state.categories} />)} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" render={props => (<Login handleSuccessfulLogin={this.handleSuccessfulLogin} />)} />

                {this.state.loggedInStatus === 'LOGGED_IN' ? this.authorizedPages() : null}

                <Route exact path="/shop/:slug" component={ShopCategory} key={":slug"} />
                <Route exact path="/faq" component={FAQPage} />
                <Route component={NoMatch} />

              </Switch>

            </div>


          </div>
          {/* TODO: Footer */}
        </Router>
      </div >
    )
  }
}

